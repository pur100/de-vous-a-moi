import { Controller } from "@hotwired/stimulus"
import { fabric } from 'fabric'

export default class extends Controller {
  static targets = ["shapes"];

  connect() {
    console.log("connecté")
    // on crée un canvas de travail pour fabric dans le canvas HTML et on en fait une variable d'instance
    this.canvas = new fabric.Canvas('canvas');
    this.count = 0;
  }

  setActiveLayer(event) {
    const that = this
    that.canvas.getObjects().forEach(function(object) {
      if (object.name === event.currentTarget.innerText) {
        that.canvas.setActiveObject(object);
        that.canvas.renderAll();
      } else {
        object._objects.forEach((path) => {
          if (path.id === event.currentTarget.innerText) {
            that.canvas.setActiveObject(path);
            that.canvas.renderAll();
          }
        })
      }
    })
  }

  highlightLayer(event) {
    const that = this
    that.canvas.getObjects().forEach(function(object) {
      object._objects.forEach((path) => {
        if (path.id === event.currentTarget.innerText) {
          path.set({ stroke: "#FFFFFF" });
          that.canvas.renderAll();
        }
      })
    })
  }

  unHighlightLayer(event) {
    const that = this
    that.canvas.getObjects().forEach(function(object) {
      object._objects.forEach((path) => {
        if (path.id === event.currentTarget.innerText) {
          path.set({ stroke: "" });
          that.canvas.renderAll();
        }
      })
    })
  }

  addAShape(event) {
    // On vient chercher le svg cliqué grace au event.target.innerHTML
    fabric.loadSVGFromString(event.target.innerHTML, this.#loadSVG.bind(this));
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
    this.obj = fabric.util.groupSVGElements(objects, options);
    const actions = document.getElementById('shape-block');
    this.count += 1;
    this.obj.name = `Forme-${this.count}`;
    actions.insertAdjacentHTML("beforeend", `<h2 data-action='click->pattern#setActiveLayer mouseenter->pattern#highlightLayer mouseleave->pattern#unHighlightLayer'>${this.obj.name}</h2>`);
    let i = 0;
    this.obj._objects.forEach((path) => {
      path.id = `Forme-${this.count}-layer-${i}`;
      actions.insertAdjacentHTML("beforeend", `<div data-action='click->pattern#setActiveLayer mouseenter->pattern#highlightLayer mouseleave->pattern#unHighlightLayer'>${path.id}</div>`)
      i++;
    })

    this.canvas.add(this.obj).renderAll();
    this.obj.scaleToHeight(this.canvas.height/2); // Scales it down to half the size of the canvas
    this.obj.scaleToWidth(this.canvas.width/2); // Scales it down to half the size of the canvas
    this.obj.center();
  };
}

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
