import express from 'express';
import { getAllPosts, getPostById, addPost, deletePost, updatePost } from '../shared/post.db-queries';
import { verifyToken } from '../shared/auth';

const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
    const posts = await getAllPosts();
    return res.json(posts);
})

router.post('/', async (req: express.Request, res: express.Response) => {
    const id = req.body.id;
    const post = await getPostById(id);
    return res.json(post);
})

router.post('/add', verifyToken, async (req: express.Request, res: express.Response) => {
    const post = req.body.post;
    const newPost = await addPost(post);
    return res.send(newPost);
})

router.delete('/delete', verifyToken, async (req: express.Request, res: express.Response) => {
    const id = req.body.id;
    const deletedPost = await deletePost(id);
    return res.send(deletedPost);
})

router.put('/update', verifyToken, async (req: express.Request, res: express.Response) => {
    const post = req.body.post;
    const updatedPost = await updatePost(post);
    return res.send(updatedPost);
})

export { router };