import { Controller } from "@hotwired/stimulus"
import { fabric } from 'fabric'

export default class extends Controller {
static targets = ["shape", "shapeForColoring"];

  connect() {
    console.log("connecté");
    this.canvas = new fabric.Canvas('canvas');
  }

// RORO ____ WORK IN PROGRESS
  addAShape() {
   // on crée un canvas de travail pour fabric dans le canvas HTML
    // on donne à l'élément canvas HTML la valeur de notre nouveau canvas (de la sorte, canvas "fabric" est accesible partout, au même titre que cavas "html")
    // document.getElementById("canvas").fabric = canvas;
    // on load le svg souhaité (en cliquant sur l'image du svg disponible sur la page)
    fabric.loadSVGFromString(this.shapeTarget.innerHTML, this.#loadSVG.bind(this))
  }

  // methode pour changer la couleur de la forme sélectionnée
  changeShapeColor() {
    // const canvas = Canvas.where(this.shapeForColoringTarget);
    // const canvas = document.getElementById("canvas").fabric;
    // console.log(this.canvas.getActiveObject());
    let activ_object = this.canvas.getActiveObject();
    activ_object._objects.forEach(object => {
      object.set({ fill: '#DA0D58' });
    });
    // this.canvas.renderAll();
  }

  #loadSVG(objects, options) {
    let obj = fabric.util.groupSVGElements(objects, options);
    this.canvas.add(obj).renderAll();
    obj.scaleToHeight(this.canvas.height/2); // Scales it down to half the size of the canvas
    obj.scaleToWidth(this.canvas.width/2); // Scales it down to half the size of the canvas
    obj.center();
  };
}


// GET ACTIVE OBJECT
//   obj.on('selected', function(options) {
//     console.log(options.target._objects);
//     console.log(obj._activeObjects);
//   });
// });

// this.changeShapeColor(canvas);
// }


// permet de sélectionner la target svg sur click et de lui donner du style
// obj.on('selected', function(options) {
//   options.target._objects.forEach(object => {
//     object.set({ fill: '#DA0D58' });
//   });
// });



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
// RORO ____ WORK IN PROGRESS










//   // Fabrizio addShape
//   addAShape() {

//     console.log("dans addAShape");


//     const canvas = new fabric.Canvas('canvas');

// // Fabrizio Sandbox
//     // On charge le svg dans le canvas
//     fabric.loadSVGFromString(svg, function(objects, options) {
//       let obj = fabric.util.groupSVGElements(objects, options);

//       canvas.add(obj).renderAll();
//       obj.scaleToHeight(canvas.height/2)
//         obj.center()getActiveObject();

//       // Change color of the svg just after adding it to the canvas
//       const color = '#D556C4';
//       if (obj && obj._objects) {
//         for (var i = 0; i < obj._objects.length; i++) {
//           obj._objects[i].set({
//             fill: color
//           });
//         }
//       }
//     });

//     // On sélectionne l'objet quand on clique dessus
//     canvas.on({
//       'selection:updated': HandleElement,
//       'selection:created': HandleElement
//     });

//     // Et on lui change sa couleur
//     function HandleElement(obj){
//        //Handle the object here
//       // console.log(obj.selected[0]._objects)
//       const color2 = '#0000FF'
//       for (var i = 0; i < obj.selected[0]._objects.length; i++) {
//         // console.log(obj.selected[0]._objects[i])
//         // obj.selected[0]._objects[i].fill = color2
//         obj.selected[0]._objects[i].set({
//           fill: color2
//         });
//       }
//     }
//   }
// }
