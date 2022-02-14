module.exports = (sequelize,DataTypes) => {
    const TaskList = sequelize.define('tasklist',{
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        completed:{
            type:DataTypes.INTEGER,
            defaultValue:0
        }
    })
    return TaskList
}