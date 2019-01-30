(function (angular) {
    var app = angular.module('Aplikacija');
    app.controller('NavbarCtrl', ['loginService', '$state', '$scope','$http', function(loginService, $state, $scope, $http) {
        var that = this;
        that.loggedIn = false;
        that.admin = false;
        that.category = [];
        that.oneCategory = '';
        

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





        var onLogin = function() {
            that.loggedIn = true;
        }

        var onLogout = function() {
            that.loggedIn = false;
        }

        loginService.addLoginListener($scope, onLogin);
        loginService.addLogoutListener($scope, onLogout);



        that.logout = function() {
            loginService.logout(function(){
                $state.go('home');
            }, function(){});
        }

        loginService.isLoggedIn(function() {
            that.loggedIn = true;
        },
        function() {
            that.loggedIn = false;
        });

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


        that.fetchData();

        

    }]);
})(angular);