import { Controller } from "@hotwired/stimulus"
import { fabric } from 'fabric'


// RORO SANDBOX
export default class extends Controller {
  static targets = ["shape"];

  connect() {
    console.log("connecté");
  }

  addAShape() {
    console.log("dans addAShape");
    const canvas = new fabric.Canvas('canvas');
    let group = [];

    // console.log(this.shapeTarget.innerHTML);
    fabric.loadSVGFromString(this.shapeTarget.innerHTML, function(objects,options) {
      let loadedObjects = new fabric.Group(group);
      loadedObjects.set({
          width: 200,
          height: 200
      });
      console.log(loadedObjects);
      canvas.centerObject(loadedObjects);
      canvas.add(loadedObjects);
      canvas.renderAll();
      },function(item, object) {
        object.set('id',item.getAttribute('id'));
        group.push(object);
    });
  }
}
  // CACA
  // console.log(canvas);
  // // const imgElement = document.getElementById('test-shape');
  // // console.log(imgElement);
  // // let imgInstance = new fabric.loadSVGFromString();
  // canvas.add(imgInstance);

  // METTRE UN RECTANGLE ROUGE
  // const rect = new fabric.Rect({
    //   top: 100,
    //   left: 100,
    //   width: 60,
    //   height: 70,
    //   fill: 'red',
    // });


    //   SVG NOIR INNACCESSIBLE
    //   console.log("dans addAShape");
    //   const canvas = new fabric.Canvas('canvas');
    //   let group = [];

    //   // console.log(this.shapeTarget.innerHTML);
    //   fabric.loadSVGFromString(this.shapeTarget.innerHTML, function(objects,options) {
    //   let loadedObjects = new fabric.Group(group);
    //   loadedObjects.set({
    //       width: 200,
    //       height: 200
    //   });
    //   canvas.centerObject(loadedObjects);
    //   canvas.add(loadedObjects);
    //   canvas.renderAll();
    //   },function(item, object) {
    //     object.set('id',item.getAttribute('id'));
    //     group.push(object);
    //   });
    // }
