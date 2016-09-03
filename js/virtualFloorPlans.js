var _pictureIndex = 0;
var cameraPoints = [];
var data;

function clickCamera(pictureIndex) {
    if (pictureIndex==undefined){
      throw new Error("Can't show picture. No Picture Index supplied");
    }
    var element = $('#floorPlan').find("[pictureindex='" + pictureIndex + "']");

    $('#pictureContainer').show();
    $('#floorPlan').hide();
    if (element.hasClass("fa-camera")) {
        $("#pictureViewer").css({
            "background": "url('" + $(element).attr('ref') + "')",
            "background-size": "100% 100%"
        });
        $("#panorama").hide();
        $("#pictureViewer").show();
    } else if (element.hasClass("fa-dot-circle-o")) {
        $("#panorama").show();
        $("#pictureViewer").hide();
        pannellum.viewer('panorama', {
            "type": "equirectangular",
            "panorama": $(element).attr('ref'),
            "autoLoad": true
        });
    }
}

function makeContainer(id,json){
  var mainColor = json.config.mainColor;
  $('#'+id).append(''
    +'<div id="vContainer" class="z-depth-1">'
      +'<div id="imageArea">'
        +'<div id="floorPlan">'
          +'<i id="visibleButton" class="btn-floating btn-large waves-effect waves-light '+mainColor+' fa fa-eye" aria-hidden="true"></i>'
        +'</div>'
        +'<div id="pictureContainer">'
          +'<div id="panorama"></div>'
          +'<div id="pictureViewer"></div>'
          +'<i id="homeButton" class="btn-floating btn-large waves-effect waves-light '+mainColor+' fa fa-home" aria-hidden="true"></i>'
          +'<i id="leftButton" class="btn-floating btn-large waves-effect waves-light '+mainColor+' fa fa-arrow-left" aria-hidden="true"></i>'
          +'<i id="rightButton" class="btn-floating btn-large waves-effect waves-light '+mainColor+' fa fa-arrow-right" aria-hidden="true"></i>'
        +'</div>'
      +'</div>'
      +'<ul id="carousel" class="elastislide-list">'
    +'</div>');

}



function loadFloorPlan(id, json) {
    makeContainer(id, json);
    json = json;

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

            var template = $('<i class="clickCamera fa animated mapMarker '+json.config.mainColor+'-text text-'+json.config.lightenColor+'" aria-hidden="true"></i>');
            template.css({
                "left": location.left,
                "top": location.top,
                "transform": "rotate(" + location.rotation + "deg)"
            })
            template.addClass("floor" + (i + 1));
            template.attr('pictureindex', pictureIndex++);
            if (location.type == "camera") {
                template.addClass("fa-camera");
            } else {
                template.addClass("fa-dot-circle-o");
            }
            template.attr('ref', location.url);
            $('#floorPlan').append(template);
            cameraPoints.push(location);
            $carousel.append('<li><a href="#"><img width="150" height="120" src="'+location.url+'"/></a></li>')
        }
    }
    $('#carousel').elastislide();
    $('#floor1').click();


    $('#visibleButton').on('click', function() {
        if ($(this).hasClass("accent-1")) {
            // Set to hide icons
            console.log("Visible")
            setTimeout(function() {
                console.log("Hide")
                $('#visibleButton').removeClass("waves-"+json.config.mainColor);
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
                $('#visibleButton').addClass("waves-"+json.config.mainColor);
                $('#visibleButton').removeClass("waves-light");
            }, 500)
            $('#visibleButton').addClass("accent-1");
            $('.mapMarker').addClass("fadeOut");
            $('.mapMarker').removeClass("fadeIn");
        }




    })


    $('.clickCamera').on('click', function() {
        var pictureIndex = $(this).attr('pictureindex');
        return clickCamera(pictureIndex)
    });
    $('#homeButton').on('click', function() {
        $('#pictureContainer').hide();
        $('#floorPlan').show();
    });

    $('#leftButton').on('click', function() {
        console.log("clicked left");
        _pictureIndex--;
        _pictureIndex = (cameraPoints.length + _pictureIndex) % cameraPoints.length;
        clickCamera(_pictureIndex);
    });



    $('#rightButton').on('click', function() {
        console.log("clicked right");
        _pictureIndex++;
        _pictureIndex = (cameraPoints.length + _pictureIndex) % cameraPoints.length;
        clickCamera(_pictureIndex);
    });
}
