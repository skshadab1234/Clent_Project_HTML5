// ---------Responsive-navbar-active-animation-----------
function test() {
  var tabsNewAnim = $('#navbarSupportedContent');
  var selectorNewAnim = $('#navbarSupportedContent').find('li').length;
  var activeItemNewAnim = tabsNewAnim.find('.active');
  var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
  var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
  var itemPosNewAnimTop = activeItemNewAnim.position();
  var itemPosNewAnimLeft = activeItemNewAnim.position();
  $(".hori-selector").css({
    "top": itemPosNewAnimTop.top + "px",
    "left": itemPosNewAnimLeft.left + "px",
    "height": activeWidthNewAnimHeight + "px",
    "width": activeWidthNewAnimWidth + "px"
  });
  $("#navbarSupportedContent").on("click", "li", function (e) {
    $('#navbarSupportedContent ul li').removeClass("active");
    $(this).addClass('active');
    var activeWidthNewAnimHeight = $(this).innerHeight();
    var activeWidthNewAnimWidth = $(this).innerWidth();
    var itemPosNewAnimTop = $(this).position();
    var itemPosNewAnimLeft = $(this).position();
    $(".hori-selector").css({
      "top": itemPosNewAnimTop.top + "px",
      "left": itemPosNewAnimLeft.left + "px",
      "height": activeWidthNewAnimHeight + "px",
      "width": activeWidthNewAnimWidth + "px"
    });
  });
}
$(document).ready(function () {
  setTimeout(function () {
    test();
  });
});
$(window).on('resize', function () {
  setTimeout(function () {
    test();
  }, 500);
});
$(".navbar-toggler").click(function () {
  setTimeout(function () {
    test();
  });
});

$(document).ready(() => {
   document.onkeydown = function(e){
        if (e.ctrlKey &&
            (e.keyCode === 67 ||
                e.keyCode === 86 ||
                e.keyCode === 85 ||
                e.keyCode === 117)) {
            return false;
        } else {
            return true;
        }

        if (e.which === 73 && e.ctrlKey && e.shiftKey ) {
          console.log('sa')
        }
    };
  setTimeout(() => {
    $(".bar-container").css('clip-path', 'circle(0%)');
    setTimeout(() => {
      $("#body_load").css({
        'opacity': '1',
        'display': 'block'
      });
    }, 2000)
  }, 4000);
  var root = document.documentElement;
  var body = document.body;
  var pages = document.querySelectorAll(".page");
  var tiles = document.querySelectorAll(".tile");
  var info = document.querySelectorAll(".info");
  var tile_container = document.querySelectorAll(".tile-container");
  var count_delay = tiles.length * 5000;
  var flag = 0;

  // for next slide
  // fetch details for next slide
  var next_slide_current_tile_val;
  var next_slide_to_slide_tile_val;
  // for page
  var next_slide_current_page_val;
  var next_slide_to_slide_page_val; 

  // $("#nextBtn").click(()=>{
  //   addListeners(next_slide_to_slide_tile_val,next_slide_to_slide_page_val)
  //   // $(next_slide_to_slide_tile_val).css('visibility','visible');
  //   // $(next_slide_to_slide_page_val).css('visibility','visible');
  //   // $(next_slide_current_tile_val).css('visibility','');
  //   // $(next_slide_current_page_val).css('visibility','');
  // });

  for (var i = 0; i < tiles.length; i++) {
    if (flag == 0) {
      addListeners(tiles[i], pages[i]);
    }

    if (i >= (tiles.length - 1)) {

      setInterval(() => {
        flag = 1;
        if (flag == 1) {
          addListeners(tiles[i], pages[i]);
        }
      }, count_delay)
    }

  }


  function addListeners(tile, page) {

    var delay = 0;
    var transition = 0;
    var delayMilliseconds = 5000;
    var progress_indicator = 0;
    var inc = 0;
    var active = '';

    function doTimeoutStuff(i, delay, transition, progress_indicator, inc, active) {
      setTimeout(function () {
          $('.tile' + i).trigger('click');
        // next_slide_current_tile_val = '.tile'+i;
        // next_slide_to_slide_tile_val = '.tile'+(i+1);

        // next_slide_current_page_val = '.page'+i;
        // next_slide_to_slide_page_val = '.page'+(i+1);
        // if (i == (tiles.length)) {
        //   next_slide_to_slide_page_val = '.page1';
        // }
        // progeress bar top header
        if ($('.progress_bar').width() == 0) {
          $(".progress_bar").css({
            "display": "block",
            "width": "100vw"
          });
        } else {
          $(".progress_bar").css({
            "display": "none",
            "width": "0vw"
          });

        }
        if (i > 1 ) {
          $(".progress_indicator").css({
            "width": progress_indicator + '%'
          });
        } else {
          $(".progress_indicator").css({
            "width": '0%'
          });
        }
        $(".counter h2").html('0' + inc);
        $('.tile' + (--i)).css('visibility', '');
        $('.page' + (++i)).css('visibility', '');


          // window.onfocus = function() {
          //   window.location.href = 'index.html';
          // }

      }, delay);
    }

    for (var i = 1; i < tiles.length + 1; i++) {
      delay = i * delayMilliseconds;
      inc++;
      progress_indicator = progress_indicator + (100 / tiles.length);
      doTimeoutStuff(i, delay, transition, progress_indicator, inc, active);
    }
    tile.addEventListener("click", function () {
      animateHero(tile, page);
    });
  }

  function animateHero(fromHero, toHero) {
    var clone = fromHero.cloneNode(true);

    var from = calculatePosition(fromHero);
    var to = calculatePosition(toHero);
    
      TweenLite.set([fromHero, toHero], {
        visibility: "hidden"
      });

      TweenLite.set(clone, {
        position: "absolute",
        margin: 0,
      });
      body.appendChild(clone);

    var style = {
      x: to.left - from.left,
      y: to.top - from.top,
      width: to.width,
      height: to.height,
      autoRound: true,
      ease: Power3.easeInOut,
      onComplete: onComplete
    };

    TweenLite.set(clone, from);
    TweenLite.to(clone, 0.8, style);

    function onComplete() {
      TweenLite.set(toHero, {
        visibility: "visible"
      });
      TweenLite.set(fromHero, {
        visibility: ""
      });
      setTimeout(() => {
        TweenLite.set(toHero, {
          visibility: ""
        });
        TweenLite.set(fromHero, {
          visibility: ""
        });
      }, 5000)
      $('.append_before').append(fromHero);
      TweenLite.set(fromHero, {
        visibility: "visible"
      });
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