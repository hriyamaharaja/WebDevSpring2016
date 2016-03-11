(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FormService", formService);

    function formService() {
        var form, user;
        var forms =
            [
                {"_id": "000", "recipe": "Contacts", "userId": 123},
                {"_id": "010", "recipe": "ToDo",     "userId": 123},
                {"_id": "020", "recipe": "CDs",      "userId": 234}
            ];

        function createFormForUser(userId, form, callback) {
            form.userId = userId;
            forms.push(form);
            callback(forms);
        }

        function findAllFormsForUser(userId, callback)
        {
            var userForms = [];
            for(user in forms) {
                if(forms[user].userId === userId)
                {
                    userForms.push(forms[user]);
                }
            }
            callback(userForms);
        }

        function deleteFormById(formId, callback)
        {
            for(form in forms) {
                if(forms[form]._id == formId) {
                    forms.splice(form,1);
                    break;
                }
            }
            callback(forms);
        }

        function updateFormById(formId, newForm, callback) {

            for(form in forms) {
                if(forms[form]._id == formId)
                {
                    forms[form] = newForm;
                    break;
                }

            }
            callback(forms);
        }



        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,

        };

        return service;
    }
})();