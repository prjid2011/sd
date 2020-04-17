import angular from 'angular';

import 'angular-ui-router';

import './components/seller.component';

import './services/service';

import Approutes from './config/config';

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, ['ui.router', 'sellersview', 'sellerservices'])

.config(Approutes);

export default MODULE_NAME;