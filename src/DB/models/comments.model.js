import { DataTypes, Model } from "sequelize";
import { sequelizeConfig } from "../connection.js";
import UserModel from "./users.model.js";
import PostModel from "./posts.model.js";





class CommentModel extends Model {}

CommentModel.init({
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize: sequelizeConfig,
    modelName: 'tbl_comments',
    freezeTableName: true,
    timestamps: true
})

export default CommentModel

// post has many comments
PostModel.hasMany(CommentModel, {foreignKey: 'fk_post_id', onDelete: 'CASCADE', onUpdate: 'CASCADE', as: 'commentData'})

// comment belongs to one post
CommentModel.belongsTo(PostModel, {foreignKey: 'fk_post_id', as: 'postData'})



// user has many comments
UserModel.hasMany(CommentModel, {foreignKey: 'fk_user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE', as: 'commentData'})

// comment belongs to one user
CommentModel.belongsTo(UserModel, {foreignKey: 'fk_user_id', as: 'userData'})
