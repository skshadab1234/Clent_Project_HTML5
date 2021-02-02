// ---------Responsive-navbar-active-animation-----------
function test(){
  var tabsNewAnim = $('#navbarSupportedContent');
  var selectorNewAnim = $('#navbarSupportedContent').find('li').length;
  var activeItemNewAnim = tabsNewAnim.find('.active');
  var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
  var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
  var itemPosNewAnimTop = activeItemNewAnim.position();
  var itemPosNewAnimLeft = activeItemNewAnim.position();
  $(".hori-selector").css({
    "top":itemPosNewAnimTop.top + "px", 
    "left":itemPosNewAnimLeft.left + "px",
    "height": activeWidthNewAnimHeight + "px",
    "width": activeWidthNewAnimWidth + "px"
  });
  $("#navbarSupportedContent").on("click","li",function(e){
    $('#navbarSupportedContent ul li').removeClass("active");
    $(this).addClass('active');
    var activeWidthNewAnimHeight = $(this).innerHeight();
    var activeWidthNewAnimWidth = $(this).innerWidth();
    var itemPosNewAnimTop = $(this).position();
    var itemPosNewAnimLeft = $(this).position();
    $(".hori-selector").css({
      "top":itemPosNewAnimTop.top + "px", 
      "left":itemPosNewAnimLeft.left + "px",
      "height": activeWidthNewAnimHeight + "px",
      "width": activeWidthNewAnimWidth + "px"
    });
  });
}
$(document).ready(function(){
  setTimeout(function(){ test(); });
});
$(window).on('resize', function(){
  setTimeout(function(){ test(); }, 500);
});
$(".navbar-toggler").click(function(){
  setTimeout(function(){ test(); });
});


var root = document.documentElement;
var body = document.body;
var pages = document.querySelectorAll(".page");
var tiles = document.querySelectorAll(".tile");

for (var i = 0; i < tiles.length; i++) {
  addListeners(tiles[i], pages[i]);
}

function addListeners(tile, page) {
  
  var delay = 0;
  var transition = 0;
  var delayMilliseconds = 5000;

  function doTimeoutStuff(i, delay, transition) {
      setTimeout(function () {
          $('.tile'+i).trigger('click');
          $('.tile-container').css({"transform": "translateX(-"+transition+"px)",'transition':'2s ease'});
      }, delay);
  }

  for (var i=0; i < tiles.length + 1; i++) {
      delay = i*delayMilliseconds;
      transition = transition + 210;
      doTimeoutStuff(i, delay,transition);
  }
 
  tile.addEventListener("click", function () {
    animateHero(tile, page);
  });

  
}

function animateHero(fromHero, toHero) {

  var clone = fromHero.cloneNode(true);

  var from = calculatePosition(fromHero);
  var to = calculatePosition(toHero);

  TweenLite.set([fromHero, toHero], { visibility: "hidden" });
  TweenLite.set(clone, { position: "absolute", margin: 0 });

  body.appendChild(clone);

  var style = {
    x: to.left - from.left,
    y: to.top - from.top,
    width: to.width,
    height: to.height,
    autoRound: true,
    ease: Power1.easeOut,
    onComplete: onComplete };


  TweenLite.set(clone, from);
  TweenLite.to(clone, 0.5, style);

  function onComplete() {

    TweenLite.set(toHero, { visibility: "visible" });
    body.removeChild(clone);
  }
}

function calculatePosition(element) {

  var rect = element.getBoundingClientRect();

  var scrollTop = window.pageYOffset || root.scrollTop || body.scrollTop || 0;
  var scrollLeft = window.pageXOffset || root.scrollLeft || body.scrollLeft || 0;

  var clientTop = root.clientTop || body.clientTop || 0;
  var clientLeft = root.clientLeft || body.clientLeft || 0;

  return {
    top: Math.round(rect.top + scrollTop - clientTop),
    left: Math.round(rect.left + scrollLeft - clientLeft),
    height: rect.height,
    width: rect.width };

}

