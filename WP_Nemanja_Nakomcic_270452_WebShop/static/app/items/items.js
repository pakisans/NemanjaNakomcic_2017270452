(function (angular) {
    var app = angular.module('Aplikacija');
    app.controller('ItemsCtrl', ['$http', '$state', '$stateParams','$scope', 'loginService', function($http, $state, $stateParams, $scope, loginService) {
        var that = this;
        that.items = [];
        that.item = [];
        that.user = [];
        that.admin = false;
        that.loggedIn = false;
        that.itemm = [];
        this.searchParams = {
            name: "",
            priceFrom: undefined,
            priceTo: undefined
        }
        that.category = [];
        that.oneCategory = '';
        that.search = "";
        

        that.getCategories = function() {
            $http.get("/categories/").then(function(response) {
                that.category = response.data;
            }, function(reason) {
                console.log(reason);
            });
        }

        this.getCategories();

        that.getCategory = function(category_name) {
            $http.get("/categories/"+category_name).then(function(response){
                that.oneCategory = category_name;
            },
            function(reason){
                console.log(reason)
            });
        };

        that.getItems = function() {
            $http.get('/item').then(function(response) {
                that.items = response.data;
            }, function(reason) {
                console.log(reason);
            });
        }

        that.getItems();

        that.fetchData = function () {
            loginService.isLoggedIn(function () {
                loginService.getLoggedIn(function (user) {
                    that.user = user;
                    if(that.user.role == "admin")
                    {
                        that.admin = true;
                    }
                },
                function (errorReason) {
                    console.log(errorReason);
                })
            },
            function () {
                $state.go('home');
            });
        }


        this.fetchData();


        

        $scope.sortColumn = "name";

        


        
    }]);
})(angular);
    
