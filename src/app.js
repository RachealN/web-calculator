import winston from 'winston';
import express from 'express';
import routes from './routes/index';

const app = express();


app.use(routes);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

export default server;
