import { Error, where } from "sequelize"
import UserModel from "../../../DB/models/users.model.js"






export const signupService = async (req, res) => {
    try {
        const {name, email, password, role} = req.body

        const data = await UserModel.findOrCreate({
            where: {email},
            defaults: {name, email, password, role}
        })
        if(!data[1]){
            return res.status(409).json({message: 'Email already exists', data})
        }
        return res.status(201).json({message: 'User added successfully', data})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Something went wrong', error})
    }
}

export const updateUserService = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const {name, email, password, role} = req.body
    
        const data = await UserModel.findByPk(id)       // search for user by id
        console.log(data)
        if(!data){                                                                      // if user id not found create new user
            await UserModel.create({name, email, password, role}, {validate: false})
            return res.status(201).json({message: 'User created successfully'})
        }
        await UserModel.update({name, email, password, role}, {where: {id}, validate: false})   // if found update the existing user
        return res.status(200).json({message: 'User updated successfully'}) 

    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Something went wrong', error})
    }
}


export const findUserService = async (req, res) => {
    try {
        const {email} = req.query

        const data = await UserModel.findOne({where: {email}})
        console.log(data);
        if(data){
            return res.status(200).json({message: `User email '${email}' found successfully`, data})
        }
        return res.status(200).json({message: `User with email '${email}' not found`, user: data})

    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Something went wrong', error})
    }
}


export const excludeService = async (req, res) => {
    try {
        const id = Number(req.params.id)

        const data = await UserModel.findByPk(id, {attributes: {exclude:['role']}})
        if(data){
            return res.status(200).json({message: `User with id ${id} found successfully`, user: data})
        }
        return res.status(404).json({message: `User with id ${id} not found`, user: data}) 

    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Something went wrong', error})
    }
}
