(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FormService", formService);

    function formService($http) {


        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById

        };

        return service;

        function createFormForUser(userId, form) {
            return $http.post('/api/assignment/user/' + userId + '/form', {params:form});
        }

        function findAllFormsForUser(userId) {
            return $http.get('/api/assignment/user/' + userId + '/form');
        }

        function deleteFormById(formId) {

            $http.delete('/api/assignment/form/' + formId);
        }

        function updateFormById(formId, newForm) {

            $http.put('/api/assignment/form/' + formId, {params:newForm});
        }

    }
})();