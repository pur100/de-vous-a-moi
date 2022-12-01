import { Controller } from "@hotwired/stimulus"
import { fabric } from 'fabric'

export default class extends Controller {
static targets = ["shape", "shapeForColoring"];
// static values = { color: String }

  connect() {
    console.log("connecté");
    // on crée un canvas de travail pour fabric dans le canvas HTML et on en fait une variable d'instance
    this.canvas = new fabric.Canvas('canvas');
  }

  addAShape(event) {
    // on load le svg souhaité (en cliquant sur l'image du svg disponible sur la page)
    console.log(event.target.innerHTML)
    // On vient chercher le svg cliqué grace au event.target.innerHTML (on ne passe plus par des targets comme lorsqu'il n'y avait qu'une seule forme)
    fabric.loadSVGFromString(event.target.innerHTML, this.#loadSVG.bind(this))
    // fabric.loadSVGFromString(this.shapeTarget.innerHTML, this.#loadSVG.bind(this))
  }

  // methode pour changer la couleur de la forme sélectionnée
  changeShapeColor(event) {
    let activ_object = this.canvas.getActiveObject();
    let color = event.target.innerHTML;
    activ_object._objects.forEach(object => {
      object.set({ fill: color });
    });
    this.canvas.renderAll();
  }

  // private methode pour load le svg, en faire un groupe d'éléments, le sizer et le centrer
  #loadSVG(objects, options) {
    this.obj = fabric.util.groupSVGElements(objects, options);
    this.canvas.add(this.obj).renderAll();
    this.obj.scaleToHeight(this.canvas.height/2); // Scales it down to half the size of the canvas
    this.obj.scaleToWidth(this.canvas.width/2); // Scales it down to half the size of the canvas
    this.obj.center();
  };
}

// METHODE NESTEE DANS ADD A SHAPE
// const testMethod = () => {
//   alert('yooo')
//   console.log(obj)
//   this.#displaySettings(obj)
// }
