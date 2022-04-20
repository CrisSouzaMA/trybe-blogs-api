module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.INTEGER,
    image: DataTypes.STRING,
  }, {
    timestamps: false,
  });

  User.associate = (models) => {
    User.hasMany(models.BlogPost,
      { foreignKey: 'userId', as: 'blogposts' });
  };

  return User;
};