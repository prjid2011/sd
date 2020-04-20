import './sellerinfo.scss'
import {SellerFormComponent} from './sellerForm/sellerForm.component';
import {SellerListComponent} from './sellerList/sellerList.component';

class AppCtrl {
    constructor(SellerInfoService, $scope) {
        this.title = 'seller component';
        console.log(this.title);
        this._scope = $scope;
    }

    updateData(dataObj){
        if(dataObj.isEdit){
            this._scope.$broadcast('editCustomEvent', {
                eventData: dataObj
            });
        }else if(dataObj.rowUpdated || dataObj.rowCancel){
            this._scope.$broadcast('updateCustomEvent', {
                eventData: dataObj
            });
        }
    }
}

export const SellerComponent = {
    selector: 'app',
    template: require('./sellerinfo.html'),
    controller: AppCtrl
};

angular.module('sellersview', [])
    .component(SellerFormComponent.selector, SellerFormComponent)
    .component(SellerListComponent.selector, SellerListComponent)
    .component(SellerComponent.selector, SellerComponent)