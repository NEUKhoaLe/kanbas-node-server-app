import express from 'express';
import courseRouter from "./Kanbas/courses/routes.js";
import lab5Router from "./Lab5.js";
import modulesRouter from "./Kanbas/modules/routes.js";
import cors from 'cors';

const app = express()
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Web Development!');
})
app.use('/api/courses', courseRouter);
app.use('/a5', lab5Router);
app.use(modulesRouter);


app.listen(process.env.PORT || 4000);
