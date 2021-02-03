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

$(document).ready(()=>{

var root = document.documentElement;
var body = document.body;
var pages = document.querySelectorAll(".page");
var tiles = document.querySelectorAll(".tile");
var info = document.querySelectorAll(".info");
var tile_container = document.querySelectorAll(".tile-container");

var flag = 0;

for (var i = 0; i < tiles.length; i++) {
  if (flag == 0) {
    addListeners(tiles[i], pages[i]);
  }
  if (i >= 3) {
    setInterval(()=>{
      flag = 1;
      if (flag == 1) {
        addListeners(tiles[i], pages[i]);
      }
    },20000)
  }
}


function addListeners(tile, page) {
  
  var delay = 0;
  var transition = 0;
  var delayMilliseconds = 5000;
  var progress_indicator = 0;
  var inc = 1;
  var active='';

  function doTimeoutStuff(i, delay, transition,progress_indicator,inc,active) {
      setTimeout(function () {
          $('.tile'+i).trigger('click');
          if (i>0) {
            $('.info'+i).addClass(active);
          }

          if (i==1) {
            $('.tile'+i).css('display','block');
          }
          setTimeout(()=>{
            $('.info'+i).removeClass('active');
            if (i==0) {
              $(".info"+tiles.length).removeClass('active');
            }
          },  0);
          // progeress bar top header
          if ($('.progress_bar').width() > 1) {
            $(".progress_bar").css({"display":"none","width":"0vw"});
          }else{
            $(".progress_bar").css({"display":"block","width":"100vw"});
          }

          $(".progress_indicator").css({"width":progress_indicator+'%'});
          $(".counter h2").html('0'+inc);

          if (transition > 1) {
            $('.tile-container').css({"transform": "translateX(-"+transition+"px)",'transition':'2s ease'});
          }
          
            $('.tile'+(--i)).css('visibility','');
            // $('.page'+tiles.length).css('visibility','visible');
            // setTimeout(()=>{
            //   $('.page'+tiles.length).css('visibility','');
            // },5000);


      }, delay);
    }

  for (var i=0; i < tiles.length + 1; i++) {
      delay = i*delayMilliseconds;
      if (i>0) {
        transition = 20 ;
        progress_indicator = progress_indicator + (100/tiles.length);
        inc++;
        active='active';
      }

      doTimeoutStuff(i, delay,transition,progress_indicator,inc,active);
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
    setTimeout(()=>{
      TweenLite.set(toHero, { visibility: "" });
    },5000)
    $('.tile-container').append(fromHero);
    TweenLite.set(fromHero, { visibility: "visible" });
    $('.tile-container').css({'transform':'translateX(10px)','transition':'2s ease all'});
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
    width: rect.width,
  };

}
})

