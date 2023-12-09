# Aplicativo de Imposto de Renda - React Native + Typescript

Este repositório contém o código-fonte de um aplicativo móvel desenvolvido em React Native com Typescript. O aplicativo é um CRUD de usuário, no qual, ao se cadastrar, o usuário pode visualizar a alíquota e o valor a ser descontado de seu salário devido ao imposto de renda. O aplicativo se comunica com uma API REST, cujo código também está disponível [neste repositório](https://github.com/WiliamMelo01/impostoApi).

## Funcionalidades Principais
### 1. Cadastro de Usuário
Os usuários podem se cadastrar fornecendo informações como nome, renda, e outras informações relevantes. Após o cadastro, a alíquota e o valor do imposto de renda são calculados automaticamente com base na renda fornecida.

### 2. Lista de Usuários
Existe uma funcionalidade para visualizar a lista de todos os usuários cadastrados, exibindo suas informações principais.

### 3. Atualização de Usuário
Os usuários podem atualizar suas informações, permitindo ajustes na renda e outras informações relevantes. A alíquota e o valor do imposto de renda são recalculados após qualquer atualização.

### 4. Exclusão de Usuário
Há a opção de excluir um usuário do sistema, removendo suas informações do banco de dados.

### 5. Comunicação com a API REST
O aplicativo se comunica de forma eficiente com uma API REST, garantindo que as informações estejam sempre atualizadas e sincronizadas entre os dispositivos.

## Como Executar o Projeto

### 1. Instalação de Dependências:
Certifique-se de ter o Node.js e o npm instalados em sua máquina. Execute o seguinte comando para instalar as dependências do projeto:
```
npm install
```
### 2.Configuração da API:
Certifique-se de configurar corretamente a URL da API no código-fonte. No arquivo ```src/utils/httpClient.ts```, ajuste o valor ´```baseUrl``` para apontar para a localização correta da sua API.
### 3.Execução do Projeto:
Execute o aplicativo em um ambiente de desenvolvimento usando o seguinte comando:
```
npm run start
```

## Contribuições
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests para melhorar este projeto.
