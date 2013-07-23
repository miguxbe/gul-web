/*
 *
 */

function carouselSlide(title, brief, image, active) {
  var contents = 
  '  <div class="item ' + active + '" style="background-image:url(/img/' + image + ');">              ' +
  '    <div class="container">                                                         ' +
  '      <div class="carousel-caption">                                                ' +
  '        <h1>' + title + '</h1>                                                      ' +
  '        <p class="lead">                                                            ' +
            brief                                                                        +
  '        </p>                                                                        ' +
  '      </div>                                                                        ' +
  '    </div>                                                                          ' +
  '  </div>                                                                            ';
  return contents;
}

function carouselIndicator(n, active) {
  return '<li data-target="#myCarousel" data-slide-to="' + n + '" class="' + active + '"></li>';
}

function updateCarousel() {
  $.ajax({
    url: "/index.json", 
  }).done(function(data) {
    var contents = "";
    var markers = "";
    var json = JSON.parse(data);
    var slides = json["slides"];
    for (n in slides) {
      slide = slides[n];
      title = slide["title"];
      brief = slide["brief"];
      image = slide["img"];
      active = n == 0 ? "active" : "";
      contents = contents + carouselSlide(title, brief, image, active);
      markers = markers + carouselIndicator(n, active);
    }
    $('#myCarouselInner').html(contents);
    $('#myCarouselIndicators').html(markers);
  });
} 

$(function() {
  updateCarousel();
  $('#myCarousel').carousel({
    interval:5000
  });
});    
