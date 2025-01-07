import { Router } from "express";
import { commentCountService, createPostService, deletePost, postDetailsService, restorePost } from "./services/post.service.js";

const postRouter = Router()

postRouter.post('/createPost', createPostService)
postRouter.delete('/deletePost/:id', deletePost)
postRouter.patch('/restorePost/:id', restorePost)
postRouter.get('/postDetails', postDetailsService)
postRouter.get('/commentCount', commentCountService)



export default postRouter