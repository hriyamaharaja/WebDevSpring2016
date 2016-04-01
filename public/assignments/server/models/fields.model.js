/**
 * Created by hriya on 4/1/16.
 */
"use strict";

var forms = require("./form.mock.json");

var q = require("q");

module.exports = function (db,mongoose) {

    var FormSchema = require("./form.schema.server.js")(mongoose);
    var FormModel = mongoose.model('Field', FormSchema);

    var api =
    {
        getFieldsForForm: getFieldsForForm,
        createFieldForForm: createFieldForForm,
        deleteFieldFromForm: deleteFieldFromForm,
        updateField: updateField,
        updateFieldAsPerType: updateFieldAsPerType,
        getFormName: getFormName,
        findFieldById:findFieldById
    };

    return api;

    function findFieldById(fieldId, formId) {
        var deferred = q.defer();

        FormModel.findById({_id : formId},function(err,form)
        {
            if(err)
            {
                deferred.reject(err);
            }
            else
            {
                for(var i=0;i<form.fields.length;i++)
                {
                    if(fieldId == form.fields[i]._id)
                    {
                        deferred.resolve(form.fields[i]);
                        break;
                    }
                }

            }
        });

        return deferred.promise;
    }

    function getFieldsForForm(formId) {
        var deferred = q.defer();

        FormModel.findById({_id: formId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function createFieldForForm(formId, newField) {
        var deferred = q.defer();

        FormModel.findById({_id: formId}, function (err, form) {
            if (err) {
                deferred.reject(err);
            }
            else {
                var fieldsList = form.fields;
                var createdField = createFieldAsPerType(newField);
                fieldsList.push(createdField);
                form.fields = fieldsList;

                form.save(function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    }
                    else {
                        deferred.resolve(doc);
                    }
                });
            }
        });

        return deferred.promise;
    }


    function createFieldAsPerType(newField) {
        var createdField = "";
        if (newField.type == "TEXT" || newField.type == "TEXTAREA") {
            createdField =
            {

                "label": newField.label, "type": newField.type, "placeholder": newField.placeholder
            };

        }
        else if (newField.type == "DATE") {
            createdField =
            {

                "label": newField.label, "type": newField.type
            };
        }
        else if (newField.type == "OPTIONS" || newField.type == "CHECKBOXES" || newField.type == "RADIOS") {
            createdField =
            {

                "label": newField.label, "type": newField.type, "options": newField.options
            };
        }

        return createdField;
    }


    function deleteFieldFromForm(formId, fieldId) {
        var deferred = q.defer();

        FormModel.findById({_id: formId}, function (err, form) {
            if (err) {
                deferred.reject(err);
            }
            else {
                for (var i = 0; i < form.fields.length; i++) {
                    if (fieldId == form.fields[i]._id) {
                        form.fields.splice(i, 1);
                        break;
                    }
                }

                form.save(function (err, doc) {
                    if (err)
                        deferred.reject(err);
                    else {
                        console.log(doc);
                        deferred.resolve(doc);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function updateField(formId, fieldId, upField) {
        var deferred = q.defer();

        FormModel.findById({_id: formId}, function (err, form) {
            if (err) {
                deferred.reject(err);
            }
            else {
                for (var i = 0; i < form.fields.length; i++) {
                    if (fieldId == form.fields[i]._id) {
                        updateFieldAsPerType(form.fields[i], upField);
                        break;
                    }
                }

                console.log(form);

                form.save(function (err, doc) {
                    if (err) {
                        console.log(err);
                        deferred.reject(err);
                    }
                    else {
                        deferred.resolve(doc);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function updateFieldAsPerType(field, upField) {
        if (upField.type == "TEXT" || upField.type == "TEXTAREA") {
            field.label = upField.label;
            field.placeholder = upField.placeholder;
        }
        else if (upField.type == "DATE") {
            field.label = upField.label;
        }
        else {
            var optionsList = [];

            var options = upField.options;
            var optionsParts = options.split("\n");

            for (var i = 0; i < optionsParts.length; i++) {
                var opObject = new Object();

                var parts = optionsParts[i].split(":");

                opObject.label = parts[0];
                opObject.value = parts[1];
                optionsList.push(opObject);
            }


            field.label = upField.label;
            field.options = optionsList;
        }
    }

    function getFormName(formId) {
        var form = "";
        for (var i = 0; i < forms.length; i++) {
            if (formId == forms[i]._id) {
                form = forms[i];
            }
        }

        return form;
    }
};