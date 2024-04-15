import express from "express";
import Database from "../Database/index.js";
import database from "../Database/index.js";
import {getModules, createModule, deleteModule, patchModule} from "../Database/modules/dao.js";

const modulesRouter = express.Router();

modulesRouter.get("/api/courses/:cid/modules", (req, res) => {
    const { cid } = req.params;
    const modules = getModules(cid);
    res.send(modules);
});

modulesRouter.post('/api/courses/:cid/modules', async (req, res) => {
    const { cid } = req.params;
    const newModule = {
        ...req.body,
        course: cid,
        _id: new Date().getTime().toString(),
    };

    await createModule(newModule);

    res.send(newModule);
})

modulesRouter.delete("/api/modules/:mid", (req, res) => {
    const { mid } = req.params;
    deleteModule(mid);
    res.sendStatus(200);
});

modulesRouter.put("/api/modules/:mid", (req, res) => {
    const { mid } = req.params;
    patchModule(mid, {...req.body})
    res.sendStatus(204);
});



export default modulesRouter;