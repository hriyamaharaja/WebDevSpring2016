/**
 * Created by hriya on 3/15/16.
 */
var forms = require("./form.mock.json");

module.exports = function () {

    var service = {
        createFormForUser: createFormForUser,
        findAllFormsForUser: findAllFormsForUser,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById

    };

    return service;

    function createFormForUser(userId, form) {
        form.userId = userId;
        forms.push(form);
        return forms;
    }

    function findAllFormsForUser(userId) {
        var userForms = [];
        for (var user in forms) {
            if (forms[user].userId === userId) {
                userForms.push(forms[user]);
            }
        }
        return userForms;
    }

    function deleteFormById(formId) {
        for (var form in forms) {
            if (forms[form]._id == formId) {
                forms.splice(form, 1);
                break;
            }
        }
        return forms;
    }

    function updateFormById(formId, newForm) {

        for (var form in forms) {
            if (forms[form]._id == formId) {
                forms[form] = newForm;
                break;
            }

        }
        return forms;
    }


}


