/**
 * Created by hriya on 3/15/16.
 */
module.exports = function (app, model) {
    "use strict";
    app.get('/api/assignment/user/:userId/form', getAllForms);
    app.get('/api/assignment/form/:formId', getFormById);
    app.delete('/api/assignment/form/:formId', deleteForm);
    app.post('/api/assignment/user/:userId/form', createForm);
    app.get('/api/assignment/form/:title', getFormByTitle);
    app.put('/api/assignment/form/:formId', updateForm);


    function getAllForms(req, res) {
        var userId = req.params.userId;
        model.findAllFormsForUser(userId).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function getFormById(req, res) {
        var formId = req.params.formId;
        model.getFormById(formId).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function deleteForm(req, res) {
        var formId = req.params.formId;
        model.deleteFormById(formId).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function createForm(req, res) {

        var form = req.body;
        form.fields = [];
        var userId = req.params.userId;
        formModel.createFormForUser(userId, form).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function updateForm(req, res) {
        var newForm = req.body;
        var formId = req.params.formId;
        formModel.updateFormById(formId, newForm).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function getFormByTitle(req, res) {
        var title = req.params.title;
        model.findFormByTitle(title).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

}
