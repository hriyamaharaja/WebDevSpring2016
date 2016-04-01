/**
 * Created by hriya on 3/15/16.
 */

var q = require("q");

module.exports = function (db, mongoose) {
    var FormSchema = require("./form.schema.server.js")(mongoose);
    var FormModel = mongoose.model('Form', FormSchema);

    var api = {

        createFormForUser: createFormForUser,
        findAllFormsForUser: findAllFormsForUser,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById,
        findFromById: findFromById,
        findFormByTitle: findFormByTitle
    };

    return api;


    function createFormForUser(userId, form) {
        var deferred = q.defer();

        form.userId = userId;
        form.fields = [];
        FormModel.create(form, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findAllFormsForUser(userId) {
        var deferred = q.defer();

        FormModel.find({userId: userId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function deleteFormById(formId) {
        var deferred = q.defer();

        FormModel.remove({_id: formId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function updateFormById(formId, newForm) {
        var deferred = q.defer();

        FormModel.findById({_id: formId}, function (err, updatedForm) {
            if (err) {
                deferred.reject(err);
            }
            else {
                updatedForm.title = newForm.title;
                updatedForm.save(function (err, doc) {
                    deferred.resolve(doc);
                });
            }
        });

        return deferred.promise;
    }

    function findFromById(formId) {
        var deferred = q.defer();

        FormModel.findById({_id: formId}, function (err, doc) {
            if (err)
                deferred.reject(err);
            else
                deferred.resolve(doc);
        });

        return deferred.promise;
    }

    function findFormByTitle(title) {
        var deferred = q.defer();


        FormModel.findOne({title: title}, function (err, doc) {
            if (err)
                deferred.reject(err);
            else
                deferred.resolve(doc);
        });

        return deferred.promise;
    }
};
