import model from "./model.js";

export const findAllCourses = () => model.find();

export const findCourseById = (id) => model.findOne({course_id: id});

export const createCourse = (course) => model.create(course);

export const deleteCourse = (id) => model.deleteOne({course_id: id});

export const updateCourse = (id, course) => model.updateOne({course_id: id}, { $set: course })