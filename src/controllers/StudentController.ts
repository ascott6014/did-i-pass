import {Request, Response} from 'express';
import {students, addStudent, getStudent, calculateFinalExamScore, getLetterGrade, updateStudentGrade} from '../models/StudentModel';

function getAllStudents(req: Request, res: Response): void {
    res.json(students);
}

function createNewStudent(req: Request, res: Response): void {
    const studentData = req.body as NewStudentRequest;

    const didAddStudent = addStudent(studentData);
    
    if(!didAddStudent){
        res.sendStatus(409);
        return
    }
    res.sendStatus(201);
}

function getStudentByName(req: Request, res: Response): void{
    const {studentName} = req.params as StudentNameParams;
    const student = getStudent(studentName);

    if (student === undefined){
        res.sendStatus(404);
        return;
    }
    res.json(student);
}

function getFinalExamScores(req: Request, res: Response): void{
    const {studentName} = req.params as StudentNameParams;
    const student = getStudent(studentName);

    if(student === undefined){
        res.sendStatus(404);
        return;
    }
    const currentAverage = student.currentAverage;
    const finalweight = student.weights.finalExamWeight;
    let neededGrades: FinalExamScores = 
        {
            neededForA: calculateFinalExamScore(currentAverage, finalweight, 90),
            neededForB: calculateFinalExamScore(currentAverage, finalweight, 80),
            neededForC: calculateFinalExamScore(currentAverage, finalweight, 70),
            neededForD: calculateFinalExamScore(currentAverage, finalweight, 60)
        };

    res.json(neededGrades);

}

function calcFinalScore(req: Request, res: Response): void {
    const {studentName} = req.params as StudentNameParams;
    const student = getStudent(studentName);

    if (student === undefined){
        res.sendStatus(404);
        return;
    }

    const {grade} = req.body as AssignmentGrade;
    const currentAverage = student.currentAverage;
    const weight = student.weights.finalExamWeight;
    const overallScore = (grade * (weight / 100) + currentAverage);
    const letterGrade = getLetterGrade(overallScore);
    const finalGrade: FinalGrade = {overallScore: overallScore, letterGrade: letterGrade};
    
    res.json(finalGrade);
}

function updateGrade(req: Request, res: Response){
    const {studentName, assignmentName} = req.params as GradeUpdateParams;
    const {grade} = req.body as AssignmentGrade;

    if (!updateStudentGrade(studentName, assignmentName, grade)){
        res.sendStatus(404);
        console.log("no")
        return
    }

    res.json(students[studentName])

    res.sendStatus(200);
}

export {getAllStudents, createNewStudent, getStudentByName, getFinalExamScores, calcFinalScore, updateGrade}