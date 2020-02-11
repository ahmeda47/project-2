module.exports = function(sequelize, DataTypes) {
    var Question = sequelize.define("Question", {
     annotation_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
      Title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [5]
        }
      },
      userName: {
            type: DataTypes.STRING,
            references: {
                model: 'User',
                key: 'id'
            }
      },
      email:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[1]
        }
    },
      userName: {
          type:DataTypes.STRING,
          allowNull:false,
          validate:{
          len:[6]
          }
      },
      Password:{
          type:DataTypes.STRING,
          allowNull:false,
          validate:{
              len:[8]
          }
      },
      });
    return Question;
}
  
  