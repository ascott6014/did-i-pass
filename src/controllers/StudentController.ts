import {Request, Response} from 'express';
import {students, addStudent, getStudent, calculateFinalExamScore} from '../models/StudentModel';

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

function getFinalExamScores(req: Request, res: Response): void{
    const {studentName} = req.params as StudentNameParams;
    const student = getStudent(studentName);

    if(student === undefined){
        res.status(404);
        return;
    }
    const currentAverage = students[studentName].currentAverage;
    const finalweight = students[studentName].weights.finalExamWeight;
    let neededGrades: FinalExamScores; //= 
    //     {
    //         neededForA: calculateFinalExamScore(currentAverage, finalweight, 90),
    //         neededForB: calculateFinalExamScore(currentAverage, finalweight, 80),
    //         neededForC: calculateFinalExamScore(currentAverage, finalweight, 70),
    //         neededForD: calculateFinalExamScore(currentAverage, finalweight, 60)
    //     };
    let target: number = 100;
    Object.keys(neededGrades).map(item =>{
        target -= 10;
        return calculateFinalExamScore(currentAverage, finalweight, target);
    });

    res.json(neededGrades);

}

export {getAllStudents, createNewStudent, getStudentByName, getFinalExamScores}