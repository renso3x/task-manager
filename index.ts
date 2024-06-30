import express, {
  Express,
  Request,
  Response,
} from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Task } from './src/tasks/tasks.entity';
import { taskRouter } from './src/tasks/tasks.router';

const app: Express = express();
dotenv.config();

app.use(bodyParser.json());
app.use(cors());

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST || 'localhost',
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  entities: [Task],
  synchronize: true,
});

const PORT = process.env.PORT || 3300;

AppDataSource.initialize()
  .then(() => {
    console.log('Data source initialized!');
    app.listen(PORT, () => {
      console.log('Server is running in port ' + PORT);
    });
  })
  .catch((err) => {
    console.log('Error during data source initialization');
  });

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world');
});

app.use('/tasks', taskRouter);
