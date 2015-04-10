var preloaded_images = new Array();
var preloaded_background_images = new Array();
var preloaded_grid_images = new Array();
var background = "";

// if (Modernizr.touch) {
//     background = "Adobe_Mobile States_031115_BackgroundImage.jpg";
// } else {
//     background = "Adobe25_Desktop_BabyLilyPad.jpg";
// }


$("#upper-right-ps-logo").show();
$("#img-col").append("<img class='center-block' id='two-five-logo' src='assets/img/new/Adobe_MobileStates_LoadingScreen_25Logo.png'></img>");
$("#img-col").append("<div id='spin'></div>");

preload(
    "assets/img/new/Swipe1.jpg",
    "assets/img/new/Swipe2.jpg",
    "assets/img/new/Swipe3.jpg",
    "assets/img/new/Swipe4.jpg",
    "assets/img/new/Swipe5.jpg"
);
preload_grid(
    "assets/img/new/Grid1.jpg",
    "assets/img/new/Grid2.jpg",
    "assets/img/new/Grid3.jpg",
    "assets/img/new/Grid4.jpg",
    "assets/img/new/Grid5.jpg"
);

preloaded_background_images.push(new Image());
preloaded_grid_images[preloaded_grid_images.length - 1].src = "assets/img/real_orFAKE.png";
preloaded_background_images.push(new Image());
preloaded_grid_images[preloaded_grid_images.length - 1].src = "assets/img/REALor_fake.png";

function preload() {
    $("#spin").spin();
    for (i = 0; i < preload.arguments.length; i++) {
        preloaded_images.push(new Image());
        preloaded_images[preloaded_images.length - 1].src = preload.arguments[i];
    }
}

function preload_grid() {
    for (i = 0; i < preload_grid.arguments.length; i++) {
        preloaded_grid_images.push(new Image());
        preloaded_grid_images[preloaded_grid_images.length - 1].src = preload_grid.arguments[i];
    }
    $(window).load(function() {
        $("#spin").spin(false);
        splash_screen_transition();
    });
}

function incremental_preload(img_number) {
    if (image_number <= 20) {
        preload("assets/img/new/Swipe" + (img_number+5) + ".jpg")
        preload_grid("assets/img/new/Grid" + (img_number+5) + ".jpg")
    }
}