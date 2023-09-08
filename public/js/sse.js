    if (typeof (EventSource) !== "undefined") {
      var source = new EventSource("/events");
      source.onmessage = function (event) {
        const box = document.getElementById('box')
        const alpr = document.createElement('h1')
        alpr.innerHTML += event.data.replace(/[{("")}]/g, '') + "<br>";
        box.insertBefore(alpr, box.firstChild)
      };
    } else {
      document.getElementById("result").innerHTML = "Sorry, your browser does not support server-sent events...";
    }