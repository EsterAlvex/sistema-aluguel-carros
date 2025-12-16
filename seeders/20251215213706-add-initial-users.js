'use strict';

const bcrypt = require('bcrypt'); 
const saltRounds = 10;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    const senhaFuncionarioHash = await bcrypt.hash('123456', saltRounds);
    const senhaClienteHash = await bcrypt.hash('654321', saltRounds);

    await queryInterface.bulkInsert('Usuarios', [
      {
        nome: 'Admin Funcionário',
        email: 'funcionario@easycar.com',
        senha: senhaFuncionarioHash,
        tipo: 'Funcionario', 
        cnh: '00000000000',
        telefone: '11999999999',
        endereco: 'Rua do Admin, 1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Cliente Teste',
        email: 'cliente@easycar.com',
        senha: senhaClienteHash,
        tipo: 'Cliente', 
        cnh: '99999999999',
        telefone: '11888888888',
        endereco: 'Avenida do Cliente, 10',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('Usuarios', null, {});
  }
};
