'use strict';
module.exports = function(app){
    var students = require('../controllers/StudentController');

    app.route('/api/students')
        .get(students.getAllStudents)
        .post(students.createStudent)
        .delete(students.deleteStudentsById);

    app.route('/api/students/:id')
        .get(students.getStudentById)
        .put(students.updateStudent)
        .delete(students.deleteStudent);
};