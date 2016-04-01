(function(){
    angular
        .module("RecipeWorld")
        .controller("ProfileController",ProfileController);

    function ProfileController($rootScope,$scope, $location, UserService) {
        "use strict";

        $scope.user = $rootScope.user;

        $scope.username = $scope.user.username;
        $scope.firstName = $scope.user.firstName;
        $scope.lastName = $scope.user.lastName;
        $scope.password = $scope.user.password;
        $scope.email = $scope.user.email;

        $scope.update = function(){

            var user = {};
            user._id = this.user._id;
            user.username = this.username;
            user.firstName = this.firstName;
            user.lastName = this.lastName;
            user.password = this.password;
            user.roles = this.user.roles;

            UserService.updateUser(user._id,user).then(function(response){
                console.log(response.data);
            });

            $location.path("/profile");
        };



    }

})();
