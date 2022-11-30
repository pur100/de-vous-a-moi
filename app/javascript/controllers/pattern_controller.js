import { Controller } from "@hotwired/stimulus"
import { fabric } from 'fabric'

export default class extends Controller {
  static targets = ["shape", "shapeForColor"];

  connect() {
    console.log("connecté");
  }

  addAShape() {
    const canvas = new fabric.Canvas('canvas');
    fabric.loadSVGFromString(this.shapeTarget.innerHTML, function(objects, options) {
      let obj = fabric.util.groupSVGElements(objects, options);
      canvas.add(obj).renderAll();
      obj.scaleToHeight(canvas.height/2); // Scales it down to half the size of the canvas
      obj.scaleToWidth(canvas.width/2); // Scales it down to half the size of the canvas
      obj.center();
      // permet de sélectionner la target svg sur click et de lui donner du style
      obj.on('selected', function(options) {
        options.target._objects.forEach(object => {
          object.set({ fill: '#DA0D58' });
        });
      });
    });
  }
}

// GET ACTIVE OBJECT
// changeShapeColor(){
//  let obj = fabric.getActiveObject();
//  console.log(obj);
// }

//  METTRE DE LA COULEUR
// const color = '#1D8888';
// // obj._objects.length
// if (obj && obj._objects) {
//   for (var i = 0; i < obj._objects.length; i++) {
//     obj._objects[i].set({
//       fill: color
//     });
//   }
// }

// METHODE NESTEE DANS ADD A SHAPE
// const testMethod = () => {
//   alert('yooo')
//   console.log(obj)
//   this.#displaySettings(obj)
// }
