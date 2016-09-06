module VirtualFloorPlans {

  export interface IFloorPlanConfig{
    mainColor?: string;
    lightenColor?: string;
    darkenColor?: string;
    secondaryColor?: string;
  }

  export enum Direction {
      Up,
      Down,
      Left,
      Right
  }

  export enum FloorPlanLocationType {
      Camera360,
      Camera,
      Video,
      HTML,
      Audio
  }

  export interface IFloorPlanLocation{
    left: number;
    top: number;
    rotation: number;
    uuid?: string;
    type: FloorPlanLocationType;
    url: string;
  }

  export interface IFloorPlanData{
    number : number;
    uuid?: string;
    url: string;
    location: IFloorPlanLocation[];
  }

  export interface IFloorPlanJson{
    config?:IFloorPlanConfig;
    data?:IFloorPlanData[];
  }

  export class VirtualFloorPlan{

    constructor(public containerSelectorId: string, public json: IFloorPlanJson){

    }

  }

  export class Carousel{

    constructor(){

    }

  }

  export class FloorPlan{

    constructor(){

    }

  }

  export class PictureContainer{

    constructor(){

    }

  }




}
