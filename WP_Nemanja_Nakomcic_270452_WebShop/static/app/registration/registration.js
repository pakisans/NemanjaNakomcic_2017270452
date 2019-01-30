(function (angular) {
    var app = angular.module('Aplikacija');
    app.controller('RegistrationCtrl', ['$http', '$state', '$stateParams', 'loginService', function($http, $state, $stateParams, loginService) {
        var that = this;

        that.passwordMismatch = false;
        that.registrationSuccess = false;
        that.newUser = {
            "name" : "",
            "lastname" : "",
            "username" : "",
            "email" : "",
            "password" : "",
            "passwordRepeat" : ""
        }

        that.addUser = function() {
            that.passwordMismatch = false;
            if(that.newUser.password == that.newUser.passwordRepeat){
            $http.post('registration', that.newUser).then(function(response){
                if(response.data["status"] == "done"){
                that.registrationSuccess = true;
                }
            },
            function(reason){
                console.log(reason);
            });
            }
            else{
                that.passwordMismatch = true;
            }
        }

   }]);
})(angular);