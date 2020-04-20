import angular from 'angular';
import 'angular-ui-router';
import 'bootstrap';
import "bootstrap/scss/bootstrap.scss";
import 'font-awesome/scss/font-awesome.scss';
import '../style/app.scss';
import './components/seller.component';
import './directives/multiSelectDropDown';
import './services/service';

import Approutes from './config/config';

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, ['ui.router', 'sellersview', 'multiselect-dropdown' ,'sellerservices'])

.config(Approutes);

export default MODULE_NAME;