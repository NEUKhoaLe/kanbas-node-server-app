import model from "./model.js";

export const getModules = (course_id) => model.find({course: course_id})

export const createModule = (module) => model.create(module);

export const deleteModule = (module_id) => model.deleteOne({_id: module_id})

export const patchModule = (module_id, module) => model.updateOne({_id: module_id}, {$set: module})