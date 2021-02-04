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
  setTimeout(()=>{
    $(".bar-container").css('clip-path','circle(0%)');
    setTimeout(()=>{
      $("#body_load").css({'opacity':'1','display':'block'});
    },2000)
  },4000);
  var root = document.documentElement;
  var body = document.body;
  var pages = document.querySelectorAll(".page");
  var tiles = document.querySelectorAll(".tile");
  var info = document.querySelectorAll(".info");
  var tile_container = document.querySelectorAll(".tile-container");
  var nextBtn = $("#nextBtn");
  var prevBtn = $("#prevBtn");
  var count_delay = tiles.length * 5000;
  var flag = 0;

  for (var i = 0; i < tiles.length; i++) {
    if (flag == 0) {
      addListeners(tiles[i], pages[i]);
    }

    if (i >= (tiles.length-1)) {

      setInterval(()=>{
        flag = 1;
        if (flag == 1) {
          addListeners(tiles[i], pages[i]);
        }
      },count_delay)
    }
  }


  function addListeners(tile, page) {
    
    var delay = 0;
    var transition = 0;
    var delayMilliseconds = 5000;
    var progress_indicator = 0;
    var inc = 0;
    var active='';

    function doTimeoutStuff(i, delay, transition,progress_indicator,inc,active) {
        setTimeout(function () {
            $('.tile'+i).trigger('click');
            if (i>0) {
              $('.info'+i).addClass(active);
            }

            setTimeout(()=>{
              $('.info'+i).removeClass('active');
                if (i==0) {
                  $(".info"+tiles.length).removeClass('active');
                }
              }, 0);
            // progeress bar top header
            if ($('.progress_bar').width() > 1) {
              $(".progress_bar").css({"display":"none","width":"0vw"});
            }else{
              $(".progress_bar").css({"display":"block","width":"100vw"});
            }

            $(".progress_indicator").css({"width":progress_indicator+'%'});
            $(".counter h2").html('0'+inc);

            $('.tile'+(--i)).css('visibility','');
        }, delay);
      }

    for (var i=1; i < tiles.length + 1; i++) {
        delay = i*delayMilliseconds;
        transition = transition + 210;

        if (i>0) {
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
        TweenLite.set(fromHero, { visibility: "" });
      },5000)
      $('.append_before').append(fromHero);
      TweenLite.set(fromHero, { visibility: "visible" });
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
