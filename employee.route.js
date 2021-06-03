module.exports = (app) => {
    const employees = require('./employee.controller.js');

    // Create a new Employee
    app.post('/employees', employees.create);

    // Retrieve all Employees
    app.get('/employees', employees.findAll);

    // Retrieve a single Employee with employeeId
    app.get('/employees/:employeeId', employees.findOne);

    // Update a Employee with employeeId
    app.put('/employees/:employeeId', employees.update);

    // Delete a Employee with employeeId
    app.delete('/employees/:employeeId', employees.delete);
}
