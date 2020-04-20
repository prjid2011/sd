class SellerListCtrl {
    constructor(SellerInfoService,$scope) {
        
        this.name = 'Seller List';
        this.sId = 1;
        this.isEdit = false;
        this.isDealNotSelected = false;
        this._service = SellerInfoService;
        this.sellerList = this._service.getSellerList();
        
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

        $scope.$on('updateCustomEvent', function(event, data){ 
            
            self.isEdit = false;
            if(data.eventData.rowUpdated){
                self.sellerList = self._service.getSellerList();
            }
        });
    }

    deleteInfo(id) {
        this._service.deleteSellerInfo(id);
        this.sId--;
    }

    editInfo(id) {
        this.isEdit = true;
        this.onNewElement({$event: {'id':id, 'isEdit': true}});
    }
}

export const SellerListComponent = {
    selector: 'sellerlist',
    template: require('./sellerList.html'),
    bindings: {
        onNewElement: '&'
    },
    controller: SellerListCtrl
};