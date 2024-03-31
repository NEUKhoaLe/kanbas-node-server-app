import express from "express";
import Database from "../Database/index.js";

const courseRouter = express.Router();

courseRouter.get('/', (req, res) => {
    const courses = Database.courses;
    res.send(courses);
})

courseRouter.get("/:id", (req, res) => {
    const { id } = req.params;
    const course = Database.courses
        .find((c) => c.course_id === id);
    if (!course) {
        res.status(404).send("Course not found");
        return;
    }
    res.send(course);
});

courseRouter.post('/', (req, res) => {
    const course = { ...req.body };
    Database.courses.push(course);
    res.send(course);
})

courseRouter.delete('/:id', (req, res) => {
    const { id } = req.params;

    Database.courses = Database.courses
        .filter((c) => c.course_id !== id);

    res.send(Database.courses);
})

courseRouter.patch('/:id', (req, res) => {
    const { id } = req.params;
    const course = req.body;

    Database.courses = Database.courses.map((c) => {
        return c.course_id === id ? {...c, ...course} : c
    })

    res.send(Database.courses);
})

export default courseRouter;