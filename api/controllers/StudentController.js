import { StudentProvider } from '../providers/StudentProvider'
import {FilterFactory} from "../providers/FilterFactory";
import * as paginate from 'express-paginate';


const studentProvider = new StudentProvider();

exports.getAllStudents = async function(req, res){
    try{
        // need local provider for use within promise
        const sp = new StudentProvider();
        const filters = getFilters(req.query);
        const sortBy = req.query.sortBy;

        const [results, itemCount] = await Promise.all([
            sp.getAllStudentsByPage(req.query.limit, req.query.page, filters, sortBy),
            sp.getStudentCount()
        ]);

        const pageCount = req.query.limit <= 0 ? 1 : Math.ceil(itemCount / req.query.limit);

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

function getFilters(body) {
    let filterableProperties = [
        "first_name",
        "last_name",
        "email",
        "age",
        "grade"
    ];
    return new FilterFactory(filterableProperties).buildFilterFromURLObject(body);
}



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