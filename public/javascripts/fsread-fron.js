var img = [];
function getImage() {
  $.getJSON("/images", function (data) {
    $(".alpr-image ul").empty();
    $.each(data, function (i, f) {
      $(".alpr-image ul").append("<li class='img-rounded'><img src=" + f + " id=\"alpr-image\"/></li><br />");
    });
    img = data;
  });
};
$(document).ready(getImage());