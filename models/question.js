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

  Question.associate = function(models) {
    Question.hasMany(models.Answer, {
      onDelete: "cascade"
    });
  };
  return Question;
};
