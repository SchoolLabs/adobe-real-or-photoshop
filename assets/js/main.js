/* indicates whether image is real or fake */
// count help 1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5
var IMAGES = [0,1,0,1,1,1,1,0,1,1,0,0,1,0,1,0,0,0,1,0,0,1,0,0,1];
var BEG_DELTA = 120;
var SWIPE_SPEED = 250;
var HIGHLIGHT_SPEED = 250;
var delta = 0;
var correct_number = 0;
var image_number = 1;
var scores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var old_margin = 0;
var first = true;
var lock = false;
var once = false;

var transitionTime = 2400;
var hover_lock = false;
var check_or_x = "Adobe_Desktop_X_V1";
var att_arr = ["Abbey Benson &copy;",
                "Benjamin Von Wong &copy;",
                "Maximilian Gibas &copy;",
                "Glen Wexler &copy;",
                "Andreas Tauber &copy;",
                "Jeronimo Contreras Flores &copy;",
                "Christian Adam / Massif &copy;",
                "Joel Robison / Trevillion Images &copy;",
                "Natalie Fletcher &copy;",
                "Max Ellis / Caters News &copy;",
                "Adrian Chudek &copy;",
                "Ionut Caras &copy;",
                "Andres Amador / Remix &copy;",
                "Oleg Belov &copy;",
                "Esmar Abdul &copy;",
                "Oliver Zwilling &copy;",
                "Andrey Shupilo / Adobe Stock &copy;",
                "Matthias Leberle &copy;",
                "Aman Agrawal &copy;",
                "Hossein Zare &copy;",
                "Glen Wexler &copy;",
                "Corey Rich &copy;",
                "Ben Heine &copy;",
                "Deborah DeFranco &copy;",
                "Pete McBride &copy;"];

setMobileOperatingSystemLinks();

if (!Modernizr.touch) {
    $(document.body).addClass("desktop");
} else {
    $(document.body).addClass("mobile");
}

/* Calculate and return delta, which is the direction and distance the image will move.
This method also sets "scores" each time the user swipes */
function score_swipe(event) {
    if (event.type === "swipeleft" || event.target.id == "desktop-photoshop") {
        delta = BEG_DELTA;
        if(Modernizr.touch) {
            delta = -1 * BEG_DELTA;
        }
         delta = -1 * BEG_DELTA;

        if (IMAGES[image_number - 1] == 0) {
            correct_number++;
            check_or_x = "Adobe_Desktop_CHECK_V1";
            scores[image_number - 1] = 1;
        }
    } else {
        if(Modernizr.touch) {
            delta = BEG_DELTA;
        } else {
            delta = -1 * BEG_DELTA;
        }

         delta = BEG_DELTA;
        if (IMAGES[image_number - 1] == 1) {
            correct_number++;
            check_or_x = "Adobe_Desktop_CHECK_V1";
            scores[image_number - 1] = 1;
        }
    }
    return delta;
}

/* Slide transition will either show next image or redirect to final page via anmate */
function slide_transition(img) {
    incremental_preload(image_number);
    if (first) {
        image_number = getParameterByName('image');
        first = false;
        if (!image_number) {
            image_number = 1;
        }
    }
    // image_number = 25;
    if (image_number < IMAGES.length) {
        animate(img, delta);
    } else {
        build_grid();
        $("#img-row").off();
    }
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

/* Call highlight, move the swiped image, either show next image or final page */
function animate(img, delta, last) {
    hover_lock = true;
    var real = IMAGES[image_number - 1];
    var score = scores[image_number - 1];
    image_number++;
    //move left or right based on delta calculated above and reduce opacity
    img.animate({
        marginLeft: delta + "px",
        opacity: 0
    }, SWIPE_SPEED, "linear", function() {
        var selector = "";
        var or_selector = "";
        var or_height = 0;
        var or_margin = 0;
        var src1 = "";
        var src2 = "";
        if (real) {
            selector = "real";
            not_selector = "photoshop";
        } else {
            selector = "photoshop";
            not_selector = "real";
        }

        var photoShopGuess = (delta < 0 )? 1 : 0;
        console.log("CLICK", photoShopGuess);
        if (Modernizr.touch) {


            or_selector = "mobile-or";
            image = $("#img-text-col #mobile-" + selector);
            not_image = $("#img-text-col #mobile-" + not_selector);
            if (selector == "real") {
                src1 = "new/Adobe_RealOrPhotoshop_Real_White";
                src2 = "buttons/photoshop_off_btn";
                src2 = (score)? "labels/real_correct_label" : "labels/real_incorrect_label";
                not_src1 = "new/Adobe_RealOrPhotoshop_Photoshop_White";
                not_src2 = getRandomImage(photoShopGuess, score); //randomize
            } else {
                src1 = "new/Adobe_RealOrPhotoshop_Photoshop_White";
                src2 = (score)? "labels/photoshop_correct_label" : "labels/photoshop_incorrect_label";
                not_src1 = "new/Adobe_RealOrPhotoshop_Real_White";
                not_src2 = getRandomImage(photoShopGuess, score); //randomize
            }
        } else {
            or_selector = "desktop-or";
            image = $("#desktop-right-section #desktop-" + selector);
            not_image = $("#desktop-right-section #desktop-" + not_selector);
            if (selector == "real") {
                src1 = "buttons/real_off_btn";
                src2 = (score)? "buttons/real_correct_btn" : "buttons/real_incorrect_btn";
                not_src1 = "buttons/photoshop_off_btn";
                not_src2 = getRandomImage(photoShopGuess, score); //randomize
            } else {
                src1 = "buttons/photoshop_off_btn";
                src2 = (score)? "buttons/photoshop_correct_btn" : "buttons/photoshop_incorrect_btn";
                not_src1 = "buttons/real_off_btn";
                not_src2 = getRandomImage(photoShopGuess, score); //randomize
            }
        }

        $("#" + or_selector).css({"opacity":0});
        image.attr('src', "assets/img/" + src2 + ".png");
        not_image.attr('src', "assets/img/" + not_src2 + ".png");


        $("#att-text").html("<p id='att-text'>" + att_arr[image_number - 1] + "</p>");

        setTimeout( function() {
            image.attr('src', "assets/img/" + src1 + ".png");
            // not_image.css({"height": not_image_old_height, "margin-top": not_image_old_margin});
            not_image.attr('src', "assets/img/" + not_src1 + ".png");
            $("#" + or_selector).css({"opacity":1});
            lock = false;
            hover_lock = false;
        }, transitionTime);


        if (preloaded_images[image_number - 1] === undefined) {
            img.attr("src", "assets/img/new/Swipe" + image_number + ".jpg").load(function() {
                //restore prior margin and opacity
                img.css({
                    "margin-left": old_margin,
                    opacity: 1,
                });
            });
        } else {
            img.attr("src", "assets/img/new/" + check_or_x + ".png").load(function() {
                //restore prior margin and opacity
                img.css({
                    "margin-left": old_margin,
                    opacity: 1,
                    "border-width": "0px"
                });
            });
            $("#att-text").css({opacity:0});
            setTimeout( function() {
                img.attr("src", preloaded_images[image_number - 1].src).load(function() {
                    //restore prior margin and opacity
                    img.css({
                        "margin-left": old_margin,
                        opacity: 1,
                        "border-width": "1px"
                    });
                });
                $("#att-text").css({opacity:1});
                $("#current-number").html(image_number);
            }, transitionTime);
        }
        check_or_x = "Adobe_Desktop_X_V1"; //reset
    });
}

function build_grid() {
    $("#main-img").hide();
    var sum = 0;
    for (var i = 0; i < scores.length; i++) {
        sum += parseInt(scores[i]);
        if (i % 5 == 0) {
            // $("<div class='row grid-row'></div>").insertBefore($("#img-col #grid-text"));
            $("#img-col").append("<div class='row grid-row'></div>");
        }
        if (scores[i] == 1) {
            $(".grid-row:last").append("<div class='col-xs-15 grid-img'><img class='img' src='assets/img/Adobe_Clearx_v1_12.19.15.png'></div>");
            $(".grid-row:last .grid-img:last .img").css({'background-image':'url("assets/img/new/Grid' + (i + 1) + '.jpg")'});
        } else {
            $(".grid-row:last").append("<div class='col-xs-15 grid-img'><img class='img' src='assets/img/Adobe_RedX_v1_12.19.15.png'></div>");
            $(".grid-row:last .grid-img:last .img").css({'background-image':'url("assets/img/new/Grid' + (i + 1) + '.jpg")'});
        }
    }
    imagesLoaded("#grid", function() {
        results_grid_transition(sum);
    });
}

function setMobileOperatingSystemLinks() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  if( userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) ){
    // $("#upper-left-link").attr("href","http://www.apple.com");
    // $("#upper-right-link").attr("href","http://www.apple.com");
  }
  else if( userAgent.match( /Android/i ) ){
    // $("#upper-left-link").attr("href","http://www.android.com");
    // $("#upper-right-link").attr("href","http://www.android.com");
  }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var real_images = ["Adobe_Mobile_R_ImageSwap_032615", "Adobe_Mobile_R_ImageSwap2_032615", "Adobe_Mobile_R_ImageSwap3_032615"];
var pshop_images = ["Adobe_Mobile_PS_ImageSwap_032615", "Adobe_Mobile_PS_ImageSwap2_032615", "Adobe_Mobile_PS_ImageSwap3_032615"];

var ps_correct_images = ["Feedback_Selected/PS-Correct/PS-correct-nailedit","Feedback_Selected/PS-Correct/PS-correct-skills","Feedback_Selected/PS-Correct/PS-correct-whatgave","Feedback_Selected/PS-Correct/PS-correct-wish","Feedback_Selected/PS-Correct/PS-correct-yep"];
var ps_wrong_images = ["Feedback_Selected/PS-Incorrect/PS-incorrect-cmon","Feedback_Selected/PS-Incorrect/PS-incorrect-duped","Feedback_Selected/PS-Incorrect/PS-incorrect-gotya","Feedback_Selected/PS-Incorrect/PS-incorrect-duped","Feedback_Selected/PS-Incorrect/PS-incorrect-gotya"]//,"Feedback_Selected/PS-Incorrect/PS-incorrect-yep-that-good";"Feedback_Selected/PS-Incorrect/PS-incorrect-convincing",
var real_correct_images = ["Feedback_Selected/Real-Correct/REAL-correct-cheating","Feedback_Selected/Real-Correct/REAL-correct-good-eye","Feedback_Selected/Real-Correct/REAL-correct-know-it-all","Feedback_Selected/Real-Correct/REAL-correct-right-on","Feedback_Selected/Real-Correct/REAL-correct-you-know"];
var real_wrong_images  = ["Feedback_Selected/Real-Incorrect/REAL-incorrect-as-if","Feedback_Selected/Real-Incorrect/REAL-incorrect-at-best","Feedback_Selected/Real-Incorrect/REAL-incorrect-magic","Feedback_Selected/Real-Incorrect/REAL-incorrect-maybe","Feedback_Selected/Real-Incorrect/REAL-incorrect-trust"];

function getRandomImage(pshop,score) {
    var image_index = getRandomInt(0,4);

    console.log("getting image, pshop== ", pshop, " score== "+ score);
    if (pshop == 1 && score == 1) {
        console.log("PHOTOSHOP CORRECT", ps_correct_images[image_index]);
        return ps_correct_images[image_index];
    } else if (pshop == 1 && score == 0) {
        console.log("PHOTOSHOP INCORRECT", ps_wrong_images[image_index]);
        return ps_wrong_images[image_index];
    } else if (pshop == 0 && score == 0) {
        console.log("REAL INCORRECT", real_wrong_images[image_index]);
        return real_wrong_images[image_index];
    } else if (pshop == 0 && score == 1) {
        console.log("REAL CORRECT", real_correct_images[image_index]);
        return real_correct_images[image_index];
    } else {
        console.log("ELSE");
        return real_correct_images[image_index];
        console.log("image warning");
    }
}
