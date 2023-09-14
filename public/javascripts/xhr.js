const box = document.getElementById('alpr-images')
function loadImages() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    const alpr = document.createElement('h2')
    alpr.innerHTML = this.responseText;
    box.insertBefore(alpr, box.firstChild)
    //document.getElementById("alpr-images").innerHTML = this.responseText;
  }
  xhttp.open("GET", "/images");
  xhttp.send();
}
loadImages()