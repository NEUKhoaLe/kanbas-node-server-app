import express from 'express';
const helloRouter = express.Router();

helloRouter.get('/hello', (req, res) => {
    res.send('Life is good!');
})

helloRouter.get('/', (req, res) => {
    res.send('Welcome to Full Stack Development!')
})



export default helloRouter;