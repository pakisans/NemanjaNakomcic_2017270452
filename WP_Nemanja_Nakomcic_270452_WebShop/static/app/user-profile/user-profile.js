(function (angular) {
    var app = angular.module('Aplikacija');
    app.controller('UserProfileCtrl', ['loginService', '$state', 'Upload', '$scope','$http', function (loginService, $state, Upload, $scope, $http) {
        var that = this;
        that.user = {};
        that.editUser = {};
        that.success = false;

        that.fetchData = function () {
            loginService.isLoggedIn(function () {
                loginService.getLoggedIn(function (user) {
                    that.user = user;
                    that.editUser = angular.copy(that.user);
                },
                function (errorReason) {
                    console.log(errorReason);
                })
            },
            function () {
                $state.go('login');
            });
        }

         that.changeProfile = function() {
            $http.put('/users/'+this.user.id, that.editUser).then(function(response){
                if(response.data["status"] == "done") {
                    that.fetchData();
                    console.log("Profile changed successful");
                    that.success = true;

                }
            },
            function(reason){
                console.log(reason);
            })
        };
        

        that.fetchData();
    }]);
})(angular);