//var poc = angular.module(MODULE_NAME, []);
class AppCtrl {
    constructor() {
        this.sellerList = [{
            name: 'test1',
            currency: 'INR',
            office: 'GBP',
            biddeddeal: 'No',
            garunteeddeal: 'Yes'	
        }]
    }

    addSellerInfo() {
      console.log(this.currency);
      console.log("$ctrl.sellerinfo");
      let tempData = {
          name: this.sellername,
          currency: this.currency,
          office: this.office,
          biddeddeal: this.bided,
          garunteeddeal: this.guaranteed	
      }
      this.sellerList.push(tempData);
    }
}

export const SellerComponent = {

    selector: 'app',
    template: require('./sellerinfo.html'),
    bindings: {
        brand: '<'
    },
    controller: AppCtrl
};