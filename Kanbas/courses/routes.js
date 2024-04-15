import express from "express";
import { findAllCourses, updateCourse, createCourse, deleteCourse, findCourseById } from "../Database/courses/dao.js";

const courseRouter = express.Router();

courseRouter.get('/', (req, res) => {
    const courses = findAllCourses();
    res.send(courses);
})

courseRouter.get("/:id", (req, res) => {
    const { id } = req.params;
    const course = findCourseById(id);
    if (!course) {
        res.status(404).send("Course not found");
        return;
    }
    res.send(course);
});

courseRouter.post('/', async (req, res) => {
    const course = { ...req.body };

    await createCourse(course);
    res.send(findCourseById(req.body.course_id));
})

courseRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    deleteCourse(id);

    const courses = findAllCourses();
    res.send(courses);
})

courseRouter.patch('/:id', (req, res) => {
    const { id } = req.params;
    const course = { ...req.body };

    updateCourse(id, course);
    const courses = findAllCourses();

    res.send(courses);
})

export default courseRouter;