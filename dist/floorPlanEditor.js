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
        function VirtualFloorPlan(containerSelectorId, json) {
            this.containerSelectorId = containerSelectorId;
            this.json = json;
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
        VirtualFloorPlanWithControls.prototype.setIconLocation = function (locationUuid, x, y, rotation) {
        };
        VirtualFloorPlanWithControls.prototype.addIconLocation = function (floorPlanUuid, floorPlanLocation) {
            return "uuid";
        };
        VirtualFloorPlanWithControls.prototype.removeIconLocation = function (iconUUID) {
            return true;
        };
        VirtualFloorPlanWithControls.prototype.addFloorPlan = function (floorPlanData) {
            return "uuid";
        };
        VirtualFloorPlanWithControls.prototype.removeFloorPlan = function (floorPlanUuid) {
            return true;
        };
        VirtualFloorPlanWithControls.prototype.setMainColor = function (color) {
        };
        VirtualFloorPlanWithControls.prototype.setSecondaryColor = function (color) {
        };
        VirtualFloorPlanWithControls.prototype.setLightenColor = function (color) {
        };
        VirtualFloorPlanWithControls.prototype.setDarkenColor = function (color) {
        };
        return VirtualFloorPlanWithControls;
    }(VirtualFloorPlans.VirtualFloorPlan));
    VirtualFloorPlans.VirtualFloorPlanWithControls = VirtualFloorPlanWithControls;
})(VirtualFloorPlans || (VirtualFloorPlans = {}));
