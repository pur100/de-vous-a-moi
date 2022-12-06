import { Controller } from "@hotwired/stimulus";
import { fabric } from "fabric";

// Save each shape as well

export default class extends Controller {
  static values = {
    update: String, // updateValue is the link to pattern/id/update used in save function
    json: String, // jsonValue is pattern.json
  };

  connect() {
    console.log("connectéd");
    // on crée un canvas de travail pour fabric dans le canvas HTML et on en fait une variable d'instance
    this.canvas = new fabric.Canvas("canvas");
    this.#loadCanvas(); // On load le canvas s'il a déjà été sauvegardé
    this.count = 0;
    this.json = JSON.stringify(this.canvas.toJSON()); // save the "virgin" canvas to a json file
    this.history = []; // history will store all the json files when we hit the save button
    this.index = -1; // index is the number of element of history. will be updated when we hit save as well
    this.undo_index = -1; // we will decrement undo_index each time we hit undo and increment it each time we hit redo
    this.canvas.on("object:modified", this.#autoSave.bind(this)); // we set an envent listenner on object:modified so that each time a modification is done, we call private function autosave
  }

  clone() {
    let object = fabric.util.object.clone(this.canvas.getActiveObject());
    object.set("top", object.top + 100);
    object.set("left", object.left + 100);
    this.canvas.add(object);
    this.#autoSave();
  }

  #autoSave() {
    console.log("autosaved");
    this.json = JSON.stringify(this.canvas.toJSON());
    this.history.push(this.json);
    this.index++;
    this.undo_index = this.index;
    document.getElementById(
      "canva-bg"
    ).style.backgroundImage = `url(${this.canvas.toDataURL("png")})`; // change the background image with the image created from the canvas
    // console.log("index")
    // console.log(this.index)
    // console.log("index")
    // console.log(this.undo_index)
  }

  setActiveLayer(event) {
    const that = this;
    that.canvas.getObjects().forEach(function (object) {
      if (object.name === event.currentTarget.innerText) {
        that.canvas.setActiveObject(object);
        that.canvas.renderAll();
      } else {
        object._objects.forEach((path) => {
          if (
            path.id === event.currentTarget.innerText ||
            `c-${path.id}` === event.currentTarget.id
          ) {
            that.canvas.setActiveObject(path);
            that.canvas.renderAll();
          }
        });
      }
    });
  }

  highlightLayer(event) {
    const that = this;
    that.canvas.getObjects().forEach(function (object) {
      object._objects.forEach((path) => {
        if (
          path.id === event.currentTarget.innerText ||
          `c-${path.id}` === event.currentTarget.id
        ) {
          path.set({ stroke: "#FFFFFF" });
          that.canvas.renderAll();
        }
      });
    });
  }

  unHighlightLayer(event) {
    const that = this;
    that.canvas.getObjects().forEach(function (object) {
      object._objects.forEach((path) => {
        if (
          path.id === event.currentTarget.innerText ||
          `c-${path.id}` === event.currentTarget.id
        ) {
          path.set({ stroke: "" });
          that.canvas.renderAll();
        }
      });
    });
  }

  undo() {
    // parse the data into the canvas
    if (this.undo_index > 0) {
      this.undo_index--;
    }
    this.canvas.loadFromJSON(this.history[this.undo_index]); // We load the previsou version of the saved canvas
    // re-render the canvas
    this.canvas.renderAll();
  }

  redo() {
    // parse the data into the canvas
    if (this.undo_index < this.history.length - 1) {
      this.undo_index++;
    }
    this.canvas.loadFromJSON(this.history[this.undo_index]); // We load the next version of the saved canvas
    // re-render the canvas
    this.canvas.renderAll();
  }

  #loadCanvas() {
    // parse the data into the canvas
    this.canvas.loadFromJSON(this.jsonValue);
    // re-render the canvas
    this.canvas.renderAll();
  }

  saveCanvas() {
    // convert canvas to a json string
    this.json = JSON.stringify(this.canvas.toJSON());
    // Create a new formdata to send json to rails via AJAX fetch
    const formData = new FormData();
    // We give our json to formdata
    formData.append("json", this.json);
    // Token for security
    const csrfToken = document.getElementsByName("csrf-token")[0].content;

    // On vient fetcher l'url pattern/id/update en lui donnant le this.json en body pour lé récupérer dans le controller rails
    fetch(this.updateValue, {
      method: "PATCH", // Patch method to update our pattern
      headers: { Accept: "application/json", "X-CSRF-Token": csrfToken },
      body: formData, // we give the formdata declared above to the fetch body -> rails side, we can retrieve the info with params[:json]
    }).then((response) => response.json());
    // .then((data) => {
    //   console.log(data)
    // })
  }

  addAShape(event) {
    // On vient chercher le svg cliqué grace au event.target.innerHTML
    fabric.loadSVGFromString(event.target.innerHTML, this.#loadSVG.bind(this));
    this.#autoSave();
  }

  changeShapeColor(event) {
    // methode pour changer la couleur de la forme sélectionnée
    let activ_object = this.canvas.getActiveObject();
    let color = event.target.innerHTML;
    activ_object.set({ fill: color });
    this.canvas.renderAll();
    this.#autoSave();
  }

  setBackgroundColor(event) {
    let color = event.target.innerHTML;
    this.canvas.set({ backgroundColor: color });
    this.canvas.renderAll();
    this.#autoSave();
  }

  groupSelection() {
    // sur click du bouton, activer la methode pour grouper l'ensemble des éléments du tableau
    this.canvas.discardActiveObject();
    this.selection = new fabric.ActiveSelection(this.canvas._objects, {
      canvas: this.canvas,
    });
    this.canvas.setActiveObject(this.selection);
    this.canvas.renderAll();
  }

  unGroupSelection() {
    // sur click du bouton, activer la methode pour dégrouper la sélection
    this.canvas.discardActiveObject();
    this.canvas.renderAll();
  }

  clearCanvas() {
    alert("You are going to delete the Canvas, are you sure ?");
    this.canvas.clear();
    this.#autoSave();
  }

  removeSelection() {
    alert("You are going to delete the selected shape, are you sure ?");
    this.canvas.remove(this.canvas.getActiveObject());
    this.#autoSave();
  }

  #loadSVG(objects, options) {
    // load SVG
    this.obj = fabric.util.groupSVGElements(
      objects,
      (options = { cornerStyle: "circle" })
    );
    // this.obj.#cornerStyle('circle');
    this.canvas.add(this.obj).renderAll();
    this.obj.scaleToHeight(this.canvas.height / 2); // Scales it down to half the size of the canvas
    this.obj.scaleToWidth(this.canvas.width / 2); // Scales it down to half the size of the canvas
    this.obj.center();
    this.count += 1;
    // afficher les formes et sous-formes
    const actions = document.getElementById("shape-block");
    this.obj.name = `FORME-${this.count}`;
    actions.insertAdjacentHTML(
      "beforeend",
      `<h3 data-action='click->pattern#setActiveLayer mouseenter->pattern#highlightLayer mouseleave->pattern#unHighlightLayer' class="title-shape" onmouseover="this.style.background='#696969';this.style.color='#FFFFFF';" onmouseout="this.style.background='';this.style.color='';">${this.obj.name}</h3>`
    );
    let i = 0;
    this.obj._objects.forEach((path) => {
      path.id = `Forme-${this.count}-layer-${i}`;
      actions.insertAdjacentHTML(
        "beforeend",
        `<div data-action='click->pattern#setActiveLayer mouseenter->pattern#highlightLayer mouseleave->pattern#unHighlightLayer' class="title-layer d-none" onmouseover="this.style.background='#696969';this.style.color='#FFFFFF';" onmouseout="this.style.background='';this.style.color='';">${path.id}</div>`
      );
      actions.insertAdjacentHTML(
        "beforeend",
        `<canvas data-action='click->pattern#setActiveLayer mouseenter->pattern#highlightLayer mouseleave->pattern#unHighlightLayer' id="c-${path.id}" width="100" height="50"></canvas`
      );
      let canvas = new fabric.StaticCanvas(`c-${path.id}`);
      let shapePath = new fabric.Path(path.d);
      canvas.add(shapePath);
      shapePath.scaleToHeight(canvas.height);
      shapePath.scaleToWidth(canvas.width / 4); // Scales it down to half the size of the canvas
      shapePath.center();
      i++;
    });
  }
}

// insérer une image issue du svg

// OBJECT DECOMPOSE
// objects.splice(-1); // retirer le calque supérieur du crabe - trouver une autre solution car celle ci est nulle
// this.canvas.add.apply(this.canvas, objects);
// this.canvas.renderAll();

// TEST GROUPER LES OBJECTS
// this.group = new fabric.Group(this.canvas._objects);
// this.canvas.clear().renderAll();
// this.canvas.add(this.group);

// GARDER LA SOUS FORME CREE EN MEMOIRE POUR APRES POUVOIR LA SELECTIONNER
// this.shapeArray.push(objects);
// this.shapeArrayTarget.insertAdjacentHTML("afterend", this.shapeArray.slice(-1));
// console.log(this.shapeArray);

// EVENT SUR SELECTION
// this.canvas.on('selected', function(event){
//       console.log(event.target);
//     });

// LOAD SVG AS A GROUP
// #loadSVG(objects, options) {
//   this.obj = fabric.util.groupSVGElements(objects, options);
//   this.canvas.add(this.obj).renderAll();
//   this.obj.scaleToHeight(this.canvas.height/2); // Scales it down to half the size of the canvas
//   this.obj.scaleToWidth(this.canvas.width/2); // Scales it down to half the size of the canvas
//   this.obj.center();
// };

// METHODE NESTEE DANS ADD A SHAPE
// const testMethod = () => {
//   alert('yooo')
//   console.log(obj)
//   this.#displaySettings(obj)
// }

// modifier toutes les ailes des oiseaux
// tous les bleus cians => vert clair (on peut accéder à tous les éléments d'une couleur)
// load le colibri => générer un bouton pour sélectionner le colibri, puis des boutons dela forme de la forme pour sélectionner chaque élément du colibri
// à l'import du svg, itérer sur chaque sub-shape pour créer autant de bouton qu'il y a de sub-shapes
// set active object chaque sous forme sur clic de la sub-shape

/////////
// this.shapeCanvas = new fabric.Canvas('shape-canvas');
// fabric.loadSVGFromString(event.target.innerHTML, this.#loadSVGInMainCanvas.bind(this));
// #loadSVGInSaveCanvas(objects,options){
//   this.actualObj = fabric.util.groupSVGElements(objects, options);
//   this.shapeCanvas.add(this.actualObj).renderAll();
//   this.actualObj.scaleToHeight(this.shapeCanvas.height/2); // Scales it down to half the size of the canvas
//   this.actualObj.scaleToWidth(this.shapeCanvas.width/2); // Scales it down to half the size of the canvas
//   this.actualObj.center();
// }
