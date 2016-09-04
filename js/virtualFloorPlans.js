var _pictureIndex = 0;
var cameraPoints = [];
var data;



function removeIconClicks() {
    $('.clickCamera').off('click');
}

function removeFloorPlanClicks() {
    $('#floorPlan').off('click');
}

function showFloorPlan() {
    $('#pictureContainer').hide();
    moveFloorPlanToMainArea(removeFloorPlanClicks);
}

function highlightIcon(pictureIndex) {
    $('#floorPlan .mapMarker').removeClass(this.json.config.secondaryColor + '-text').addClass('text-' + this.json.config.lightenColor).addClass(this.json.config.mainColor + '-text')
    var $floorPlanIcon = $('#floorPlan').find("[pictureindex='" + pictureIndex + "']");
    $floorPlanIcon.removeClass(this.json.config.mainColor + '-text').removeClass('text-' + this.json.config.lightenColor);
    $floorPlanIcon.addClass(this.json.config.secondaryColor + '-text');

    $('#carousel img').css('border', '2px solid white');


    var $carouselPicture = $('#carousel').find("li[pictureindex='" + pictureIndex + "'] img");
    $carouselPicture.css('border', '2px solid ' + $floorPlanIcon.css('color'));
    this.elastislide.setCurrent(pictureIndex);


}


function changePictureTo(pictureIndex, direction) {
    console.log("called changePictureTo");
    highlightIcon(pictureIndex);
    if (pictureIndex == undefined) {
        throw new Error("Can't show picture. No Picture Index supplied");
    }
    var element = $('#floorPlan').find("[pictureindex='" + pictureIndex + "']");

    $('#pictureContainer').show();

    if (element.hasClass("fa-camera")) {
        if (direction == "UP"){
          movePictureUp();
        }

        $("#pictureViewer").css({
            "background": "url('" + $(element).attr('ref') + "')",
            "background-size": "100% 100%"
        });
        $("#panorama").hide();
        $("#pictureViewer").show();
    } else if (element.hasClass("fa-dot-circle-o")) {
      $("#panorama").show();
      $("#pictureViewer").hide();
      if (direction == "UP"){
        movePictureUp(function(){
          load360Picture($(element).attr('ref'));
        });
      } else{
          load360Picture($(element).attr('ref'));
      }


    }
}

function load360Picture(reference){
  pannellum.viewer('panorama', {
      "type": "equirectangular",
      "panorama": reference,
      "autoLoad": true
  });
}

function movePictureUp(callback){
  var targetWidth = $('#imageArea').width();
  var targetHeight = $('#imageArea').height();

  $('#pictureContainer').css({"top":targetHeight,"left":targetWidth/2});
  $('#pictureContainer').height("0px");
  $('#pictureContainer').width("0px");
  $("#pictureContainer").animate({
      "width": targetWidth,
      "height": targetHeight,
      "top": 0,
      "left": 0
  }, {
      duration: 175,
      queue: false,
      complete : function(){
        if (callback){
         callback()
       }
     }
  });
}


function moveFloorPlanToThumbnail(callback) {
    if ($("#floorPlan").hasClass("minimised")) {
        if (callback) {
            callback()
            return;
        }
    }
    var $floorPlanLocation = $("#floorPlanLocation");
    var $navArea = $('#navArea');
    $("#floorPlan .btn-floating").animate({
        "opacity": 0
    }, {
        duration: 100,
        queue: false,
        complete: function() {
            console.log("buttons hidden")
            $("#floorPlan .btn-floating").hide();
        }
    });
    $("#floorPlan .mapMarker").animate({
        "font-size": 8
    }, {
        duration: 100,
        queue: false
    });


    $("#floorPlan").animate({
        width: $floorPlanLocation.width()
    }, {
        duration: 200,
        queue: false
    });

    $("#floorPlan").animate({
        top: $navArea.position().top + $floorPlanLocation.innerWidth() - $floorPlanLocation.width(),
        left: $floorPlanLocation.innerWidth() - $floorPlanLocation.width(),

        height: $floorPlanLocation.height(),
    }, {
        duration: 300,
        queue: false,
        complete: function() {
            removeIconClicks();
            $("#floorPlan").addClass("minimised");
            $("#floorPlan").on('click', showFloorPlan);
            if (callback) {
                callback();
            }
        }
    });
}

function moveFloorPlanToMainArea(callback) {

    if (!$("#floorPlan").hasClass("minimised")) {
        if (callback) {
            callback()
            return;
        }
    }
    $("#floorPlan .btn-floating").show();
    setTimeout(function() {
        $("#floorPlan .btn-floating").animate({
            "opacity": 1
        }, {
            duration: 100,
            queue: false
        });
        $("#floorPlan .mapMarker").animate({
            "font-size": 20
        }, {
            duration: 100,
            queue: false
        });
    }, 200);
    setTimeout(function() {
        $("#floorPlan").animate({
            width: "100%"
        }, {
            duration: 200,
            queue: false
        });
    }, 100);



    $("#floorPlan").animate({
        top: 0,
        left: 0,
        height: 600,
    }, {
        duration: 300,
        queue: false,
        complete: function() {
            addIconClicks();
            $("#floorPlan").removeClass("minimised");
            if (callback) {
                callback();
            }
        }
    });
}

function addIconClicks() {
    $('.clickCamera').on('click', function() {
        var pictureIndex = $(this).attr('pictureindex');
        return moveFloorPlanToThumbnail(function() {
            changePictureTo(pictureIndex,"UP")
        });
    });
}

function makeContainer(id, json) {
    var mainColor = json.config.mainColor;
    $('#' + id).append('' +
        '<div id="vContainer" class="z-depth-1">' +
        '<div id="floorPlan">' +
        '<i id="visibleButton" class="btn-floating btn-large waves-effect waves-light ' + mainColor + ' fa fa-eye" aria-hidden="true"></i>' +
        '</div>' +
        '<div id="pictureContainer">' +
        '<div id="panorama"></div>' +
        '<div id="pictureViewer"></div>' +
        '<i id="leftButton" class="btn-floating btn-large waves-effect waves-light ' + mainColor + ' fa fa-arrow-left" aria-hidden="true"></i>' +
        '<i id="rightButton" class="btn-floating btn-large waves-effect waves-light ' + mainColor + ' fa fa-arrow-right" aria-hidden="true"></i>' +
        '</div>' +
        '<div id="imageArea">' +
        '</div>' +
        '<div id="navArea">' +
        '<div id="floorPlanLocation"></div>' +
        '<div id="carouselLocation">' +
        '<ul id="carousel" class="elastislide-list">' +
        '</div>' +
        '</div>' +
        '</div>');

}



function loadFloorPlan(id, json) {
    makeContainer(id, json);
    this.json = json;

    var pictureIndex = 0;

    for (var i = 0; i < json.data.length; i++) {
        var floor = json.data[i];
        var floorButton = $('<div id="floor' + floor.number + '" class="floorButton btn-floating btn">' + floor.number + '</div>');
        floorButton.addClass(json.config.mainColor);
        floorButton.attr("ref", floor.url);
        floorButton.attr("floor", floor.number);
        $('#floorPlan').append(floorButton);

        if (i > 0) {
            floorButton.addClass(json.config.lightenColor);
        }
        floorButton.css('top', (80 + 50 * i) + "px");
        $(floorButton).on('click', function() {
            $('#floorPlan').css({
                "background": "url('" + $(this).attr("ref") + "') no-repeat center center",
                "background-size": "contain"
            });
            $('#floorPlan').css('background-size', 'contain');
            $('.mapMarker').hide();
            $('.floor' + $(this).attr("floor")).show();
            $('.floorButton').addClass('waves-effect waves-light');
            $('.floorButton').removeClass(json.config.lightenColor);
            $(this).removeClass('waves-effect waves-light');
            $(this).addClass(json.config.lightenColor);
        });
        var $carousel = $('#carousel');
        for (var j = 0; j < floor.location.length; j++) {
            var location = floor.location[j];

            var template = $('<i class="clickCamera fa animated mapMarker ' + json.config.mainColor + '-text text-' + json.config.lightenColor + '" aria-hidden="true"></i>');
            template.css({
                "left": location.left,
                "top": location.top,
                "transform": "rotate(" + location.rotation + "deg)"
            })
            template.addClass("floor" + (i + 1));
            template.attr('pictureindex', pictureIndex);
            if (location.type == "camera") {
                template.addClass("fa-camera");
            } else {
                template.addClass("fa-dot-circle-o");
            }
            template.attr('ref', location.url);
            $('#floorPlan').append(template);
            cameraPoints.push(location);
            $carousel.append('<li pictureindex="' + pictureIndex + '"><a href="#"><img width="150" height="120" src="' + location.url + '"/></a></li>')
            pictureIndex++;
        }
    }
    this.elastislide= $('#carousel').elastislide({
        'onReady': function() {
            $('.elastislide-wrapper nav span').addClass(json.config.mainColor);
            highlightIcon(0);

        },
        "onClick": function(element, position, evt) {
            moveFloorPlanToThumbnail(function() {
                return changePictureTo(element.attr('pictureindex'),"UP")
            });
        }
    });

    $('#floor1').click();


    $('#visibleButton').on('click', function() {
        if ($(this).hasClass("accent-1")) {
            // Set to hide icons
            console.log("Visible")
            setTimeout(function() {
                console.log("Hide")
                $('#visibleButton').removeClass("waves-" + json.config.mainColor);
                $('#visibleButton').addClass("waves-light");
            }, 500)
            $(this).removeClass("accent-1");
            $('.mapMarker').removeClass("fadeOut");
            $('.mapMarker').addClass("fadeIn");
            //$('.mapMarker').show();
            //Materialize.fadeInImage('.mapMarker')
        } else {
            setTimeout(function() {
                console.log("Hide")
                $('#visibleButton').addClass("waves-" + json.config.mainColor);
                $('#visibleButton').removeClass("waves-light");
            }, 500)
            $('#visibleButton').addClass("accent-1");
            $('.mapMarker').addClass("fadeOut");
            $('.mapMarker').removeClass("fadeIn");
        }




    })

    addIconClicks();

    $('#leftButton').on('click', function() {
        console.log("clicked left");
        _pictureIndex--;
        _pictureIndex = (cameraPoints.length + _pictureIndex) % cameraPoints.length;
        changePictureTo(_pictureIndex,"LEFT");
    });



    $('#rightButton').on('click', function() {
        console.log("clicked right");
        _pictureIndex++;
        _pictureIndex = (cameraPoints.length + _pictureIndex) % cameraPoints.length;
        changePictureTo(_pictureIndex,"RIGHT");
    });
}
