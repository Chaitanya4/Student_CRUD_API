module.exports = (app) => {
    const students = require('./student.controller.js');

    // Create a new Student
    app.post('/students', students.create);

    // Retrieve all Students
    app.get('/students', students.findAll);

    // Retrieve a single Student with studentId
    app.get('/students/:studentId', students.findOne);

    // Update a student with studentId
    app.put('/students/:studentId', students.update);

    // Delete a student with studentId
    app.delete('/students/:studentId', students.delete);
}
