(function (angular) {
    var app = angular.module('Aplikacija');
    app.controller('AdminPanelCtrl', ['loginService', '$http',  '$state', 'Upload', '$scope', function (loginService, $http, $state, Upload, $scope) {
        
        var that = this;

        that.users = [];
        that.items = [];
        that.category = [];
        that.changeUser = {};
        that.changeItem = {};
        that.changeCategory = {};
        that.newCategory = {};
        that.newCtg = {};
        that.usersEditBool = false;
        that.itemsEditBool = false;
        that.categoryEditBool = false;
        
        
        that.getUsers = function() {
            $http.get('/adminpanel/users').then(function(response) {
                that.users = response.data;
            }, function(reason) {
                console.log(reason);
            });
        };

        that.getItems = function() {
            $http.get('item').then(function(response) {
                that.items = response.data;
            }, function(reason) {
                console.log(reason);
            });
        }

        that.getCategory = function() {
            $http.get('/categories/').then(function(response) {
                that.category = response.data;
            }, function(reason) {
                console.log(reason);
            });
        }


        that.admChangeUser = function(user) {
            that.changeUser = user;
            $http.put('adminpanel/changeProfile', that.changeUser).then(function(response) {
                if(response.data["status"] == "done") {
                    that.getUsers();
                }
            },
            function(reason){
                console.log(reason);
            })
        };


        that.deleteUser = function(id) {
            $http.delete('adminpanel/deleteUser/' + id).then(function(response) {
                that.getUsers();
            },
            function(reason){
                console.log(reason)
            });
        };

        that.admChangeItem= function(item) {
            that.changeItem = item;
            $http.put('adminpanel/changeItem', that.changeItem).then(function(response) {
                if(response.data["status"] == "done") {
                    that.getItems();
                }
            },
            function(reason){
                console.log(reason);
            })
        };

        that.deleteItem = function(id) {
            $http.delete('adminpanel/deleteItem/' + id).then(function(response) {
                that.getItems();
            },
            function(reason){
                console.log(reason)
            });
        };

        that.admChangeCategory= function(category) {
            that.changeCategory = category;
            $http.put('adminpanel/changeCategory', that.changeCategory).then(function(response) {
                if(response.data["status"] == "done") {
                    that.getCategory();
                }
            },
            function(reason){
                console.log(reason);
            })
        };

        that.deleteCategory = function(id) {
            $http.delete('adminpanel/deleteCategory/' + id).then(function(response) {
                that.getCategory();
            },
            function(reason){
                console.log(reason)
            });
        };

        that.addNewCategory = function(addNew){
            that.newCategory = addNew;
            $http.post('/adminpanel/addCategory', that.newCategory).then(function(response) {
                if(response.data["status"] == "done"){
                    that.newCtg = null;
                    that.getCategory();
                }
            },
            function(reason){
                console.log(reason);
            });
        }


        that.usersView = function() {
            that.usersEditBool = false;
        };
        
        that.usersEdit = function() {
            that.usersEditBool = true;
        };

        that.itemsView = function() {
            that.itemsEditBool = false;
        };
        
        that.itemsEdit = function() {
            that.itemsEditBool = true;
        };

        that.categoryView = function() {
            that.categoryEditBool = false;
        };
        
        that.categoryEdit = function() {
            that.categoryEditBool = true;
        };

        that.getUsers();
        that.getItems();
        that.getCategory();


    }]);
})(angular);