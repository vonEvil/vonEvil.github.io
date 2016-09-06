module VirtualFloorPlans {


  export class VirtualFloorPlanWithControls extends VirtualFloorPlan{



    public setIconLocation(locationUuid:number, x:number, y:number,rotation:number ):void{

    }

    public addIconLocation(floorPlanUuid:string, floorPlanLocation:IFloorPlanLocation):string{
      return "uuid"
    }

    public removeIconLocation(iconUUID:number):boolean{
      return true;
    }

    public addFloorPlan(floorPlanData:IFloorPlanData):string{
      return "uuid"
    }

    public removeFloorPlan(floorPlanUuid:number):boolean{
      return true;
    }



    public setMainColor(color: string):void{

    }

    public setSecondaryColor(color: string):void{

    }

    public setLightenColor(color: string):void{

    }

    public setDarkenColor(color: string):void{

    }



  }

}
