import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="panier"
export default class extends Controller {
  static targets = ["iconePanier"];

  connect() {
    this.nb_click = 0;
  }

  ajouteAuPanier() {
    this.nb_click += 1;
    this.iconePanierTarget.classList.add("notify-scale");
    this.iconePanierTarget.innerHTML = this.nb_click;
    new Promise((resolve) => setTimeout(resolve, 150)).then(() => {
      this.iconePanierTarget.classList.remove("notify-scale");
    });
  }
}
