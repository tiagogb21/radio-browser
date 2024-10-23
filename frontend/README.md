# Radio Browser Challenge

## Vercel:

Este projeto foi publicado na Vercel e pode ser acessado no seguinte link:

[]

## Descrição do Projeto

Este projeto foi desenvolvido para o desafio da Coodesh e consiste em uma aplicação de rádio online, onde os usuários podem buscar rádios, adicioná-las a uma lista de favoritas, editar informações e ouvir as estações selecionadas. A aplicação consome a API pública do Radio Browser.

## Funcionalidades

* Adicionar uma rádio à lista de favoritos: O usuário pode adicionar rádios à lista de favoritas diretamente da lista de rádios disponíveis.

* Visualizar a lista de rádios favoritas: O usuário pode ver todas as rádios que foram adicionadas como favoritas.

* Remover uma rádio da lista de favoritos: O usuário pode remover qualquer rádio da lista de favoritas.

* Editar informações da rádio: O usuário pode editar os dados de uma rádio favorita.

* Ouvir e parar uma rádio: O usuário pode clicar no botão de "play" para ouvir uma rádio ou no botão de "stop" para parar.

* Pesquisar rádios por nome, país ou idioma: O usuário pode pesquisar rádios disponíveis na API através de filtros e paginar os resultados.

* Persistência de dados: As rádios favoritas são armazenadas no localStorage do navegador, garantindo que as informações permaneçam mesmo após o fechamento da aplicação.

## Tecnologias Utilizadas

* Linguagem: TypeScript
* Framework: Next.js (React)
* Biblioteca de UI: Tailwind CSS
* Biblioteca de ícones: react-icons
* Gerenciamento de estado/contexto: use-context-selector
* Testes: Jest, Testing Library
* Docker: Configurado para rodar a aplicação em container
* API Externa: Radio Browser API
* Deploy: Vercel

## Como Instalar e Rodar o Projeto Localmente

obs.: O projeto está localizado no diretório "frontend".

obs.: Conforme o modelo apresentado, a lista de rádios está acessível no menu, que pode ser aberto por meio do ícone correspondente. Já a lista de rádios favoritas está disponível no conteúdo principal.

### Pré-requisitos

* Node.js (versão 14 ou superior)
* Docker (caso queira rodar em container)
* Navegador atualizado

### Passo a Passo para Executar

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/radio-browser-challenge.git
```

2. Instale as dependências:

```bash
cd radio-browser
```

```bash
cd frontend
```

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```
4. Abra a aplicação: A aplicação estará rodando no endereço:

```bash
http://localhost:3000.
```

### Rodando o Projeto com Docker

1. Build da imagem Docker:

```bash
docker-compose build
```

2. Rodar o container:

```bash
docker-compose up
```

3. Acessar a aplicação no navegador: O projeto estará rodando em:

```bash
http://localhost:3000.
```

## Testes

Para rodar os testes unitários com Jest e Testing Library, execute o seguinte comando:

```bash
npm run test
```

obs.: Os testes foram desenvolvidos para cobrir as principais funcionalidades do sistema, garantindo que a lógica de adicionar/remover rádios favoritas, play/stop e as interações básicas do usuário funcionem corretamente.

## Diferenciais Implementados

* Testes Unitários: O projeto conta com testes para garantir a qualidade do código.
* Docker: Configuração Docker pronta para facilitar o deploy e execução da aplicação.
* Persistência de dados: As rádios favoritas são armazenadas no localStorage, garantindo que as informações persistam ao recarregar a página.
* Deploy
