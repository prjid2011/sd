import './sellerinfo.scss'

class AppCtrl {
    constructor(SellerInfoService) {
        this.sId = 1;
        this.isEdit = false;
        this.isDealNotSelected = false;
        console.log(SellerInfoService.list);
        /*this._service = SellerInfoService;
        this._service.getSellerList().then((t) => {
            console.log(t);
        });*/

        this.sellerList = [{
            id: 1,
            name: 'test1',
            currency: 'INR',
            office: 'LND',
            biddeddeal: 'No',
            guarunteeddeal: 'Yes',
            contactname: 'bobby',
            email: 'test@test.com'	
        }]
        
        console.log(SellerInfoService.list);
        
        this.defaultForm = {
            id: 1,
            name: '',
            currency: '',
            office: '',
            biddeddeal: 'No',
            guarunteeddeal: 'No',
            contactname: '',
            email: ''
        }
    }

    addSellerInfo(form) {
   
        if(!this.isEdit) {
            this.sId++;
            this.sellerinfo.id = this.sId;

            if((!this.sellerinfo.biddeddeal || this.sellerinfo.biddeddeal == 'No') && (!this.sellerinfo.guarunteeddeal || this.sellerinfo.guarunteeddeal == 'No')){
                this.isDealNotSelected = true;
                return;
            }

            if(!this.sellerinfo.hasOwnProperty('biddeddeal')){
                this.sellerinfo.biddeddeal = 'No';
            }

            if(!this.sellerinfo.hasOwnProperty('guarunteeddeal')){
                this.sellerinfo.guarunteeddeal = 'No';
            }

            this.sellerList.push(this.sellerinfo);
            this.resetForm(form)
            //console.log(this.sellerinfo);

            //this.sellerinfo.sellername.$pristine = true;

        }else if(this.isEdit){
            this.updateInfo(form)
        }
    }

    cancelForm(form) {
        this.resetForm(form)
    }

    deleteInfo(id) {

        this.sellerList = this.sellerList.filter((item) => item.id != id);
        this.sId--;
    }

    editInfo(id) {
        this.isEdit = true;
        let sellerinfoEdit = [...this.sellerList.filter((item) => item.id == id)];
        this.sellerinfo = angular.copy(sellerinfoEdit[0]);
        this.sId--;
    }

    updateInfo(form){
        this.sellerList = this.sellerList.filter((item) => item.id != this.sellerinfo.id);
        this.sellerList.push(this.sellerinfo);
        this.resetForm(form)
    }

    resetForm(form){
        this.sellerinfo = angular.copy(this.defaultForm);
        this.isEdit = false;
        form.$setPristine();
        form.$setUntouched();
    }
}

export const SellerComponent = {
    selector: 'app',
    template: require('./sellerinfo.html'),
    bindings: {
        sellerinfo: '='
    },
    controller: AppCtrl
};

angular.module('sellersview', [])
    .component(SellerComponent.selector, SellerComponent)