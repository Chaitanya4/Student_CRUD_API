const Student = require('./student.model.js');

//Create new Student
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        return res.status(400).send({
            message: "Student content can not be empty"
        });
    }

    // Create a Student
    const student = new Student({
        rollNo: req.body.rollNo || "No such rollNo", 
        name: req.body.name,
        contact: req.body.contact,
        email: req.body.email,
        password:req.body.password,
        classs:req.body.classs
    });

    // Save Student in the database
    student.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the student details."
        });
    });
};

// Retrieve all students from the database.
exports.findAll = (req, res) => {
    Student.find()
    .then(students => {
        res.send(students);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving students."
        });
    });
};

// Find a single student with a studentId
exports.findOne = (req, res) => {
   Student.findById(req.params.studentId)
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "Student not found with id " + req.params.studentId
            });            
        }
        res.send(student);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Student not found with id " + req.params.studentId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving student with id " + req.params.studentId
        });
    });
};

// Update a student
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Student content can not be empty"
        });
    }

    // Find and update student with the request body
    Student.findByIdAndUpdate(req.params.studentId, {
        rollNo: req.body.rollNo || "No such rollNo", 
        name: req.body.name,
        contact: req.body.contact,
        email: req.body.email,
        password:req.body.password,
        classs:req.body.classs
    }, {new: true})
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "Student not found with id " + req.params.studentId
            });
        }
        res.send(student);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Student not found with id " + req.params.studentId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating student with id " + req.params.studentId
        });
    });
};

// Delete a student with the specified studentId in the request
exports.delete = (req, res) => {
    Student.findByIdAndRemove(req.params.studentId)
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "Student not found with id " + req.params.studentId
            });
        }
        res.send({message: "Student deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Student not found with id " + req.params.studentId
            });                
        }
        return res.status(500).send({
            message: "Could not delete student with id " + req.params.studentId
        });
    });
};