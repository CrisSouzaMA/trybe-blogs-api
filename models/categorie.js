const Categorie = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Categorie', {
    name: DataTypes.STRING,
  }, {
    tableName: 'categories',
    timestamps: false,
  });

  /* User.associate = (models) => {
    User.hasMany(models.BlogPost,
      { foreignKey: 'user_id', as: 'blogposts' });
  }; */

  return Categories;
};

module.exports = Categorie;