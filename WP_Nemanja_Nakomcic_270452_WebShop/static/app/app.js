(function (angular) {
    var app = angular.module('Aplikacija', ['ui.router', 'ngFileUpload', 'loginService']);
    
    app.config(['$stateProvider', '$urlRouterProvider','$locationProvider','$qProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $qProvider) {
        $urlRouterProvider.otherwise('/');
        // $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('');
        $qProvider.errorOnUnhandledRejections(false);
        $stateProvider.state('app', {
            abstract: true,
            views: {
                navbar: {
                    templateUrl: 'app/navbar/navbar.tpl.html',
                    controller: 'NavbarCtrl',
                    controllerAs: 'nb'
                },
                '': {
                    template: '<ui-view name=""></ui-view>'
                }
            }
        })

        $stateProvider.state('home', {
            url: '/',
            parent: 'app', 
            views: {       
                '': {
                    templateUrl: 'app/items/items.tpl.html',
                    controller: 'ItemsCtrl',
                    controllerAs: 'its'
                }
            }
        }).state('item', {
            parent: 'app',
            url: '/item/{id:int}',
            views: {
                '': {
                    templateUrl: 'app/item/item.tpl.html',
                    controller: 'ItemCtrl',
                    controllerAs: 'it'
                }
            }
        }).state('addProduct', {
            parent: 'app',
            url: '/addProduct',
            views: {
                '': {
                    templateUrl: 'app/addProduct/addProduct.tpl.html',
                    controller: 'AddProductCtrl',
                    controllerAs: 'adp'
                }
            }
        }).state('login', {
            parent: 'app',
            url: '/login',
            views: {
                '': {
                    templateUrl: 'app/login/login.tpl.html',
                    controller: 'LoginCtrl',
                    controllerAs: 'lc'
                }
            }
        }).state('registration', {
            parent: 'app',
            url: '/registration',
            views: {
                '': {
                    templateUrl: 'app/registration/registration.tpl.html',
                    controller: 'RegistrationCtrl',
                    controllerAs: 'rc'
                }
            }
        }).state('adminpanel', {
            parent: 'app',
            url: '/adminpanel',
            views: {
                '': {
                    templateUrl: 'app/adminpanel/adminpanel.tpl.html',
                    controller: 'AdminPanelCtrl',
                    controllerAs: 'ap'
                }
            }
        }).state('userProfile', {
            parent: 'app',
            url: '/userProfile',
            views: {
                '': {
                    templateUrl: 'app/user-profile/user-profile.tpl.html',
                    controller: 'UserProfileCtrl',
                    controllerAs: 'up'
                }
            }
        });
    }]);
})(angular);