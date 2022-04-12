module.exports = (sequelize, _DataTypes) => {
  const PostCategories = sequelize.define('PostCategorie', {}, { timestamps: false });
  PostCategories.associate = (models) => {
    models.BlogPost.belongsToMany(models.Categorie,
      {
        as: 'categories',
        through: PostCategories,
        foreignKey: 'categoryId', 
        otherKey: 'postId' });
    };
  PostCategories.associate = (models) => {
    models.Categorie.belongsToMany(models.BlogPost, {
      as: 'blogsposts',
      through: PostCategories,
      foreignKey: 'postId',
      otherKey: 'categoryId' });
  };
  return PostCategories;
};