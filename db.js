const sql = require('mssql');

// Configuração da conexão
const config = {
  usuario: 'GABRIEL/xxgab',          // Seu nome de usuário do SQL Server
  senha: '',                        // Sua senha do SQL Server
  servidor: 'GABRIEL',              // Nome do servidor ou IP, 'localhost' se estiver rodando localmente
  bancoDados: 'AdventureWorks',     // Nome do banco de dados
  porta: 1433,                      // Porta do SQL Server, geralmente 1433
  opcoes: {
    criptografar: false,            // Defina como true se estiver usando uma conexão segura
    confiarCertificadoServidor: true // Defina como true para conexões locais
  }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Conexão com o SQL Server bem-sucedida!');
    return pool;
  })
  .catch(err => {
    console.error('Falha na conexão com o SQL Server:', err);
  });

module.exports = {
  sql, poolPromise
};
