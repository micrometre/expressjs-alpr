function loadImages(event) {
    const alprImagesBox = document.getElementById('alpr-images-box')
    const alprPlateDiv = document.createElement("div")
    alprPlateDiv.innerHTML = 'ALpr images prepended here'
    alprImagesBox.insertBefore(alprPlateDiv, alprImagesBox.firstChild)
  };

  loadImages()