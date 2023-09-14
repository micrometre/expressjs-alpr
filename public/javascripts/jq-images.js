    $(document).ready(function () {
      $.get("./images", function (images) {
        $("#fileNames").append(images);
      });
    })
