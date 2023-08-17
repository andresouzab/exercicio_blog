const db = require("../sequelize");//connfigurações
const sequelize = require("sequelize");//framework
const Usuarios = require('./Usuarios');

const Posts = db.define("Posts", {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: sequelize.STRING,
  conteudo: sequelize.TEXT,
  autorId: sequelize.INTEGER,
  data_publicacao: sequelize.DATE,
  data_atualizacao: sequelize.DATE,
}, {});

Posts.belongsTo(Usuarios, { foreignKey: 'autorId' });
Posts.sync();
module.exports = Posts;
