import { Controller } from "@hotwired/stimulus"
import { fabric } from 'fabric'

export default class extends Controller {
static targets = ["shapeArray"];
// static values = { color: String }

  connect() {
    console.log("connectéd");
    // on crée un canvas de travail pour fabric dans le canvas HTML et on en fait une variable d'instance
    this.canvas = new fabric.Canvas('canvas');
    this.shapeArray = [];
  }

  addAShape(event) {
    // On vient chercher le svg cliqué grace au event.target.innerHTML (on ne passe plus par des targets comme lorsqu'il n'y avait qu'une seule forme)
    fabric.loadSVGFromString(event.target.innerHTML, this.#loadSVG.bind(this))
  }

  // methode pour changer la couleur de la forme sélectionnée
  changeShapeColor(event) {
    let activ_object = this.canvas.getActiveObject();
    // let color = event.target.innerHTML;
    let color = event.target.value;
    // activ_object._objects.forEach(object => {
    activ_object.set({ fill: color });
    // });
    this.canvas.renderAll();
  }

  groupSelection() {
    // sur click du bouton, activer la methode pour grouper la sélection
    this.canvas.discardActiveObject();
    this.selection = new fabric.ActiveSelection(this.canvas._objects, {
      canvas: this.canvas
    });
    this.canvas.setActiveObject(this.selection);
    this.canvas.renderAll();
  }
    // this.group = new fabric.Group(this.canvas._objects);
    // this.canvas.clear().renderAll();
    // this.canvas.add(this.group);

  unGroupSelection() {
    // sur click du bouton, activer la methode pour dégrouper la sélection
    this.canvas.discardActiveObject();
    this.canvas.renderAll();
  }

  // private methode pour grouper les éléments du svg qu'on load, le sizer et le centrer
  #loadSVG(objects, options) {
    // this.obj = fabric.util.groupSVGElements(objects, options);
    // this.obj.scaleToHeight(this.canvas.height/2); // Scales it down to half the size of the canvas
    // this.obj.scaleToWidth(this.canvas.width/2); // Scales it down to half the size of the canvas
    // this.obj.center();
    // console.log(this.canvas._objects.hasControls);
    objects.splice(-1); // retirer le calque supérieur du crabe
    this.shapeArray.push(objects);
    this.shapeArrayTarget.insertAdjacentHTML("afterend", this.shapeArray.slice(-1).split);
    console.log(this.shapeArray);
    this.canvas.add.apply(this.canvas, objects);
    groupSVGElements(objects, options)
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
