export default class SellerInfoService {

    /* @ngInject */
    constructor($log, $q) {
        this.list = "Hello Services";
        this.sellerList = [{
                id: 1,
                name: 'Toyota',
                currency: ['INR','USD'],
                office: ['FR','IT'],
                biddeddeal: 'No',
                guarunteeddeal: 'Yes',
                contactname: 'Bobby',
                email: 'bobby@test.com'	
            },
            {
                id: 2,
                name: 'Benz',
                currency: ['INR','USD'],
                office: ['UK', 'JP'],
                biddeddeal: 'No',
                guarunteeddeal: 'Yes',
                contactname: 'Ajeet',
                email: 'ajeet@test.com'	
            }
        ]
    }

    getSellerList() {
        return this.sellerList       
    }

    updateSellerList(sellerInfoData) {
        this.sellerList = this.sellerList.filter((item) => item.id != sellerInfoData.id);
        this.sellerList.push(sellerInfoData);       
    }

    addSellerInfo(sellerInfo) {
        this.sellerList.push(sellerInfo);       
    }

    deleteSellerInfo(id) {
        let itemIndex = this.sellerList.findIndex(item => item.id == id);
        this.sellerList.splice(itemIndex, 1);
    }
}