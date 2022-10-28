
<h1 align="center">
  <img src="src/assets/logo.svg" width="90px" />
</h1>
<h4 align="center">
 <b>🎫 NV99 Badges</b>
</h4>
<p align="center">
  <img alt="GitHub Language Count" src="https://img.shields.io/github/languages/count/ialexanderbrito/nv99badges?style=flat-square" />
  <img alt="GitHub Top Language" src="https://img.shields.io/github/languages/top/ialexanderbrito/nv99badges?style=flat-square" />
  <img alt="" src="https://img.shields.io/github/repo-size/ialexanderbrito/nv99badges?style=flat-square" />
  <img alt="GitHub Issues" src="https://img.shields.io/github/issues/ialexanderbrito/nv99badges?style=flat-square" />
  <img alt="GitHub Last Commit" src="https://img.shields.io/github/last-commit/ialexanderbrito/nv99badges?style=flat-square" />

</p>

<br>

### 🧪 Tecnologias usadas
Esse projeto foi desenvolvido com as seguintes tecnologias:
- [ReactJS](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](http://vitejs.dev/)

Extras:

- Main Libs
  - [TailwindCSS](https://tailwindcss.com/)
  - [React Query](https://tanstack.com/query/v4)
  - Para mais detalhes, veja o <kbd>[package.json](https://github.com/ialexanderbrito/nv99badges/blob/master/package.json)</kbd>

- Estilos
  - [EditorConfig](https://editorconfig.org/)
  - [ESLint](https://eslint.org/)
  - [Prettier](https://prettier.io/)

### 💻 Demo Web

[Visite o site](https://nv99badges.ialexanderbrito.dev/)

### 💻 Projeto

Resolvi realizar esse projeto depois de ter visto o [Flow Badges](https://www.flowbadges.com/) e como sou colecionador de Emblemas da plataforma [NV99](https://nv99.com.br/) fiz esse site para listar os emblemas da plataforma de forma mais rápida, fácil e com alguns filtros para facilitar a busca não só para mim, mas para todos que queiram ter acesso a esses dados.

### ⚙ Como rodar este projeto

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:

<b>[Git](https://git-scm.com)</b>

<b>[Node.js](https://nodejs.org/en/)</b>

E também será preciso um editor, eu indico o <b>[VSCode](https://code.visualstudio.com/)</b>

### 🧭 Rodando o Frontend

```bash
# Clone este repositório
$ git clone https://github.com/ialexanderbrito/nv99badges

# Acesse a pasta do projeto no terminal/cmd
$ cd nv99badges

# Instale as dependências
$ npm install ou yarn

# Execute a aplicação em modo de desenvolvimento
$ npm run dev ou yarn dev

# O servidor inciará na porta:3000 - acesse http://localhost:3000
```

### 🚚 Rotas API
`GET` `/badges/?limit={limit}&page={page}&order={order}` - Listar emblemas

- Limit: Quantidade de badges por página, padrão 12;
- Page: Número de páginas;
- Order: Ordenação da listagem, ex: asc, desc, recent.

`GET` `/search/code={code}` - Buscar emblema por nome

- Code: Nome do emblema ou descrição do emblema

`GET` `/badge/:id` - Buscar informação do Emblema

- Id: Id do emblema

`GET` `/badges/creator/:id` - Lista emblemas do Podcast específico

- Id: Id do podcast

**API usada para buscar os dados -> [API FLOW](https://stickers-flow3r-2eqj3fl3la-ue.a.run.app/v1/badges)**

### :recycle: Como contribuir

- Fork esse repositório;
- Crie uma branch com a sua feature: `git checkout -b my-feature`
- Commit suas mudanças: `git commit -m 'feat: My new feature'`
- Push a sua branch: `git push origin my-feature`

Depois que o merge da sua pull request for feito, você pode deletar a sua branch.

### :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

### 📱 Social

Me acompanhe nas minhas redes sociais.

<p align="center">

 <a href="https://twitter.com/ialexanderbrito" target="_blank" >
     <img alt="Twitter" src="https://img.shields.io/badge/-Twitter-9cf?style=flat-square&logo=Twitter&logoColor=white"></a>

  <a href="https://instagram.com/ialexanderbrito" target="_blank" >
    <img alt="Instagram" src="https://img.shields.io/badge/-Instagram-ff2b8e?style=flat-square&logo=Instagram&logoColor=white"></a>

  <a href="https://www.linkedin.com/in/ialexanderbrito/" target="_blank" >
    <img alt="Linkedin" src="https://img.shields.io/badge/-Linkedin-blue?style=flat-square&logo=Linkedin&logoColor=white"></a>

  <a href="https://t.me/ialexanderbrito" target="_blank" >
    <img alt="Telegram" src="https://img.shields.io/badge/-Telegram-blue?style=flat-square&logo=Telegram&logoColor=white"></a>

  <a href="mailto:ialexanderbrito@gmail.com" target="_blank" >
    <img alt="Email" src="https://img.shields.io/badge/-Email-c14438?style=flat-square&logo=Gmail&logoColor=white"></a>

</p>

---

Feito com ❤️ by **Alexander** 🤙🏾
