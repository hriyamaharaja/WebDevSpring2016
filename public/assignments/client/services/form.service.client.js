(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FormService", formService);

    function formService() {
        var form, user;


        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,

        };

        return service;

        function createFormForUser(userId, form) {
            return $http.post('', form);
        }

        function findAllFormsForUser(userId) {
            return $http.get('');
        }

        function deleteFormById(formId) {

            $http.delete('');
        }

        function updateFormById(formId, newForm) {

            $http.put('', newForm);
        }

    }
})();