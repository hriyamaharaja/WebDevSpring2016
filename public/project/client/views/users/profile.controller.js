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

        $scope.email = $scope.user.email;

        $scope.update = function(){

            var user = {};
            //user._id = this.user._id;
            user.username = this.username;
            user.firstName = this.firstName;
            user.lastName = this.lastName;

            if($scope.password != null)
            {
                user.password = $scope.password;
            }

            //user.password = this.password;
            user.emails = this.email;
            //user.roles = this.user.roles;

            UserService.updateUser($scope.user._id,user).then(function(response){

            });

            $location.path("/profile");
        };

    }

})();