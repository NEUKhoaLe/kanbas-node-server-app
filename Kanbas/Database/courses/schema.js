import mongoose from "mongoose";
const courseSchema = new mongoose.Schema({
    course_id: {type: String, required: true, unique: true},
    filename: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String},
    "sub-body": {type: String},
}, {collection: "courses"});
export default courseSchema;