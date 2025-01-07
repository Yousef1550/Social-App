import {Sequelize} from 'sequelize'


export const sequelizeConfig = new Sequelize('assignment8', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: (message) => console.log('Database Query Executed ⟫⟫⟫⟫⟫⟫⟫⟫⟫⟫', message)
})

export const database_connetion = async () => {
    try {
        // await sequelizeConfig.authenticate()
        await sequelizeConfig.sync({alter: true, force: false})
        console.log('Database connected successfully!');

    } catch (error) {
        console.log('Unable to connect to the database', error);
    }
}