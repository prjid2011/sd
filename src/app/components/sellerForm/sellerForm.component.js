class SellerFormCtrl {
    constructor(SellerInfoService, $scope) {
        this.name = 'Seller Form';
        this.isEdit = false;
        this.isDealNotSelected = false;
        this.isCurrencyNotSelected = false;
        this.isOfficeNotSelected = false;
        this._service = SellerInfoService;
        this._scope = $scope;
        this.sellerList = this._service.getSellerList();
        this.sId = this.sellerList.length;
        
        console.log(SellerInfoService.list);
        
        this.defaultForm = {
            id: 1,
            name: '',
            currency: [],
            office: [],
            biddeddeal: 'No',
            guarunteeddeal: 'No',
            contactname: '',
            email: ''
        }

        let self = this;

        this.officeList = ['UK', 'JP', 'US', 'AU','FR', 'IT'];
        this.currencyList = ['INR', 'USD', 'EUR', 'GBP','RMB'];

        $scope.$on('editCustomEvent', function(event, data){
            console.log(data);
            
            self.isEdit = true;
            let sellerinfoEdit = [...self.sellerList.filter((item) => item.id == data.eventData.id)];
            self.sellerinfo = angular.copy(sellerinfoEdit[0]);
        });
    }

    addSellerInfo(form) {
   
        if(!this.isEdit) {
            this.sId++;
            this.sellerinfo.id = this.sId;

            if(this.sellerinfo.currency.length <= 0){
                this.isCurrencyNotSelected = true;
                return;
            }
            if (this.sellerinfo.office.length <= 0){
                this.isOfficeNotSelected = true;
                return;
            }
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

            this._service.addSellerInfo(this.sellerinfo);
            this.resetForm(form)

        }else if(this.isEdit){
            this.updateInfo(form)
        }
    }

    cancelForm(form) {
        this.onNewElement({$event: {'rowCancel': true}});
        this.resetForm(form)
    }

    updateInfo(form){
        this._service.updateSellerList(this.sellerinfo);
        this.sellerList = this._service.getSellerList();
        this.onNewElement({$event: {'rowUpdated': true}});
        this.resetForm(form)
    }

    resetForm(form){
        this.sellerinfo = angular.copy(this.defaultForm);
        this.isEdit = false;
        this.isCurrencyNotSelected = false;
        this.isOfficeNotSelected = false;
        this.isDealNotSelected = false;
        form.$setPristine();
        form.$setUntouched();
    }
}

export const SellerFormComponent = {
    selector: 'sellerform',
    template: require('./sellerForm.html'),
    bindings: {
        onNewElement: '&'
    },
    controller: SellerFormCtrl
};