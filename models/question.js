module.exports = function(sequelize, DataTypes) {
  var Question = sequelize.define("Question", {

    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  
  });
  return Question;
}
