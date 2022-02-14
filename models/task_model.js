module.exports = (sequelize,DataTypes) => {
   const Task = sequelize.define('task',{
       name:{
           type:DataTypes.STRING,
           allowNull:false
       },
       complete:{
           type:DataTypes.BOOLEAN,
           allowNull:false,
           defaultValue:false
       }
   })
   return Task;
}