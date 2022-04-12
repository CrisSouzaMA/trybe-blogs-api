const Blog = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, {
    tableName: 'blogpost',
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, 
      { foreignKey: 'id', as: 'users' });
  };

  return BlogPost;
};

module.exports = Blog;