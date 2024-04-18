import express from "express";
import Database from "../Database/index.js";
import database from "../Database/index.js";
import {getModules, createModule, deleteModule, patchModule} from "../Database/modules/dao.js";
import { Types } from "mongoose";

const modulesRouter = express.Router();

modulesRouter.get("/api/courses/:cid/modules", async (req, res) => {
    const { cid } = req.params;
    const modules = await getModules(cid);
    res.json(modules);
});

modulesRouter.post('/api/courses/:cid/modules', async (req, res) => {
    const { cid } = req.params;
    const newModule = {
        ...req.body,
        course: cid,
    };

   newModule['_id'] = new Types.ObjectId();

   await createModule(newModule);

   res.send(newModule);
})

modulesRouter.delete("/api/modules/:mid", async (req, res) => {
    const { mid } = req.params;
    try {
        await deleteModule(mid);
    } catch (e) {
        console.log(e);
    }
    res.sendStatus(200);
});

modulesRouter.put("/api/modules/:mid", async (req, res) => {
    const { mid } = req.params;
    await patchModule(mid, {...req.body})
    res.sendStatus(204);
});


export default modulesRouter;