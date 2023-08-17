const db = require("../sequelize");//connfigurações
const sequelize = require("sequelize");//framework

const Usuarios = db.define("Usuarios", {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: sequelize.STRING,
  email: sequelize.STRING,
  data_criacao: sequelize.DATE,
  data_atualizacao: sequelize.DATE,
});

Usuarios.sync();

module.exports = Usuarios;
