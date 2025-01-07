import { DataTypes, Model } from "sequelize"
import { sequelizeConfig } from "../connection.js"




class UserModel extends Model {}

UserModel.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: 'idx_email_unique',
        allowNull: false,
        validate: {
            isEmail: true,
            notEmpty: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            checkPasswordLength(value){
                if(value.length <= 6){
                    throw new Error('The password must be longer than 6 characters!')
                }
            }
        }
    },
    role: {
        type: DataTypes.ENUM('user', 'admin'),
        allowNull: false,
    }
}, {
    sequelize: sequelizeConfig,
    modelName: 'tbl_users',
    freezeTableName: true,
    timestamps: true,
    hooks: {
        beforeCreate: (user) => {
            const noSpaces = user.name.replace(/\s+/g, '')  // removing any spaces from the name
            if(noSpaces.length <= 2 ){
                throw new Error('The name must be longer than 2 characters!')
            }
        }
    }
})

export default UserModel

