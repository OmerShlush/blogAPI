import { PostInterface } from "../interfaces/post.interface";
import { Post } from "../entity/post.entity"; 
import { AppDataSource } from "./data-source";

const getAllPosts = async () => {
    const posts = await AppDataSource.getRepository(Post).find();
    return posts;
}

const getPostById = async (id: number) => {
    const post = await AppDataSource.getRepository(Post).findOneBy({id: id});
    return post;
}

const addPost = async (post: Post) => {
    const newPost = AppDataSource.getRepository(Post).create({...post});
    return newPost;
}

const deletePost = async (id: number) => {
    const deletedPost = AppDataSource.getRepository(Post).delete(id);
    return deletedPost;
}

const updatePost = async (updatedPost: PostInterface) => {
    const post = await AppDataSource.getRepository(Post).findOneBy({id: updatedPost.id});
    AppDataSource.getRepository(Post).merge(post, updatedPost);
    const updateResults = await AppDataSource.getRepository(Post).save(post);
    return updateResults;
}

export { getAllPosts, getPostById, addPost, deletePost, updatePost };

