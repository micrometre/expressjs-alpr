var bgImageArray = ["exterior.jpg", "leavingroom-0.jpg", "kitchen-0.jpg", "saloon.jpg"],
base = "/img/slide/",
secs = 4;
bgImageArray.forEach(function(img){
    new Image().src = base + img;
    // caches images, avoiding white flash between background replacements
});

function backgroundSequence() {
	window.clearTimeout();
	var k = 0;
	for (i = 0; i < bgImageArray.length; i++) {
		setTimeout(function(){
document.getElementById('animated-bg').style.background = "url(" + base + bgImageArray[k] + ") no-repeat center center";
document.getElementById('animated-bg').style.backgroundSize ="cover";
	if ((k + 1) === bgImageArray.length) { setTimeout(function() { backgroundSequence() }, (secs * 1000))} else { k++; }
		}, (secs * 1000) * i)
	}
}
backgroundSequence();
