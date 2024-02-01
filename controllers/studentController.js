

const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Student = mongoose.model('Student');

router.get('/', (req, res) => {
    res.render("layouts/student/addOrEdit", {
        viewTitle: "Insert Student"
    });
});

router.post('/', (req, res) => {
    if(req.body._id == '')
        insertRecord(req, res);
    else
        updateRecord(req, res);
});

function insertRecord(req, res) {
    var student = new Student({
        fullName: req.body.fullName,
        email: req.body.email,
        mobile: req.body.mobile,
        city: req.body.city
    });

    student.save()
        .then(() => {
            res.redirect('layouts/student/list');
        })
        .catch(err => {
            if (err.name === 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("layouts/student/addOrEdit", {
                    viewTitle: "Insert Student",
                    student: req.body
                });
            } else {
                console.log('Error during record insertion : ' + err);
                res.status(500).send('Error during record insertion');
            }
        });
}


function updateRecord(req, res) {
    Student.findByIdAndUpdate(req.body._id, req.body, { new: true })
        .then(doc => {
            if (!doc) {
                return res.status(404).send('Student not found');
            }
            res.redirect('layouts/student/list');
        })
        .catch(err => {
            if (err.name === 'ValidationError') {
                handleValidationError(err, req.body);
                return res.render("layouts/student/addOrEdit", {
                    viewTitle: 'Update Student',
                    student: req.body
                });
            } else {
                console.log('Error during record update : ' + err);
                return res.status(500).send('Error during record update');
            }
        });
}

router.get('/list', (req, res) => {
    Student.find()
        .then(docs => {
            res.render("layouts/student/list", {
                list: docs
            });
        })
        .catch(err => {
            console.log('Error in retrieving student list : ' + err);
            res.status(500).send('Error in retrieving student list');
        });
});



router.get('/:id', (req, res) => {
    Student.findById(req.params.id, (err, doc) => {
        if(!err){
            res.render("layouts/student/addOrEdit", {
                viewTitle: "Update Student",
                student: doc
            });
            console.log(doc);
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Student.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err){
            res.redirect('layouts/student/list');
        }
        else{
            console.log('Error in student delete : ' + err);
        }
    });
});

module.exports = router;