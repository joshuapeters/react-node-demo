var mongoose = require('mongoose');
mongoose.Promise = Promise;

export class StudentProvider{

    constructor(model) {
        if (!model)
            this._model = mongoose.model('Student');
        else
            this._model = model;
    }

    getAllStudents(){
        return this._model.find({});
    }

    getAllStudentsByPage(limit, page){
        return this._model.find({})
            .skip(limit * page)
            .lean()
            .exec();
    }

    getStudentCount(){
        return this._model.count({});
    }

    getStudent(id){
        if (typeof id === 'undefined')
            throw new Error("ArgumentError: id cannot be undefined!");
        return this._model.findOne({_id: id});
    }

    postStudent(studentData){
        if (typeof studentData === 'undefined')
            throw new Error("ArgumentError: student data is undefined!");
        return new this._model(studentData).save();
    }

    updateStudent(id, studentData){
        if (typeof id === 'undefined' || typeof studentData === 'undefined')
            throw new Error("ArgumentError: id and/or student data is undefined!");
        return this._model.findOneAndUpdate({_id: id}, studentData, {new: true});
    }

    deleteStudent(id){
        if (typeof id === 'undefined')
            throw new Error("ArgumentError: id cannot be undefined!");
        return this._model.findOneAndRemove({_id: id});
    }

    deleteStudentsById(ids){
        if (typeof ids === 'undefined')
            throw new Error("ArgumentError: ids cannot be undefined!");
        return this._model.deleteMany({ _id: { $in: ids } });
    }
}

