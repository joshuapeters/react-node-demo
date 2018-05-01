import { StudentProvider } from '../providers/StudentProvider'

const studentProvider = new StudentProvider();

exports.getAllStudents = function(req, res){
    try{
        studentProvider.getAllStudents().then(function(studentArray){
            res.json(studentArray);
        }).catch((ex) =>{
            res.send(ex);
        });
    }
    catch (err){
        res.send(err);
    }

};

exports.createStudent = function(req, res){
    try{
        studentProvider.postStudent(req.body).then(function(postedStudent){
            res.json(postedStudent);
        }).catch((ex) =>{
            res.send(ex);
        });
    }catch (err){
        res.send(err)
    }
};

exports.getStudentById = function(req, res){
    try{
        studentProvider.getStudent(req.params.id).then(function (students){
            res.json(students);
        }).catch((ex) =>{
            res.send(ex);
        });
    }
    catch (err){
        res.send(err);
    }
};

exports.updateStudent = function(req, res){
    try{
        studentProvider.updateStudent(req.params.id, req.body).then(function(student){
            res.json(student);
        }).catch((ex) =>{
            res.send(ex);
        });
    }
    catch (err){
        res.send(err);
    }
};

exports.deleteStudent = function(req, res){
    try{
        studentProvider.deleteStudent(req.params.id).then(function(){
            res.json({message: 'Student successfully deleted'});
        }).catch((ex) =>{
            res.send(ex);
        });
    }
    catch (err){
        res.send(err);
    }
};

exports.deleteStudentsById = function(req, res){
    try{
        studentProvider.deleteStudentsById(req.body).then(function(student){
            res.json(student);
        }).catch((ex) =>{
            res.send(ex);
        });
    }
    catch (err){
        res.send(err);
    }
};