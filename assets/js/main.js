var total = $(window).height();
var header = $("#header").height();
var img_text_row = $("#img-text-row").height();
var img_row = $("#img-row").height();
var footer = $("#footer").height();

$( window ).resize(function(){
  // $("#footer").height(total - header - img_text_row - img_row);
});

/* indicates whether image is real or fake */
var IMAGES = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

var BEG_DELTA = 120;
var SWIPE_SPEED = 250;
var HIGHLIGHT_SPEED = 250;

var delta = 0;
var correct_number = 0;
var image_number = 1;
var scores = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

// $("#ps-logo").swipe( {
//     tap:function(event, target) {
//         // window.location.href = "main.html";
//         window.screenfull.request();
//     }
// });

/* Event handlers. Call score_swipe to calculate delta and kickoff slide_transition */
$("#prompt-row").on("swiperight", function(e) {
    $("#real-or-fake").css({"opacity":1});
    $("#ps-logo").hide();
    $("#prompt-row").hide();
    $("#main-img").show();
})

$("#main-img").on("swiperight", function(e) {
  delta = score_swipe(e);
  slide_transition($(this));
})
$("#main-img").on("swipeleft", function(e) {
  delta = score_swipe(e);
  slide_transition($(this));
})

$( document ).ready(function() {
  sessionStorage.setItem("scores", scores);
  // $("#footer").height(total - header - img_text_row - img_row);
});

/* Calculate and return delta, which is the distance the image will move.
   This method also sets the session item "scores" each time the user swipes */
function score_swipe(event){
  if (event.type === "swiperight") {
    delta = BEG_DELTA;
    if (IMAGES[image_number - 1] == 1) {
      correct_number++;
      scores[image_number - 1] = 1;
    }
  } else {
    delta = -1 * BEG_DELTA;
    if (IMAGES[image_number - 1] == 0) {
      correct_number++;
      scores[image_number - 1] = 1;
    }
  }
  return delta;
}

/* Slide transition will either show next image or redirect to final page via anmate */
function slide_transition(img){
  if (image_number < IMAGES.length){
    animate(img, delta, false);
  } else {
    animate(img, delta, true);
  }
}

/* Highlight real or fake */
function highlight(id, color){
  var old_color = $("#" + id).css("backgroundColor");
  $("#" + id).animate({backgroundColor:color}, HIGHLIGHT_SPEED, "linear", function () {
    $("#" + id).animate({backgroundColor:old_color}, HIGHLIGHT_SPEED, "linear");
  });
}

/* Call highlight, move the swiped image, either show next image or final page */
function animate(img, delta, last){
  var old_margin = img.css("marginLeft");
  if (IMAGES[image_number - 1] == 1) {
    highlight("real", "green");
  } else {
    highlight("fake", "red");
  }

  if (image_number == 1) {
    preload(
    "/assets/img/Swipe6.jpg",
    "/assets/img/Swipe7.jpg",
    "/assets/img/Swipe8.jpg",
    "/assets/img/Swipe9.jpg",
    "/assets/img/Swipe10.jpg"
    )
  } else if (image_number == 6) {
    preload(
    "/assets/img/Swipe11.jpg",
    "/assets/img/Swipe12.jpg",
    "/assets/img/Swipe13.jpg",
    "/assets/img/Swipe14.jpg",
    "/assets/img/Swipe15.jpg"
    );
  } else if (image_number == 11) {
    preload(
    "/assets/img/Swipe16.jpg",
    "/assets/img/Swipe17.jpg",
    "/assets/img/Swipe18.jpg",
    "/assets/img/Swipe19.jpg",
    "/assets/img/Swipe20.jpg"
    );
  } else if (image_number == 16) {
    preload(
    "/assets/img/Swipe21.jpg",
    "/assets/img/Swipe22.jpg",
    "/assets/img/Swipe23.jpg",
    "/assets/img/Swipe24.jpg",
    "/assets/img/Swipe25.jpg"
    );
  }

  image_number++;

  //move left or right based on delta calculated above and reduce opacity
  img.animate({marginLeft: delta + "px",opacity: 0}, SWIPE_SPEED, "linear", function(){
    if (last == false) {
      //switch out old image and bring in new image
      //STUBBED FOR TESTING
      img.attr("src",preloaded_images[image_number-1].src).load(function(){
      // img.attr("src","assets/img/finalcorn" + image_number +".png").load(function(){
        //restore prior margin and opacity
        img.css({
          "margin-left": old_margin,
          opacity: 1,
        });
      });
    } else {
      sessionStorage.setItem("scores", scores);
      window.location.href = "last.html";
    }
  });
}