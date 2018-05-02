import { StudentProvider } from '../providers/StudentProvider'
import * as paginate from 'express-paginate';

const studentProvider = new StudentProvider();

exports.getAllStudents = function(req, res){
    if (req.query.limit && req.query.page){
        this.getAllStudentsPaged(req, res);
        return;
    }

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

exports.getAllStudentsPaged = function(req, res){
    try{
        const [results, itemCount] = Promise.all([
            studentProvider.getAllStudentsByPage(req.query.limit, req.query.page),
            studentProvider.getStudentCount()
        ]);

        const pageCount = Math.ceil(itemCount / req.query.limit);

        res.json({
            page: req.query.page,
            count: results.length,
            has_more: paginate.hasNextPages(req)(pageCount),
            data: results
        });
    }
    catch (err){
        next(err);
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
            let success = true;
            if (students === null)
                success = false;
            res.json({success, students});
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