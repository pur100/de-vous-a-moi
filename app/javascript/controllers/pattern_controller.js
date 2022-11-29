import { Controller } from "@hotwired/stimulus"
import { fabric } from 'fabric'

export default class extends Controller {
  connect() {
    console.log("connecté");
  }

  addAShape() {
    console.log("dans addAShape");
    const canvas = new fabric.Canvas('canvas');
    console.log(canvas);
    // const imgElement = document.getElementById('test-shape');
    // console.log(imgElement);
    // let imgInstance = new fabric.loadSVGFromString();
    canvas.add(imgInstance);
  }
}
//  const rect = new fabric.Rect({
//       top: 100,
//       left: 100,
//       width: 60,
//       height: 70,
//       fill: 'red',
//     });
//     canvas.add(rect);
