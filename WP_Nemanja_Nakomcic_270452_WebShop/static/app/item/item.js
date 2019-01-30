(function (angular) {
    var app = angular.module('Aplikacija');
    app.controller('ItemCtrl', ['$http', '$state', '$stateParams','loginService', function($http, $state, $stateParams, loginService) {
        var that = this;
        that.items = [];
        that.itemss = [];
        that.user = {};
        that.loggedInUser = undefined;
        that.quantityBuy = 0;
        that.changeUser = {};
        that.changuser = {};
        that.getuser = [];

        that.getItems = function(id) {
            $http.get('/item/'+id).then(function(response) {
                that.items = response.data;
            }, function(reason) {
                console.log(reason);
            });
        }

        that.getItems($stateParams['id']);

        that.fetchData = function () {
            loginService.isLoggedIn(function () {
                loginService.getLoggedIn(function (user) {
                    that.user = user;
                },function (errorReason) {
                    console.log(errorReason);
                });
            })
        }

        that.fetchData();

        that.getItemss = function() {
            $http.get('/item').then(function(response) {
                that.itemss = response.data;
            }, function(reason) {
                console.log(reason);
            });
        }
        that.getUsers = function() {
            $http.get('/users').then(function(response) {
                that.getuser = response.data;
            }, function(reason) {
                console.log(reason);
            });
        }

        that.changUser = function() {
            $http.put("/users/"+this.user.id, that.changUser).then(function(response){
                that.getUsers();
                changUser = {};
            },
            function(reason){
                console.log(reason)
            });
        }

        that.buy = function(item){
            if (this.user == undefined) {
                alert("You need to be logged in.");
                $state.go('login');
            }
            else if (this.items.quantity < 1) {
                alert("Not available");
            }
            else if(that.quantityBuy > this.quantity){
                alert("Sorry,we dont have enough items for you.")
            }
            else if (that.quantityBuy < 1) {
                alert("Invalid quantity input.");
            }
            else if (this.items.price*that.quantityBuy <= that.user.moneyy) {
                alert("Sucessful shopping,you will be notified on your email about delivery.");
                that.changeItem = this.items;
                that.changeItem["quantity"] = that.changeItem["quantity"] - that.quantityBuy;
                $http.put("/item/"+that.changeItem.id, that.changeItem).then(function(response){
                    that.getItems();
                    that.changeItem = {};
                },
                function(reason){
                    console.log(reason)
                });
                that.changeUser = that.user;
                that.changeUser["moneyy"] -= this.items.price*that.quantityBuy;
                that.changUser();
            }
            else{
                alert("You dont have enough money for buy.");
            }
            that.quantityBuy = 0;
        }

        
    }]);
})(angular);