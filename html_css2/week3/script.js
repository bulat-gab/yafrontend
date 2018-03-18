$('.blue').on('click', function(event, count) {
    event.preventDefault();
    var layer = document.querySelector(".layer");
    layer.style.backgroundImage = "url('./images/layer1.png')";
  });

  $('.red').on('click', function(event, count) {
    event.preventDefault();
    var layer = document.querySelector(".layer");
    layer.style.backgroundImage = "url('./images/layer3.png')";
  });

  $('.yellow').on('click', function(event, count) {
    event.preventDefault();
    var layer = document.querySelector(".layer");
    layer.style.backgroundImage = "url('./images/layer2.png')";
  });