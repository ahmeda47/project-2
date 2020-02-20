module.exports = function(sequelize, DataTypes) {
  var Chat = sequelize.define("Chat", {
    Message: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Chat;
};
