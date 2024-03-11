import express from 'express';
import AppController from '../controllers/AppController';

function router(app) {
    const router = express.Router();
    app.use('/', router);


    router.get('/status', (req, res) => {
      AppController.getStatus(req. res)});

    router.get('/stats', (req, res) => {
      AppController.getStatus(req. res)});
    }

export default router;
