import { Controller } from "@hotwired/stimulus"
import { fabric } from 'fabric'

export default class extends Controller {
static targets = ["shape", "shapeForColoring"];

  connect() {
    console.log("connecté");
    this.canvas = new fabric.Canvas('canvas');
  }


  addAShape() {
   // on crée un canvas de travail pour fabric dans le canvas HTML
    // on donne à l'élément canvas HTML la valeur de notre nouveau canvas (de la sorte, canvas "fabric" est accesible partout, au même titre que cavas "html")
    // document.getElementById("canvas").fabric = canvas;
    // on load le svg souhaité (en cliquant sur l'image du svg disponible sur la page)
    fabric.loadSVGFromString(this.shapeTarget.innerHTML, this.#loadSVG.bind(this))

// RORO ____ WORK IN PROGRESS

  // methode pour changer la couleur de la forme sélectionnée
  changeShapeColor() {
    // const canvas = Canvas.where(this.shapeForColoringTarget);
    // const canvas = document.getElementById("canvas").fabric;
    // console.log(this.canvas.getActiveObject());
    let activ_object = this.canvas.getActiveObject();
    activ_object._objects.forEach(object => {
      object.set({ fill: '#DA0D58' });
    });
  }

  #loadSVG(objects, options) {
    let obj = fabric.util.groupSVGElements(objects, options);
    this.canvas.add(obj).renderAll();
    obj.scaleToHeight(this.canvas.height/2); // Scales it down to half the size of the canvas
    obj.scaleToWidth(this.canvas.width/2); // Scales it down to half the size of the canvas
    obj.center();
  };
}

// FIN RORO SANDBOX CHANGE COLOR

// DEBUT FABRIZIO SANDBOX
    // On charge le svg dans le canvas
    fabric.loadSVGFromString(svg, function(objects, options) {
      let obj = fabric.util.groupSVGElements(objects, options);

      canvas.add(obj).renderAll();
      obj.scaleToHeight(canvas.height/2)
        obj.center();

      // Change color of the svg just after adding it to the canvas
      const color = '#D556C4';
      if (obj && obj._objects) {
        for (var i = 0; i < obj._objects.length; i++) {
          obj._objects[i].set({
            fill: color
          });
        }
      }
    });

    // On sélectionne l'objet quand on clique dessus
    canvas.on({
      'selection:updated': HandleElement,
      'selection:created': HandleElement
    });

    // Et on lui change sa couleur
    function HandleElement(obj){
       //Handle the object here
      // console.log(obj.selected[0]._objects)
      const color2 = '#0000FF'
      for (var i = 0; i < obj.selected[0]._objects.length; i++) {
        // console.log(obj.selected[0]._objects[i])
        // obj.selected[0]._objects[i].fill = color2
        obj.selected[0]._objects[i].set({
          fill: color2
        });
      }
    }
  }
// FIN FABRIZIO SANDBOX


// METHODE NESTEE DANS ADD A SHAPE
// const testMethod = () => {
//   alert('yooo')
//   console.log(obj)
//   this.#displaySettings(obj)
// }