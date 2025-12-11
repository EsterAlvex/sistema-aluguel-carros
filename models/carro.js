'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Carro extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Carro.init({
    modelo: DataTypes.STRING,
    marca: DataTypes.STRING,
    ano: DataTypes.INTEGER,
    placa: DataTypes.STRING,
    status: DataTypes.STRING,
    valor_diaria: DataTypes.DECIMAL(10, 2)
  }, {
    sequelize,
    modelName: 'Carro',
  });
  return Carro;
};