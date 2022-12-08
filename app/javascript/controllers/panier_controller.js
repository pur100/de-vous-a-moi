import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="panier"
export default class extends Controller {
  static targets = ["iconePanier"];

  connect() {
    console.log("dans panier");
  }

  ajouteAuPanier() {
    console.log("cliqué sur panier");
  }
}
