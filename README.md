# API Drive Easy: Sistema de Gestão de Locação de Carros (Node.js/Express)

[![Node.js](https://img.shields.io/badge/Node.js-20.x%2B-green.svg?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-blue.svg?logo=express)](https://expressjs.com/)
[![Sequelize](https://img.shields.io/badge/Sequelize-6.x-blue.svg?logo=sequelize&logoColor=white)](https://sequelize.org/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-003B57.svg)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)
---

## Instituições de Fomento e Parceria


[![Website IFB](https://img.shields.io/badge/Website-IFB-%23508C3C.svg?labelColor=%23C8102E)](https://www.ifb.edu.br/) 
[![Website ihwbr](https://img.shields.io/badge/Website-ihwbr-%23DAA520.svg?labelColor=%232E2E2E)](https://hardware.org.br/)

## Orientador (link para o perfil do orientador)




---

## Sumário

- [Visão Geral](#visão-geral)
- [Pacotes Utilizados](#pacotes-utilizados)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Diagrama de Banco de Dados](#diagrama-de-banco-de-dados)
- [Documentação da API](#documentação-da-api)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Deploy (Opcional)](#deploy-opcional)

---

## Visão Geral

A **API Drive Easy** é um sistema RESTful desenvolvido para gerenciar todas as operações essenciais de uma locadora de veículos. O objetivo principal é automatizar o fluxo de trabalho, desde o cadastro de carros e usuários até o registro e cálculo inteligente das locações.

**Domínio de Aplicação:** Gestão de Locação de Veículos.
**Público-Alvo:** Clientes (consulta de locações) e Funcionários/Administradores (gestão completa do sistema).

**Funcionalidades de Alto Nível:**
* **Controle de Acesso:** Autenticação JWT e autorização baseada em perfil (`Cliente` vs. `Funcionário`).
* **Cálculo Automático de Locação:** O sistema calcula o valor total da locação dinamicamente com base na diária do carro e no período de aluguel.
* **Gestão de Estoque:** Atualização automática do status do carro (`Disponível` / `Alugado`).
* **Segurança de Dados:** Clientes só podem visualizar suas próprias locações.

---

## Pacotes Utilizados

Lista das dependências Node.js/Express utilizadas no projeto.

| Pacote | Versão | Descrição |
| :--- | :--- | :--- |
| **express** | `^5.2.1` | Framework web principal para roteamento e middlewares. |
| **sequelize** | `^6.37.7` | ORM para mapeamento objeto-relacional. |
| **jsonwebtoken** | `^9.0.3` | Geração e verificação de tokens JWT. |
| **bcryptjs** | `^3.0.3` | Criptografia (hashing) de senhas. |
| **dotenv** | `^17.2.3` | Gerenciamento de variáveis de ambiente (`.env`). |
| **pg** | `^8.16.3` | Driver PostgreSQL. |
| **pg-hstore** | `^2.3.4` | Suporte a tipos de dados HSTORE para PostgreSQL. |
| **bcrypt** | `^6.0.0` | Utilitário para hashing criptográfico. |
| **nodemon** | `^3.1.11` | (DEV) Reinicia o servidor automaticamente durante o desenvolvimento. |
| **sequelize-cli** | `^6.6.3` | (DEV) Interface de Linha de Comando do Sequelize para Migrations e Seeders. |

---

## Estrutura do Projeto

A arquitetura segue o padrão **MVC (Model-View-Controller)** com pastas claras para cada componente.


---

## Diagrama de Banco de Dados

>
---

## Documentação da API

A documentação deve ser consultada usando ferramentas como **Postman** ou **Insomnia** (necessário passar o Token JWT para rotas protegidas).

### Endpoints Principais

Todos os endpoints utilizam o prefixo **`http://localhost:3000`**.

| Método | Endpoint | Descrição | Autenticação |
| :--- | :--- | :--- | :--- |
| `POST` | `/login` | Autentica o usuário e emite o token JWT. | Pública |
| `POST` | `/cadastro` | Registra um novo usuário (cliente/funcionário). | Pública |
| `GET` | `/carros` | Lista todos os carros disponíveis. | Autenticada |
| `POST` | `/carros` | Cadastra um novo veículo. | Requer **Funcionário** |
| `POST` | `/locacoes` | Registra uma nova locação e calcula o valor. | Requer **Funcionário** |
| `GET` | `/locacoes` | Lista todas as locações do sistema. | Requer **Funcionário** |
| `GET` | `/locacoes/consultar` | Lista **apenas** as locações do usuário autenticado. | Autenticada |
| `PUT` | `/locacoes/{id}` | Atualiza uma locação específica. | Requer **Funcionário** |

> **Detalhes:** Rotas como `/locacoes` e `/carros` (POST) utilizam os middlewares `autenticar` e `eFuncionario`.

---
## Configuração do Ambiente

Siga os passos abaixo para configurar o ambiente local.

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/usuario/projeto_api.git
   cd nomeDaSuaPasta
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   ```bash
   Crie um arquivo .env com as credenciais do seu banco de dados e a chave JWT_SECRET.
   ```

4. **Aplique as migrações e inicie o servidor:**
   ```bash
   npx sequelize-cli db:migrate
   npm start
   ```
---

