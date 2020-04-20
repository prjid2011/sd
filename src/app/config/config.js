function Approutes( $stateProvider, $locationProvider, $urlRouterProvider) {
    'ngInject';
  
    $stateProvider.state({
        name: 'app',
        component: 'app',
        url: '/'
    });
  
    $locationProvider.html5Mode(true);
  
    $urlRouterProvider.otherwise('/');
  
}
  
export default Approutes;