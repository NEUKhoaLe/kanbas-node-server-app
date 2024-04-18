import * as dao from "../Database/Users/dao.js";
import {findUserByUsername} from "../Database/Users/dao.js";
export default function UserRoutes(app) {
    const createUser = async (req, res) => {
        let user = await dao.findUserByUsername(req.body.username);
        if (user) {
            return res.status(400).json(
                { message: "Username already taken" });
        }

        delete req.body['_id']
        user = { ...await dao.createUser({...req.body }) };

        res.json(await dao.findUserByUsername(req.body.username))
    };
    const deleteUser = async (req, res) => {
        if (req.session['currentUser']._id !== req.params.userId) {
            const status = await dao.deleteUser(req.params.userId);
            res.json(status);
        }

        res.json(200);
    };

    const findAllUsers = async (req, res) => {
        const users = await dao.findAllUsers();
        res.json(users);
    };

    const findUserById = async (req, res) => {
        const { userId } = req.params;
        const user = await dao.findUserById(userId);

        res.json(user);
    };
    const updateUser = async (req, res) => {
        const { userId } = req.params;
        const status = await dao.updateUser(userId, req.body);
        req.session["currentUser"] = await dao.findUserById(userId);
        res.json(status);
    };
    const signup = async (req, res) => {
        const user = await dao.findUserByUsername(req.body.username);
        if (user) {
            res.status(400).json(
                { message: "Username already taken" });
        }
        const currentUser = await dao.createUser(req.body);
        req.session["currentUser"] = currentUser;
        req.session.save(err => {
            if (err) {
                // handle error
                res.sendStatus(500);
            } else {
                res.json(currentUser);
            }
        });
    };

    const signin = async (req, res) => {
        const { username, password } = req.body;
        const currentUser = await dao.findUserByCredentials(username, password);

        if (currentUser) {
            req.session["currentUser"] = currentUser;
            req.session.save(err => {
                if (err) {
                    res.sendStatus(500);
                } else {
                    res.json(currentUser);
                }
            });
        } else {
            res.sendStatus(401);
        }
    };
    const signout = (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };

    const profile = async (req, res) => {
        const currentUser = req.session["currentUser"];

        if (!currentUser) {
            res.sendStatus(401);
        } else {
            res.json(currentUser);
        }
    };
    app.post("/api/users", createUser);
    app.get("/api/users", findAllUsers);
    app.get("/api/users/:userId", findUserById);
    app.put("/api/users/:userId", updateUser);
    app.delete("/api/users/:userId", deleteUser);
    app.post("/api/users/signup", signup);
    app.post("/api/users/signin", signin);
    app.post("/api/users/signout", signout);
    app.post("/api/users/profile", profile);
}
