import express from 'express';
import cors from 'cors';
import { router as postRoutes } from './controllers/post.controller';
import { router as userRoutes } from './controllers/user.controller';
const app = express();

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use('/posts', postRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})