import { Controller } from "@hotwired/stimulus"
import { fabric } from 'fabric'

export default class extends Controller {
// static targets = ["shape", "shapeForColoring"];
// static values = { color: String }

  connect() {
    console.log("connecté");
    // on crée un canvas de travail pour fabric dans le canvas HTML et on en fait une variable d'instance
    this.canvas = new fabric.Canvas('canvas');
  }

  addAShape(event) {
    // on load le svg souhaité (en cliquant sur l'image du svg disponible sur la page)
    fabric.loadSVGFromString(event.target.innerHTML, this.#loadSVG.bind(this))
  }

  // methode pour changer la couleur de la forme sélectionnée
  changeShapeColor(event) {
    let activ_object = this.canvas.getActiveObject();
    let color = event.target.innerHTML;
    // activ_object._objects.forEach(object => {
    activ_object.set({ fill: color });
    // });
    this.canvas.renderAll();
  }

  groupSelection() {
    // sur click du bouton, activer la methode pour grouper la sélection
  }

  unGroupSelection() {
    // sur click du bouton, activer la methode pour dégrouper la sélection
  }

  // private methode pour grouper les éléments du svg qu'on load, le sizer et le centrer
  #loadSVG(objects, options) {
    // this.obj = fabric.util.groupSVGElements(objects, options);
    // this.obj.scaleToHeight(this.canvas.height/2); // Scales it down to half the size of the canvas
    // this.obj.scaleToWidth(this.canvas.width/2); // Scales it down to half the size of the canvas
    // this.obj.center();
    // console.log(this.canvas._objects.hasControls);
    objects.splice(-1); // retirer le calque supérieur du crabe
    this.canvas.add.apply(this.canvas, objects);
    this.canvas.renderAll();
    // console.log(objects);

    // objects.forEach(object => {
    //   this.canvas.add(object);
    //   console.log(object);
    // });

    // objects.scaleToHeight(this.canvas.height/4);
    // objects.scaleToWidth(this.canvas.width/4);
    // objects.center();

    // this.canvas.renderAll();
  };
}

// this.canvas.on('selected', function(event){
//       console.log(event.target);
//     });

// TENTATIVE D'IMPORT D'UN SVG EN PLUSIEURS ELEMENTS
// var canvas = new fabric.Canvas('myCanvas');

// fabric.loadSVGFromURL('svgfile.svg', function (objects) {
//      canvas.add.apply(canvas, objects);
//      canvas.renderAll();
// });

// canvas.on('object:selected', function (e) {
//       var activeObject = e.target;
//       activeObject.setFill('purple');
// });








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
