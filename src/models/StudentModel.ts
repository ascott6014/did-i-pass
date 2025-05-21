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
        return false; // student already exists
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
    // TODO: Calculate the final exam score needed to get the target score in class
    let neededScore = (targetScore - currentAverage) / (finalExamWeight / 100);
    return neededScore;
}

export {students, addStudent, getStudent, calculateFinalExamScore};