function splash_screen_transition() {
    /* Event handlers */
    if (Modernizr.touch) {
        $("#img-row").on("swipeleft swiperight", mobile_touch);
    } else {
        $("#img-row").on("click", desktop_click);
    }

    $("#ps-logo").hide();
    $("#spin").hide();
    // $("#two-five-logo").hide();
    $("#upper-left-adobe").show();
    $("#terms").show();
    // $("#bottom-right-adobe").show();

    $("#img-col").append("<div id='twenty-five-wrapper'><p id='twenty-five-text' class='text-center'>SSS</p></div>");
    $("#twenty-five-wrapper").show();
    if (window.innerHeight < 600) {
        $("#twenty-five-text").html("Some things are so amazing, we're not sure if they're Real or Photoshop. Can you tell?<br/><br/>Test your powers of observation.");
    } else {
        $("#twenty-five-text").html("Photoshop users make the impossible possible, and for that, we thank them for taking creativity to places we never could have dreamed. Some things are so amazing, we're not sure if they're Real or Photoshop. Can you tell?<br/><br/>Test your powers of observation.");
    }

    $("#twenty-five-wrapper").append("<img class='center-block' id='two-five-real' src='assets/img/new/Adobe_REAL_PsBlue_040615.png'>");
    $("#twenty-five-wrapper").append("<img class='center-block' id='two-five-or' src='assets/img/new/Adobe_Desktop_Or.png'>");
    $("#twenty-five-wrapper").append("<img class='center-block' id='two-five-photoshop' src='assets/img/new/Adobe_PT_PsBlue_040615.png'>");

    if (Modernizr.touch) {
        $("#twenty-five-wrapper").append("<img class='center-block' id='start-button' src='assets/img/new/Adobe_SwipeStart_040815.png'>");
    }
    else {
        $("#twenty-five-wrapper").append("<img class='center-block' id='start-button' src='assets/img/new/start_orig.png'>");
        $("#start-button").hover(
            function() {
                $("#start-button").attr("src","assets/img/new/start_roll.png");
                $("#start-button").css({ cursor: "pointer", cursor: "hand"});
            }, function() {
                $("#start-button").attr("src","assets/img/new/start_orig.png");
               $("#start-button").css({ cursor: "none"});
        });
    }
}

function mobile_touch (event){
    if (once == false) {
        twenty_five_transition();
        $('#copy-footer').hide();
        old_margin = $("#main-img").css("marginLeft");
    } else {
        if (lock === false) {
            lock = true;
            delta = score_swipe(event);
            slide_transition($("#main-img"));
        }
    }
    once = true;
}

function desktop_click (event){
    if (event.target.id == "start-button") {
        twenty_five_transition();
        $('#copy-footer').hide();
        old_margin = $("#main-img").css("marginLeft");
        once = true;
    } else if (event.target.id == "desktop-real") {
        if (lock === false) {
            lock = true;
            delta = score_swipe(event);
            slide_transition($("#main-img"), "real");
        }
    } else if (event.target.id == "desktop-photoshop") {
        if (lock === false) {
            lock = true;
            delta = score_swipe(event);
            slide_transition($("#main-img"), "ps");
        }
    }
}
function twenty_five_transition() {
    // fix bug of retina.js
    // it will set height = 0 and width = 0 to img
    // which are in a container that is initially not
    // visible
    $img = $('#main-img');
    $img.removeAttr('height');
    $img.removeAttr('width');
    $("html, body").css({
            "background": "none",
            "background-color": "#11162f"
    });
    $("#two-five-logo").hide();
    $("#stat-counter").show();
    $("#current-number").show();
    $("#img-col").addClass("col-lg-7");
    $("#img-row").append("<div class='col-lg-5' id='desktop-right-section'></div>")
    $("#desktop-right-section").show();
    $("#desktop-right-section").append("<img id='desktop-right-img' src='assets/img/new/Adobe_MobileStates_LoadingScreen_25Logo.png'></img>");
    $("#twenty-five-wrapper").hide();
    if (Modernizr.touch) {
        $("#desktop-right-section").hide();
        $("#desktop-right-img").hide();
        $("#img-text-row").show();
        $("#img-text-col").append("<img class='center-block' id='mobile-real' src='assets/img/new/Adobe_RealOrPhotoshop_Real_White.png'>");
        $("#img-text-col").append("<img class='center-block' id='mobile-or' src='assets/img/new/Adobe_Desktop_Or.png'>");
        $("#img-text-col").append("<img class='center-block' id='mobile-photoshop' src='assets/img/new/Adobe_RealOrPhotoshop_Photoshop_White.png'>");
        $("#img-text-col").append("<p id='main-test'>Test your powers of observation.</p>");
        // $("#img-text-row").css("background-image", "url(assets/img/new/Adobe_MobileStates_SplashScreen_RealOrPhotoshop.png)");
        $("#img-text-row").css({
            "height": "20%"
        });
        $("#img-row").css({
            "height": "70%"
        });
        $("#img-col").append("<div id='mobile-attribution' class='row'></div>");
        $("#mobile-attribution").append("<p id='att-text'>Alter &copy; 2011</p>");
        $("#img-col").append("<div id='below-main-mobile' class='row'></div>");
        // $("#below-main-mobile").append("<img id='left-real-mobile' class='col-xs-offset-1 col-xs-2' src='assets/img/new/Adobe_MobileStates_LeftForReal.png'></img>");
        // $("#below-main-mobile").append("<img id='swipe-mobile' class='col-xs-offset-2 col-xs-2' src='assets/img/new/Adobe_MobileStates_Swipe.png'></img>");
        // $("#below-main-mobile").append("<img id='right-photoshop-mobile' class='col-xs-offset-2 col-xs-2' src='assets/img/new/Adobe_Mobile-States_RightForPhotoshop.png'></img>");
        $("#below-main-mobile").append("<div id='left-real-mobile' class='col-xs-4'><img id='left-real-mobile-image' src='assets/img/mobile-swipe/swipe-L-PS.png'></img></div>");
        $("#below-main-mobile").append("<div id='swipe-mobile' class='col-xs-4'>SWIPE</div>");
        $("#below-main-mobile").append("<div id='right-photoshop-mobile' class='col-xs-4'><img id='right-photoshop-mobile-image' src='assets/img/mobile-swipe/swipe-R-REAL.png'></img></div>");
    } else {
        $("#img-col").removeClass("col-lg-7");
        $("#desktop-right-section").removeClass("col-lg-5");
        $("#img-col").addClass("col-xs-7");
        $("#desktop-right-section").addClass("col-xs-5");
        $("#img-row").css({
            "padding-top": "10%"
        });
        $("#desktop-right-section").append("<p id='desktop-test'>Test your powers of observation.</p>");
        $("#desktop-right-section").append("<img class='center-block' id='desktop-real' src='assets/img/buttons/real_off_btn.png'>");
        $("#desktop-right-section").append("<img class='center-block' id='desktop-or' src='assets/img/new/Adobe_Desktop_Or.png'>");
        $("#desktop-right-section").append("<img class='center-block' id='desktop-photoshop' src='assets/img/buttons/photoshop_off_btn.png'>");
        $("#img-col").append("<div id='desktop-attribution' class='row'></div>");
        $("#desktop-attribution").append("<p id='att-text'>Alter &copy; 2011</p>");

        $("#desktop-real").hover(
            function() {
                if (!hover_lock) {
                    $("#desktop-real").attr("src","assets/img/buttons/real_over_btn.png");
                    $("#desktop-real").css({ cursor: "pointer", cursor: "hand"});
                }
            }, function() {
                if (!hover_lock) {
                    $("#desktop-real").attr("src","assets/img/buttons/real_off_btn.png");
                    $("#desktop-real").css({ cursor: "none"});
                }
        });

        $("#desktop-photoshop").hover(
            function() {
                if (!hover_lock) {
                    $("#desktop-photoshop").attr("src","assets/img/buttons/photoshop_over_btn.png");
                    $("#desktop-photoshop").css({ cursor: "pointer", cursor: "hand"});
                }
            }, function() {
                if (!hover_lock) {
                    $("#desktop-photoshop").attr("src","assets/img/buttons/photoshop_off_btn.png");
                    $("#desktop-photoshop").css({ cursor: "none"});
                }
        });

    }
    $("#main-img").show();
    $("#att-text").css({
        color: "white",
    });
}

function results_grid_transition(sum) {
    var varScore = sum.toString();
    var shareURL = "http://dev.schooldoes.com/adobe/www-v10";
    var shareText="I got "+varScore+"/25 right. How would you do in the Real or Photoshop quiz? Test to see what you see: #Photoshop25"; // used by twitter share
    var shareDesc="Photoshop users make the impossible possible, for that we thank them for taking creativity to places we never could've dreamed. Some things are so amazing, we're not sure if they're Real or Photoshop.";
    var twitterShareDesc="Some things are so amazing, we're not sure if they're Real or Photoshop.";
    var shareImage = "http://dev.schooldoes.com/adobe/www-v10/assets/img/social_share/Adobe_Facebook_1200x630_v3.jpg";

    $("#below-main-mobile").hide();
    $("#left-for-fake").hide();
    $("#right-for-real").hide();
    $("#desktop-right-section").show();
    $("#desktop-right-img").hide();
    $("#desktop-real").hide();
    $("#desktop-or").hide();
    $("#desktop-photoshop").hide();
    $("#desktop-attribution").hide();
    $("#mobile-attribution").hide();

    FB.init({
        appId:'1626123840957567', cookie:true,
        status:true, xfbml:true
    });
    // $("#img-row").hide()

    //on desktop display real or photoshop above grid
    if (!Modernizr.touch) {
        $("#img-text-row").show();
        $("#img-text-col").append("<img class='center-block' id='mobile-real' src='assets/img/new/Adobe_RealOrPhotoshop_Real_White.png'>");
        $("#img-text-col").append("<img class='center-block' id='mobile-or' src='assets/img/new/Adobe_Desktop_Or.png'>");
        $("#img-text-col").append("<img class='center-block' id='mobile-photoshop' src='assets/img/new/Adobe_RealOrPhotoshop_Photoshop_White.png'>");
        // $("#img-text-row").css("background-image", "url(assets/img/new/Adobe_MobileStates_SplashScreen_RealOrPhotoshop.png)");
        $("#real, #photoshop").css({
            "height": "25%"
        })
        $("#or").css({
            "height": "20%"
        })
        $("#img-text-row").css({
            "height": "15%"
        });
        $("#img-row").css({
            "height": "75%"
        }); 
    }

    $('#desktop-test, #main-test').html('How good are your powers of observation?');

    $("#desktop-right-section").append("<div id='grid-text-mobile'></div>");
    $("#desktop-right-section").append("<div id='grid-text-desktop'></div>");
    $("#grid-text-mobile").html(sum + "/25 answers correct!");
    $("#grid-text-desktop").html(sum + "/25<br/> answers correct!");

    $("#desktop-right-section").append("<img id='fb_button' src='assets/img/new/FB icon.png'></img>");
    $("#desktop-right-section").append("<img id='brag-about-it' src='assets/img/new/Brag.png'></img>");
    $("#desktop-right-section").append("<img id='twitter_button' src='assets/img/new/Twitter icon.png'></img>");

    $('#fb_button').on("click", function(){
        FB.ui({
          method: 'feed',
          link: shareURL,
          picture:shareImage,
          description:shareDesc,
          caption: shareText,
        }, function(response){});
     });

     $('#twitter_button').on("click", function() {
        window.open("https://twitter.com/share?url="+encodeURIComponent(shareURL)+"&text="+encodeURIComponent(shareText), '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;
     });
}