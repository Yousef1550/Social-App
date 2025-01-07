import commentRouter from "../Modules/Comment/comments.controller.js"
import postRouter from "../Modules/Post/post.controller.js"
import userRouter from "../Modules/User/user.controller.js"






const routerHandler = (app) => {
    app.use('/user', userRouter)
    app.use('/post', postRouter)
    app.use('/comment', commentRouter)
}

export default routerHandler