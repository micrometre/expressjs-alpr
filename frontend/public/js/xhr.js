function loadDoc() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
      document.getElementById("alpr-images").innerHTML =
        this.responseText;
    }
    xhttp.open("GET", "/images");
    xhttp.send();
  }
loadDoc()