const Categorie = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Categorie', {
    name: DataTypes.STRING,
  }, {
    tableName: 'Categories',
    timestamps: false,
  });

  return Categories;
};

module.exports = Categorie;