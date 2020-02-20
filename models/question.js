module.exports = function(sequelize, DataTypes) {
    var Question = sequelize.define("Question", {
    
      Title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [5]
        }
      },

      Code: {
      type: DataTypes.TEXT,
      allowNull :false    
      }
    
    });
    return Question;
}
  
  