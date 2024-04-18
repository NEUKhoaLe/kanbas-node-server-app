import express from "express";
import { findAllCourses, updateCourse, createCourse, deleteCourse, findCourseById } from "../Database/courses/dao.js";

const courseRouter = express.Router();

courseRouter.get('/', async (req, res) => {
    const courses = await findAllCourses();
    res.json(courses);
})

courseRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    const course = await findCourseById(id);
    if (!course) {
        res.status(404).send("Course not found");
        return;
    }
    res.json(course);
});

courseRouter.post('/', async (req, res) => {
    delete req.body["_id"];
    const course = { ...req.body };

    await createCourse(course);
    res.json(await findCourseById(req.body.course_id));
})

courseRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await deleteCourse(id);

    const courses = await findAllCourses();
    res.json(courses);
})

courseRouter.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const course = { ...req.body };

    await updateCourse(id, course);
    const courses = await findAllCourses();

    res.json(courses);
})

export default courseRouter;