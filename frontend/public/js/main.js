console.log('from astro')



function loadDoc() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
    document.getElementById("demo").innerHTML =
    this.responseText;
  }
  xhttp.open("GET", "http://localhost:5000/api/alpr");
  xhttp.send();
}