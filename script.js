textarea = document.querySelector(".input-text");
textarea.addEventListener("input", autoResize, false);

function autoResize() {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
  this.style.maxHeight = 250 + "px";
}
