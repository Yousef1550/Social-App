import CommentModel from "../../../DB/models/comments.model.js";
import PostModel from "../../../DB/models/posts.model.js"
import UserModel from "../../../DB/models/users.model.js";
import { Sequelize } from "sequelize";





export const createPostService = async (req, res) => {
    try {
        const {title, content, fk_user_id} = req.body

        const data = await PostModel.create({title, content, fk_user_id})
        console.log(data);
        if(data){
            return res.status(201).json({message: 'Post created successfully', data})
        } 

    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Something went wrong', error})
    }
}


export const deletePost = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const {fk_user_id} = req.body

        const post = await PostModel.findByPk(id)
        if(!post){
            return res.status(404).json({message: `Post with id ${id} not found`, post})
        }
        console.log('>>>>>>>>>>>>>>>', post.fk_user_id);

        if(post.fk_user_id === fk_user_id){
            const data = await PostModel.destroy({where: {id}})
            return res.status(200).json({message: `Post with id ${id} deleted successfully`, data})
        }
        return res.status(404).json({message: 'You are not authorized to delete this post'})

    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Something went wrong', error})
    }
}



export const restorePost = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const data = await PostModel.restore({where: {id}})
        if(data){
            return res.status(200).json({message: `Post with id ${id} restored successfully`, data})
        }
        return res.status(404).json({message: `Post with id ${id} not found`, data})

    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Something went wrong', error})
    }
}


export const postDetailsService = async (req, res) => {
    try {
        const data = await PostModel.findAll({
            attributes: ['id', 'title'],
            include: [
                {
                    model: UserModel,
                    as: 'userData',
                    attributes: ['id', 'name']
                },
                {
                    model: CommentModel,
                    as: 'commentData',
                    attributes: ['id', 'content']
                }
            ]
        })
        if(data){
            return res.status(200).json({message: 'All posts details', data})
        }
        return res.status(404).json({message: 'No posts found', data}) 

    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Something went wrong', error})
    }
}



export const commentCountService = async (req, res) => {
    try {
        const data = await PostModel.findAll({
            attributes: ['id', 'title'],
            include: [
                {
                    model: CommentModel,
                    as: 'commentData',
                }
            ]
        })
        if(data){
            const result = data.map(post => ({          // post carries each element (object) in data[] and set a value to each property in each object
                id: post.id,
                title: post.title,
                commentCount: post.commentData.length 
            }))
            return res.status(200).json({message: 'Posts found', result})
        }
        return res.status(404).json({message: 'No posts found', data})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Something went wrong', error})
    }
}


