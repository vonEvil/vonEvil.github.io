var _pictureIndex = 0;
var cameraPoints = [];
var data;

function clickCamera(element) {
    $('#pictureContainer').show();
    $('#floorPlan').hide();
    if ($(element).hasClass("fa-camera")) {
        _pictureIndex = parseInt($(element).attr('pictureIndex'));

        $("#pictureViewer").css({
            "background": "url('" + $(element).attr('ref') + "')",
            "background-size": "100% 100%"
        });
        $("#panorama").hide();
        $("#pictureViewer").show();
    } else if ($(element).hasClass("fa-dot-circle-o")) {
        $("#panorama").show();
        $("#pictureViewer").hide();
        pannellum.viewer('panorama', {
            "type": "equirectangular",
            "panorama": $(element).attr('ref'),
            "autoLoad": true
        });
    }
}

function loadFloorPlan(data) {
    $('#pictureContainer').show();
    $('#floorPlan').hide();
    if ($(element).hasClass("fa-camera")) {
        _pictureIndex = parseInt($(element).attr('pictureIndex'));

        $("#pictureViewer").css({
            "background": "url('" + $(element).attr('ref') + "')",
            "background-size": "100% 100%"
        });
        $("#panorama").hide();
        $("#pictureViewer").show();
    } else if ($(element).hasClass("fa-dot-circle-o")) {
        $("#panorama").show();
        $("#pictureViewer").hide();
        pannellum.viewer('panorama', {
            "type": "equirectangular",
            "panorama": $(element).attr('ref'),
            "autoLoad": true
        });
    }

    var pictureIndex = 0;

    for (var i = 0; i < data.length; i++) {
        var floor = data[i];
        var floorButton = $('<div id="floor' + floor.number + '" class="floorButton btn-floating btn red">' + floor.number + '</div>');
        floorButton.attr("ref", floor.url);
        floorButton.attr("floor", floor.number);
        $('#floorPlan').append(floorButton);

        if (i > 0) {
            floorButton.addClass(" accent-1");
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
            $('.floorButton').removeClass('accent-1');
            $(this).removeClass('waves-effect waves-light');
            $(this).addClass('accent-1');
        });

        for (var j = 0; j < floor.location.length; j++) {
            var location = floor.location[j];

            var template = $('<div class="animated mapMarker"><div class="cone"></div><i  class="clickCamera animated fa" ref="./assets/48CanterburyRd_SittingRoom1.jpg" aria-hidden="true"></i></div></div>');
            template.css({
                "left": location.left,
                "top": location.top,
                "transform": "rotate(" + location.rotation + "deg)"
            })
            template.addClass("floor" + (i + 1));
            template.find('.fa').attr('pictureindex', pictureIndex++);
            if (location.type == "camera") {
                template.find('.fa').addClass("fa-camera");
            } else {
                template.find('.fa').addClass("fa-dot-circle-o");
                template.find('.cone').remove();
            }
            template.find('.fa').attr('ref', location.url);
            $('#floorPlan').append(template);
            cameraPoints.push(location);
        }
    }

    $('#floor1').click();


    $('#visibleButton').on('click', function() {
        if ($(this).hasClass("accent-1")) {
            // Set to hide icons
            console.log("Visible")
            setTimeout(function() {
                console.log("Hide")
                $('#visibleButton').removeClass("waves-red");
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
                $('#visibleButton').addClass("waves-red");
                $('#visibleButton').removeClass("waves-light");
            }, 500)
            $('#visibleButton').addClass("accent-1");
            $('.mapMarker').addClass("fadeOut");
            $('.mapMarker').removeClass("fadeIn");
        }




    })


    $('.clickCamera').on('click', function() {
        return clickCamera(this)
    });
    $('#homeButton').on('click', function() {
        $('#pictureContainer').hide();
        $('#floorPlan').show();
    });

    $('#leftButton').on('click', function() {
        console.log("clicked left");
        _pictureIndex--;
        _pictureIndex = (cameraPoints.length + _pictureIndex) % cameraPoints.length;
        var previousCamera = $('#floorPlan').find("[pictureindex='" + _pictureIndex + "']");
        clickCamera(previousCamera[0]);
    });

    $('#rightButton').on('click', function() {
        console.log("clicked right");
        _pictureIndex++;
        _pictureIndex = (cameraPoints.length + _pictureIndex) % cameraPoints.length;
        var previousCamera = $('#floorPlan').find("[pictureindex='" + _pictureIndex + "']");
        clickCamera(previousCamera[0]);
    });
}

$(document).ready(function() {

    $.getJSON("./data/house2.json", function(data) {
        data = data;
        loadFloorPlan(data);
    });

});
