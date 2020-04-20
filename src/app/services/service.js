import angular from 'angular';
import SellerInfoService from './sellerInfo.service';

angular.module('sellerservices', [])
    .service(SellerInfoService.name, SellerInfoService);
