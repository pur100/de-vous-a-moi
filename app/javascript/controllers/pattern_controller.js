import { Controller } from "@hotwired/stimulus"
import { fabric } from 'fabric'

// Save each shape as well

export default class extends Controller {
  // static targets = ["shapeArray"];
  static values = {
    update: String, // updateValue is the link to pattern/id/update used in save function
    json: String // jsonValue is pattern.json
  }

  connect() {
    console.log("connectéd");
    // on crée un canvas de travail pour fabric dans le canvas HTML et on en fait une variable d'instance
    this.canvas = new fabric.Canvas('canvas');
    this.#loadCanvas() // On load le canvas s'il a déjà été sauvegardé
    this.shapeArray = [];
    this.json = JSON.stringify( this.canvas.toJSON() ) // save the "virgin" canvas to a json file
    this.history = [] // history will store all the json files when we hit the save button
    this.index = -1 // index is the number of element of history. will be updated when we hit save as well
    this.undo_index = -1 // we will decrement undo_index each time we hit undo and increment it each time we hit redo
  }

  undo() {
    // parse the data into the canvas
    if (this.undo_index > 0) {
      this.undo_index--
    }
    this.canvas.loadFromJSON(this.history[this.undo_index]); // We load the previsou version of the saved canvas
    // re-render the canvas
    this.canvas.renderAll();
  }

  redo() {
    // parse the data into the canvas
    if (this.undo_index < this.history.length - 1) {
      this.undo_index++
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
    this.json = JSON.stringify( this.canvas.toJSON() );
    this.history.push(this.json)
    this.index++
    this.undo_index = this.index
    // Create a new formdata to send json to rails via AJAX fetch
    const formData = new FormData();
    // We give our json to formdata
    formData.append('json', this.json );
    // Token for security
    const csrfToken = document.getElementsByName("csrf-token")[0].content;

    // On vient fetcher l'url pattern/id/update en lui donnant le this.json en body pour lé récupérer dans le controller rails
    fetch(this.updateValue, {
      method: "PATCH", // Patch method to update our pattern
      headers: { "Accept": "application/json", "X-CSRF-Token": csrfToken },
      body: formData // we give the formdata declared above to the fetch body -> rails side, we can retrieve the info with params[:json]
    })
      .then(response => response.json())
      // .then((data) => {
      //   console.log(data)
      // })
  }

  addAShape(event) {
    // On vient chercher le svg cliqué grace au event.target.innerHTML
    fabric.loadSVGFromString(event.target.innerHTML, this.#loadSVG.bind(this))
  }

  changeShapeColor(event) {
    // methode pour changer la couleur de la forme sélectionnée
    let activ_object = this.canvas.getActiveObject();
    let color = event.target.innerHTML;
    activ_object.set({ fill: color });
    this.canvas.renderAll();
  }

  groupSelection() {
    // sur click du bouton, activer la methode pour grouper l'ensemble des éléments du tableau
    this.canvas.discardActiveObject();
    this.selection = new fabric.ActiveSelection(this.canvas._objects, {
      canvas: this.canvas
    });
    this.canvas.setActiveObject(this.selection);
    this.canvas.renderAll();
  }

  unGroupSelection() {
    // sur click du bouton, activer la methode pour dégrouper la sélection
    this.canvas.discardActiveObject();
    this.canvas.renderAll();
  }

  #loadSVG(objects, options) {
    // private methode pour
    objects.splice(-1); // retirer le calque supérieur du crabe - trouver une autre solution car celle ci est nulle
    this.canvas.add.apply(this.canvas, objects);
    this.canvas.renderAll();
  };
}

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
