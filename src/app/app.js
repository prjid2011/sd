import angular from 'angular';
import {SellerComponent} from './components/seller.component';

const MODULE_NAME = 'app';

var poc = angular.module(MODULE_NAME, []);
  
poc.component(SellerComponent.selector,SellerComponent)

export default MODULE_NAME;