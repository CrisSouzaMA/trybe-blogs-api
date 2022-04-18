const Blog = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, {
    tableName: 'BlogPosts',
    timestamps: false,
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, 
      { foreignKey: 'id', as: 'users' });
  };

  return BlogPost;
};

module.exports = Blog;