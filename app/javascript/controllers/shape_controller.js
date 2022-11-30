import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="shape"
export default class extends Controller {
  connect() {
    alert('connected')
  }
}
