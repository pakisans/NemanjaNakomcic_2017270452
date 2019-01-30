(function (angular) {
    var app = angular.module('Aplikacija');
    app.controller('AddProductCtrl', ['loginService', '$http',  '$state', 'Upload', '$scope', function (loginService, $http, $state, Upload, $scope) {
        
        var that = this;
        that.newProduct = {};
        that.success = false;
        that.category = [];
        that.items = [];
        that.newItem = {
            "name":"",
            "category_name":"",
            "description":"",
            "image":"",
            "price":1,
            "quantity":1,
            "user_id":1,
            "categories_id": "",
            "category_name":""

        }
        that.getItems = function() {
            $http.get('/item').then(function(response) {
                that.items = response.data;
            }, function(reason) {
                console.log(reason);
            });
        }

        that.getCategories = function() {
            $http.get("/categories").then(function(response) {
                that.category = response.data;
            }, function(reason) {
                console.log(reason);
            });
        }

        that.getCategories();

        

        that.fetchData = function () {
            loginService.isLoggedIn(function () {
                loginService.getLoggedIn(function (user) {
                    that.userId = user.id;
                },
                function (errorReason) {
                    console.log(errorReason);
                })
            },
            function () {
                $state.go('login');
            });
        }


        that.addNewProduct = function(){
            that.newItem["categories_id"] = that.newItem["category_name"]["id"];
            $http.post("/item/", that.newItem).then(function(response){
                if(response.data["status"] == "done") {
                    that.getItems();
                    $state.go('home');

                }
            
            },
            function(reason){
                console.log(reason);
            });
        }

        that.fetchData()

    }]);
})(angular);