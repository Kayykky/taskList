# taskList 

📋 Bem-vindo ao repositório do frontend do projeto taskList! Este é o frontend que complementa o projeto, um sistema de criação e administração de listas de tarefas. A API correspondente pode ser encontrada [aqui](https://github.com/Kayykky/taskList-api).

## Funcionalidades

O projeto TaskList oferece uma interface de usuário amigável para interagir com a API de tarefas. Algumas das funcionalidades do frontend incluem:

- Visualização de listas de tarefas.
- Adição e exclusão de listas de tarefas.
- Adição e exclusão de tarefas em listas.

## Tecnologias utilizadas

- HTML, CSS: Linguagens de marcação e estilo utilizadas para criar a interface do usuário.
- Next.js: Framework de React para a construção de aplicativos web.
- Axios: Biblioteca para fazer requisições HTTP e se comunicar com a API.
- JavaScript: Linguagem de programação utilizada para a lógica do frontend.

## Instalação

Antes de executar o frontend, certifique-se de instalar todas as dependências. Você pode fazer isso executando o seguinte comando:

```shell
yarn install
```

## Configuração

Para configurar a integração com a API, verifique o arquivo `src/api.ts` e ajuste a URL da API de acordo com o servidor da API. Certifique-se de que a URL corresponda à URL da API que você está usando.

```javascript
const api = axios.create({
  baseURL: 'http://localhost:3333', 
});
```

## Executando o Frontend

Para iniciar o frontend, use o seguinte comando:

```shell
yarn dev
```

Isso iniciará o servidor de desenvolvimento do Next.js.
