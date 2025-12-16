'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    
    const [funcionario] = await queryInterface.sequelize.query(
      `SELECT id FROM "Usuarios" WHERE email = 'funcionario@easycar.com' LIMIT 1;`
    );
    const funcionarioId = funcionario[0].id;
    
    
    const [cliente] = await queryInterface.sequelize.query(
      `SELECT id FROM "Usuarios" WHERE email = 'cliente@easycar.com' LIMIT 1;`
    );
    const clienteId = cliente[0].id;

   
    const [carro1] = await queryInterface.sequelize.query(
        `SELECT id FROM "Carros" WHERE placa = 'ABC1A23' LIMIT 1;`
    );
    const carro1Id = carro1[0].id;

    const [carro2] = await queryInterface.sequelize.query(
        `SELECT id FROM "Carros" WHERE placa = 'XYZ9B87' LIMIT 1;`
    );
    const carro2Id = carro2[0].id;


    const dataAtual = new Date();
    
    const dataInicioHistorico = new Date();
    dataInicioHistorico.setDate(dataAtual.getDate() - 10);
    
    const dataFimHistorico = new Date();
    dataFimHistorico.setDate(dataAtual.getDate() - 5);

    const dataInicioAtivo = new Date();
    dataInicioAtivo.setDate(dataAtual.getDate() - 3);
    
    const dataFimAtivo = new Date();
    dataFimAtivo.setDate(dataAtual.getDate() + 7);


   
    await queryInterface.bulkInsert('Locacaos', [ 
      {
        valor: 600.00,
        data_inicio: dataInicioHistorico,
        data_fim: dataFimHistorico,
        cliente_id: clienteId,     // <--- ID DINÂMICO
        funcionario_id: funcionarioId, // <--- ID DINÂMICO
        carro_id: carro1Id,        // <--- ID DINÂMICO
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        valor: 1505.00, 
        data_inicio: dataInicioAtivo,
        data_fim: dataFimAtivo,
        cliente_id: clienteId,     // <--- ID DINÂMICO
        funcionario_id: funcionarioId, // <--- ID DINÂMICO
        carro_id: carro2Id,        // <--- ID DINÂMICO
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Locacaos', null, {});
  }
};
