import './config';
import express, { Express } from 'express';
import { getAllStudents, createNewStudent, getStudentByName, getFinalExamScores } from "./controllers/StudentController";

const PORT = process.env.PORT;
const app: Express = express();
app.use(express.json());

app.post('/students', createNewStudent);
app.get('/students/:studentName', getStudentByName);
app.get('/students', getAllStudents);
app.get('/students/:studentName/finalExam', getFinalExamScores);

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
})