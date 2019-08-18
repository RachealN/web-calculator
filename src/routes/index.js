import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import operation from '../controllers/calculator.controller';
import error from '../middlewares/error.middleware';
import notfound from '../middlewares/404.middleware';


dotenv.config();

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cors());

const apiVersion = process.env.API_VERSION;

const baseUrl = 'http://api.mathjs.org/v4/';

router.get('/', (req, res) => res.status(200).json({ status: 200, data: 'Welcome to Easy to Use Calculator.' }));
router.post('/operations', operation.performOperaration);
router.get('/operations', operation.getAllRecords);
router.delete('/operations/:id', operation.deleteRecord);

router.use(notfound);
router.use(error);

export default router;
