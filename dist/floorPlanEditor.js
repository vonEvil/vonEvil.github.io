var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var VirtualFloorPlans;
(function (VirtualFloorPlans) {
    (function (Direction) {
        Direction[Direction["Up"] = 0] = "Up";
        Direction[Direction["Down"] = 1] = "Down";
        Direction[Direction["Left"] = 2] = "Left";
        Direction[Direction["Right"] = 3] = "Right";
    })(VirtualFloorPlans.Direction || (VirtualFloorPlans.Direction = {}));
    var Direction = VirtualFloorPlans.Direction;
    (function (FloorPlanLocationType) {
        FloorPlanLocationType[FloorPlanLocationType["Camera360"] = 0] = "Camera360";
        FloorPlanLocationType[FloorPlanLocationType["Camera"] = 1] = "Camera";
        FloorPlanLocationType[FloorPlanLocationType["Video"] = 2] = "Video";
        FloorPlanLocationType[FloorPlanLocationType["HTML"] = 3] = "HTML";
        FloorPlanLocationType[FloorPlanLocationType["Audio"] = 4] = "Audio";
    })(VirtualFloorPlans.FloorPlanLocationType || (VirtualFloorPlans.FloorPlanLocationType = {}));
    var FloorPlanLocationType = VirtualFloorPlans.FloorPlanLocationType;
    var VirtualFloorPlan = (function () {
        function VirtualFloorPlan(containerSelectorId, floorPlanJson) {
            this.containerSelectorId = containerSelectorId;
            this.floorPlanJson = floorPlanJson;
        }
        return VirtualFloorPlan;
    }());
    VirtualFloorPlans.VirtualFloorPlan = VirtualFloorPlan;
    var Carousel = (function () {
        function Carousel() {
        }
        return Carousel;
    }());
    VirtualFloorPlans.Carousel = Carousel;
    var FloorPlan = (function () {
        function FloorPlan() {
        }
        return FloorPlan;
    }());
    VirtualFloorPlans.FloorPlan = FloorPlan;
    var PictureContainer = (function () {
        function PictureContainer() {
        }
        return PictureContainer;
    }());
    VirtualFloorPlans.PictureContainer = PictureContainer;
})(VirtualFloorPlans || (VirtualFloorPlans = {}));
var VirtualFloorPlans;
(function (VirtualFloorPlans) {
    var VirtualFloorPlanWithControls = (function (_super) {
        __extends(VirtualFloorPlanWithControls, _super);
        function VirtualFloorPlanWithControls() {
            _super.apply(this, arguments);
        }
        VirtualFloorPlanWithControls.prototype.setIconLocation = function (locationUuid, left, top, rotation) {
            var floorPlanLocation = this.findFloorPlanLocation(locationUuid);
            if (floorPlanLocation) {
                floorPlanLocation.left = left;
                floorPlanLocation.top = top;
                floorPlanLocation.rotation = rotation;
                return true;
            }
            return false;
        };
        VirtualFloorPlanWithControls.prototype.findFloorPlanLocation = function (locationUuid) {
            for (var i = 0; i < this.floorPlanJson.data.length; i++) {
                var floorPlanData = this.floorPlanJson.data[i];
                for (var j = 0; j < floorPlanData.location.length; j++) {
                    var floorPlanLocation = floorPlanData.location[j];
                    if (floorPlanLocation.uuid == locationUuid) {
                        return floorPlanLocation;
                    }
                }
            }
            return null;
        };
        VirtualFloorPlanWithControls.prototype.addFloorPlanLocation = function (floorPlanUuid, floorPlanLocation) {
            var uuid = null;
            var floorPlanData = this.findFloorPlan(floorPlanUuid);
            if (floorPlanData) {
                uuid = guid();
                floorPlanLocation.uuid = uuid;
                floorPlanData.location.push(floorPlanLocation);
            }
            return uuid;
        };
        VirtualFloorPlanWithControls.prototype.removeFloorPlanLocation = function (locationUuid) {
            for (var i = 0; i < this.floorPlanJson.data.length; i++) {
                var floorPlanData = this.floorPlanJson.data[i];
                for (var j = 0; j < floorPlanData.location.length; j++) {
                    var floorPlanLocation = floorPlanData.location[j];
                    if (floorPlanLocation.uuid == locationUuid) {
                        floorPlanData.location.splice(j, 1);
                        return true;
                    }
                }
            }
            return true;
        };
        VirtualFloorPlanWithControls.prototype.addFloorPlan = function (floorPlanData) {
            floorPlanData.uuid = guid();
            this.floorPlanJson.data.push(floorPlanData);
            return floorPlanData.uuid;
        };
        VirtualFloorPlanWithControls.prototype.removeFloorPlan = function (floorPlanUuid) {
            var floorPlanData = this.findFloorPlan(floorPlanUuid);
            if (floorPlanData != null) {
                this.floorPlanJson.data.splice(this.floorPlanJson.data.indexOf(floorPlanData), 1);
                return true;
            }
            return false;
        };
        VirtualFloorPlanWithControls.prototype.findFloorPlan = function (floorPlanUuid) {
            for (var i = 0; i < this.floorPlanJson.data.length; i++) {
                if (this.floorPlanJson.data[i].uuid == floorPlanUuid) {
                    return this.floorPlanJson.data[i];
                }
            }
            return null;
        };
        VirtualFloorPlanWithControls.prototype.setMainColor = function (color) {
            this.floorPlanJson.config.mainColor = color;
        };
        VirtualFloorPlanWithControls.prototype.setSecondaryColor = function (color) {
            this.floorPlanJson.config.secondaryColor = color;
        };
        VirtualFloorPlanWithControls.prototype.setLightenColor = function (color) {
            this.floorPlanJson.config.lightenColor = color;
        };
        VirtualFloorPlanWithControls.prototype.setDarkenColor = function (color) {
            this.floorPlanJson.config.darkenColor = color;
        };
        return VirtualFloorPlanWithControls;
    }(VirtualFloorPlans.VirtualFloorPlan));
    VirtualFloorPlans.VirtualFloorPlanWithControls = VirtualFloorPlanWithControls;
})(VirtualFloorPlans || (VirtualFloorPlans = {}));
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}
