module.exports = (sequelize, _DataTypes) => {
  const PostCategory = sequelize.define('PostsCategories', {}, { 
     timestamps: false });
  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blogsposts',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId' });
  };
  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category,
      {
        as: 'categories',
        through: PostCategory,
        foreignKey: 'postId',
        otherKey: 'categoryId' });
    };
  return PostCategory;
};