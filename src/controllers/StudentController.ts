import {Request, Response} from 'express';
import {students, addStudent, getStudent} from '../models/StudentModel';

function getAllStudents(req: Request, res: Response): void {
    res.json(students);
}

function createNewStudent(req: Request, res: Response): void {
    const studentData = req.body as NewStudentRequest;

    const didAddStudent = addStudent(studentData);
    
    if(!didAddStudent){
        res.status(409);
        return
    }
    res.send(201);
}

function getStudentByName(req: Request, res: Response): void{
    const {studentName} = req.params as StudentNameParams;
    const student = getStudent(studentName);

    if (student === undefined){
        res.status(404);
        return;
    }
    res.json(student);
}

export {getAllStudents, createNewStudent, getStudentByName}