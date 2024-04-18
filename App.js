import express from 'express';
import courseRouter from "./Kanbas/courses/routes.js";
import lab5Router from "./Lab5.js";
import modulesRouter from "./Kanbas/modules/routes.js";
import mongoose from "mongoose";
import cors from 'cors';
import UserRoutes from "./Kanbas/users/routes.js";
import session from 'express-session';
import "dotenv/config";

const app = express()

app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
}));

app.use(express.json());

const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
};

if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.HTTP_SERVER_DOMAIN,
    };
}

app.use(session(sessionOptions));
mongoose.connect(process.env.DATABASE_URL);

app.get('/', (req, res) => {
    res.send('Welcome to Web Development!');
})

UserRoutes(app);
app.use('/api/courses', courseRouter);
app.use('/a5', lab5Router);
app.use(modulesRouter);
app.use(modulesRouter);


app.listen(process.env.PORT || 4000);
