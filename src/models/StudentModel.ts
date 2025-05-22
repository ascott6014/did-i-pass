const students: StudentManager = {};

function calculateAverage(weights: CourseGrades): number {
    let sum: number = 0;
    let count: number = 0;

    for( let i: number = 0; i < weights.assignmentWeights.length; i++){
        sum += weights.assignmentWeights[i].grade;
        count++;
    }
    
    let avg: number = sum / count;
    return avg;
}

function addStudent(newStudentData: NewStudentRequest): boolean {
    const {name, weights} = newStudentData;

    if(Object.hasOwn(students, name)) {
        return false; 
    }

    const currentAverage: number = calculateAverage(weights);
    const newStudent: Student = {name, weights, currentAverage};

    students[name] = newStudent;
    return true;
}

function getStudent(studentName: string): Student | undefined {
   return (Object.hasOwn(students, studentName)) ? students[studentName] : undefined;
}

function calculateFinalExamScore(currentAverage: number, finalExamWeight: number, targetScore: number): number {
    let neededScore = (targetScore - currentAverage) / (finalExamWeight / 100);
    return neededScore;
}

function getLetterGrade(score: number): string {
    let letter: string;

    if (score < 60){
        letter = "F";
    } else if (score < 70){
        letter = "D";
    } else if (score < 80){
        letter = "C";
    } else if (score < 90){
        letter = "B"
    } else {
        letter = "A"
    }

    return letter;
}

function updateStudentGrade(studentName: string, assignmentName: string, newGrade: number): boolean {
    const student = getStudent(studentName);

    if (student === undefined){
        return false;
    }

    const assignment = student.weights.assignmentWeights.find((item) => item.name === assignmentName); //.grade = newGrade;

    if (assignment === undefined){
        return false;
    }

    assignment.grade = newGrade;    
    student.currentAverage = calculateAverage(student.weights);
    
    return true;
}

export {students, addStudent, getStudent, calculateFinalExamScore, getLetterGrade, updateStudentGrade};