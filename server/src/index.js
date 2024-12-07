import express from 'express';
import cors from 'cors';
import { connectToDatabase } from '../ConfigDatabase/databasemongoose.js';
import StudentRoutes from '../Routes/studentRoutes.js';

const app = express();
const port = 3000;
const host = 'localhost';


connectToDatabase();


app.use(express.json());
app.use(cors());


app.use(express.static('./Client/Table'));
app.use(express.static('./Client/About'));
app.use(express.static('./Client/images'));
app.use(express.static('./Client/Documentacao'));


app.use('/students', StudentRoutes);


app.listen(port, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
