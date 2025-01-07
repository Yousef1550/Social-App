import { Op, where } from "sequelize"
import CommentModel from "../../../DB/models/comments.model.js"
import UserModel from "../../../DB/models/users.model.js"
import PostModel from "../../../DB/models/posts.model.js"





export const createComment = async (req, res) => {
    try {
        const {content, fk_post_id, fk_user_id} = req.body
        const data = await CommentModel.create({content, fk_post_id, fk_user_id})
        if(data){
            return res.status(201).json({message: 'Comment created successfully', data})
        } 

    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Something went wrong', error})
    }
}


export const updateCommentService = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const {fk_user_id, content} = req.body
    
        const comment = await CommentModel.findByPk(id)
        if(!comment){
            return res.status(404).json({message: `Comment with id ${id} not found`, comment})
        }
    
        if(comment.fk_user_id === fk_user_id){
            const data = await CommentModel.update({content}, {where: {id}})
            return res.status(200).json({message: `Comment with id ${id} updated successfully`, data})
        }
        return res.status(400).json({message: 'You are not authorized to update this comment'}) 

    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Something went wrong', error})
    }
}


export const findOrCreate = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const {fk_post_id, fk_user_id, content} = req.body
    
        const comment = await CommentModel.findByPk(id)
        if(comment){
            return res.status(200).json({message: `Comment with id ${id} found`, comment, created: false})
        }
        const newComment = await CommentModel.create({fk_post_id, fk_user_id, content})
        return res.status(200).json({message: `Comment with id ${id} created`, newComment, created: true})

    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Something went wrong', error})
    }
}


export const searchService = async (req, res) => {
    try {
        const {word} = req.query

        if (!word || word.trim() === '') {
            return res.status(400).json({ message: 'Search word is required' });
        }
        const result = await CommentModel.findAndCountAll({where: {
            content: {
                [Op.like]: `%${word}%`
            }
        }})
        if(result.count === 0){
            return res.status(404).json({message: 'No comments found matching your search', result})
        }
        return res.status(200).json({message: 'Comments found', result})

    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Something went wrong', error})
    }
}



export const newestCommentService = async (req, res) => {
    try {
        const data = await CommentModel.findAll({
            attributes: ['id', 'content', 'createdAt'],
            order: [['createdAt', 'DESC']],
            limit: 3
        })
        if(data){
            return res.status(200).json({message: 'Comments found', data})
        }
        return res.status(404).json({message: 'No comments found', data})

    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Something went wrong', error})
    }
}


export const commentDetailsService = async (req, res) => {
    try {
        const id = Number(req.params.id)
        
        const data = await CommentModel.findByPk(id, {
            attributes: ['id', 'content'],
            include: [
                {
                    model: UserModel,
                    as: 'userData',
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: PostModel,
                    as: 'postData',
                    attributes: ['id', 'title', 'content']
                }
            ]
        })
        if(data){
            return res.status(200).json({message: 'Comment found', data})
        }
        return res.status(404).json({message: 'No comments found', data})

    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Something went wrong', error})
    }
}
