'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Adiciona a coluna 'valor_diaria' na tabela 'Carros'
    await queryInterface.addColumn('Carros', 'valor_diaria', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 100.00 // Valor padrão (100.00) para carros que já existem
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove a coluna caso desfaça a migração
    await queryInterface.removeColumn('Carros', 'valor_diaria');
  }
};