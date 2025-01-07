import { Router } from "express";
import { commentDetailsService, createComment, findOrCreate, newestCommentService, searchService, updateCommentService } from "./Services/comment.service.js";

const commentRouter = Router()

commentRouter.post('/addComment', createComment)
commentRouter.patch('/updateComment/:id', updateCommentService)
commentRouter.get('/findOrcreate/:id', findOrCreate)
commentRouter.get('/search', searchService)
commentRouter.get('/newest', newestCommentService)
commentRouter.get('/details/:id', commentDetailsService)


export default commentRouter