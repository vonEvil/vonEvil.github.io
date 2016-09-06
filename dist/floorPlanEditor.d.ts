declare module VirtualFloorPlans {
    interface IFloorPlanConfig {
        mainColor?: string;
        lightenColor?: string;
        darkenColor?: string;
        secondaryColor?: string;
    }
    enum Direction {
        Up = 0,
        Down = 1,
        Left = 2,
        Right = 3,
    }
    enum FloorPlanLocationType {
        Camera360 = 0,
        Camera = 1,
        Video = 2,
        HTML = 3,
        Audio = 4,
    }
    interface IFloorPlanLocation {
        left: number;
        top: number;
        rotation: number;
        uuid?: string;
        type: FloorPlanLocationType;
        url: string;
    }
    interface IFloorPlanData {
        number: number;
        uuid?: string;
        url: string;
        location: IFloorPlanLocation[];
    }
    interface IFloorPlanJson {
        config?: IFloorPlanConfig;
        data?: IFloorPlanData[];
    }
    class VirtualFloorPlan {
        containerSelectorId: string;
        json: IFloorPlanJson;
        constructor(containerSelectorId: string, json: IFloorPlanJson);
    }
    class Carousel {
        constructor();
    }
    class FloorPlan {
        constructor();
    }
    class PictureContainer {
        constructor();
    }
}
declare module VirtualFloorPlans {
    class VirtualFloorPlanWithControls extends VirtualFloorPlan {
        setIconLocation(locationUuid: number, x: number, y: number, rotation: number): void;
        addIconLocation(floorPlanUuid: string, floorPlanLocation: IFloorPlanLocation): string;
        removeIconLocation(iconUUID: number): boolean;
        addFloorPlan(floorPlanData: IFloorPlanData): string;
        removeFloorPlan(floorPlanUuid: number): boolean;
        setMainColor(color: string): void;
        setSecondaryColor(color: string): void;
        setLightenColor(color: string): void;
        setDarkenColor(color: string): void;
    }
}
