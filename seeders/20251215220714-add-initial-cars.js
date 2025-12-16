'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.bulkInsert('Carros', [
      {
        marca: 'Fiat',
        modelo: 'Cronos',
        placa: 'ABC1A23',
        ano: 2022,
        status: 'disponivel', 
        valor_diaria: 120.00, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        marca: 'Chevrolet',
        modelo: 'Onix Plus',
        placa: 'XYZ9B87',
        ano: 2023,
        status: 'disponivel',
        valor_diaria: 150.50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        marca: 'Volkswagen',
        modelo: 'T-Cross',
        placa: 'DEF4C56',
        ano: 2024,
        status: 'indisponivel', 
        valor_diaria: 250.90,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Carros', null, {});
  }
};
