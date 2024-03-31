import express from "express";
import Database from "../Database/index.js";
import database from "../Database/index.js";

const modulesRouter = express.Router();

modulesRouter.get("/api/courses/:cid/modules", (req, res) => {
    const { cid } = req.params;
    const modules = Database.modules
        .filter((m) => m.course === cid);
    res.send(modules);
});

modulesRouter.post('/api/courses/:cid/modules', (req, res) => {
    const { cid } = req.params;
    const newModule = {
        ...req.body,
        course: cid,
        _id: new Date().getTime().toString(),
    };
    database.modules.push(newModule);
    res.send(newModule);
})

modulesRouter.delete("/api/modules/:mid", (req, res) => {
    const { mid } = req.params;
    database.modules = database.modules.filter((m) => m._id !== mid);
    res.sendStatus(200);
});

modulesRouter.put("/api/modules/:mid", (req, res) => {
    const { mid } = req.params;
    const moduleIndex = database.modules.findIndex(
        (m) => m._id === mid);
    database.modules[moduleIndex] = {
        ...database.modules[moduleIndex],
        ...req.body
    };
    res.sendStatus(204);
});



export default modulesRouter;