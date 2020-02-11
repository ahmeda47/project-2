module.exports = function(sequelize, DataTypes) {
    var Chat = sequelize.define("Chat", {
     annotation_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
      Message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userName: {
            type: DataTypes.STRING,
            references: {
                model: 'User',
                key: 'id'
            }
        }
        });  
    return Chat;
}
  
  