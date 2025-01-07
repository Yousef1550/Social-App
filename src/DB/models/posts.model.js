import { DataTypes, Model } from "sequelize";
import { sequelizeConfig } from "../connection.js";
import UserModel from "./users.model.js";






class PostModel extends Model {}

PostModel.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize: sequelizeConfig,
    modelName: 'tbl_posts',
    freezeTableName: true,
    timestamps: true,
    paranoid: true
})


export default PostModel

//  user has many posts
UserModel.hasMany(PostModel, {foreignKey: 'fk_user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE', as: 'postData'})

// post belongs to one user
PostModel.belongsTo(UserModel, {foreignKey: 'fk_user_id', as: 'userData'})
