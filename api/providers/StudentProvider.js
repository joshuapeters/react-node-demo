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

    getStudent(id){
        return this._model.findOne({_id: id});
    }

    postStudent(studentData){
        return new this._model(studentData).save();
    }

    updateStudent(id, studentData){
        return this._model.findOneAndUpdate({_id: id}, studentData, {new: true});
    }

    deleteStudent(id){
        return this._model.findOneAndRemove({_id: id});
    }
}

