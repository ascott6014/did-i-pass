import './config';
import express, { Express } from 'express';
import { getAllStudents, createNewStudent, getStudentByName } from "./controllers/StudentController";

const PORT = process.env.PORT;
const app: Express = express();
app.use(express.json());

app.post('/students', createNewStudent);
app.get('/students/:studentName', getStudentByName);
app.get('/students', getAllStudents);

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
})