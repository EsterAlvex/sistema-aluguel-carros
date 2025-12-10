'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Locacao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Locacao.belongsTo(models.Usuario, {
        foreignKey: 'cliente_id',
        as: 'cliente' 
      });

      // 2. Locação pertence a um Funcionário (que também é um Usuário)
      Locacao.belongsTo(models.Usuario, {
        foreignKey: 'funcionario_id',
        as: 'funcionario' 
      
      });

      // 3. Locação pertence a um Carro
      Locacao.belongsTo(models.Carro, {
        foreignKey: 'carro_id',
        as: 'carro' 
      });
    }
    }
  
  Locacao.init({
    valor: DataTypes.DECIMAL,
    data_inicio: DataTypes.DATE,
    data_fim: DataTypes.DATE,
    cliente_id: DataTypes.INTEGER,
    funcionario_id: DataTypes.INTEGER,
    carro_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Locacao',
  });
  return Locacao;

};