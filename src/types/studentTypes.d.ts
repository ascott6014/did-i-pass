type CourseGrade = {
    name: string;
    weight: number;
    grade: number; 
};

type CourseGrades = {
    assignmentWeights: Array<CourseGrade>;
    finalExamWeight: number;
};

type Student = {
    name: string;
    weights: CourseGrades;
    currentAverage: number;
};

type NewStudentRequest = {
    name: string;
    weights: CourseGrades;
};

type AssignmentGrade = {
    grade: number;
};

type FinalGrade = {
    overallScore: number;
    letterGrade: string;
}

type FinalExamScores = {
    neededForA: number;
    neededForB: number;
    neededForC: number;
    neededForD: number;
}

type StudentManager = Record<string, Student>;

type StudentNameParams = {
    studentName: string;
}

type GradeUpdateParams = {
    studentName: string;
    assignmentName: string;
}