module VirtualFloorPlans {


  export class VirtualFloorPlanWithControls extends VirtualFloorPlan{

    public setIconLocation(locationUuid:string, left:number, top:number,rotation:number ):boolean{
        var floorPlanLocation: IFloorPlanLocation = this.findFloorPlanLocation(locationUuid);
        if (floorPlanLocation){
          floorPlanLocation.left = left;
          floorPlanLocation.top = top;
          floorPlanLocation.rotation = rotation;
          return true;
        }
      return false;
    }

    public findFloorPlanLocation(locationUuid:string): IFloorPlanLocation {
      for (var i = 0 ; i < this.floorPlanJson.data.length ; i++){
        var floorPlanData : IFloorPlanData = this.floorPlanJson.data[i];
        for (var j = 0 ; j < floorPlanData.location.length ; j++){
          var floorPlanLocation : IFloorPlanLocation = floorPlanData.location[j];
          if (floorPlanLocation.uuid == locationUuid){
            return floorPlanLocation;
          }
        }
      }
      return null;
    }

    public addFloorPlanLocation(floorPlanUuid:string, floorPlanLocation:IFloorPlanLocation):string{
      var uuid = null;
      var floorPlanData : IFloorPlanData=this.findFloorPlan(floorPlanUuid)
      if (floorPlanData){
        uuid = guid();
        floorPlanLocation.uuid=uuid;
        floorPlanData.location.push(floorPlanLocation);
      }
      return uuid;
    }

    public removeFloorPlanLocation(locationUuid:string):boolean{
      for (var i = 0 ; i < this.floorPlanJson.data.length ; i++){
        var floorPlanData : IFloorPlanData = this.floorPlanJson.data[i];
        for (var j = 0 ; j < floorPlanData.location.length ; j++){
          var floorPlanLocation : IFloorPlanLocation = floorPlanData.location[j];
          if (floorPlanLocation.uuid == locationUuid){
            floorPlanData.location.splice(j,1);
            return true;
          }
        }
      }
      return true;
    }

    public addFloorPlan(floorPlanData:IFloorPlanData):string{
      floorPlanData.uuid=guid();
      this.floorPlanJson.data.push(floorPlanData);
      return floorPlanData.uuid;
    }

    public removeFloorPlan(floorPlanUuid:string):boolean{
      var floorPlanData : IFloorPlanData =this.findFloorPlan(floorPlanUuid);
      if (floorPlanData!=null){
        this.floorPlanJson.data.splice(this.floorPlanJson.data.indexOf(floorPlanData),1);
        return true;
      }
      return false;
    }

    public findFloorPlan(floorPlanUuid:string):IFloorPlanData{
      for (var i = 0 ; i< this.floorPlanJson.data.length ; i++){
        if (this.floorPlanJson.data[i].uuid == floorPlanUuid){
            return this.floorPlanJson.data[i];
        }
      }
      return null;
    }





    public setMainColor(color: string):void{
      this.floorPlanJson.config.mainColor = color;
    }

    public setSecondaryColor(color: string):void{
      this.floorPlanJson.config.secondaryColor = color;
    }

    public setLightenColor(color: string):void{
      this.floorPlanJson.config.lightenColor = color;
    }

    public setDarkenColor(color: string):void{
      this.floorPlanJson.config.darkenColor = color;
    }



  }

}
