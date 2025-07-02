#  F1 Access API

API desenvolvida com **Express** e **TypeScript** para fornecer dados da temporada 2023 da Fórmula 1, incluindo informações de pilotos e equipes. Ideal para estudos, portfólio ou integração com frontends de estatísticas e dashboards.

---

## Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Joi](https://joi.dev/) — Validação de dados
- [UUID / crypto](https://nodejs.org/api/crypto.html) — Geração de IDs
- [Nodemon](https://nodemon.io/) — Dev server com hot reload
- [Cross-env](https://www.npmjs.com/package/cross-env) — Compatibilidade de ambiente

---

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/willianOliveira-dev/f1-access-api.git
````

2. Acesse a pasta do projeto:

```bash
cd f1-access-api
```

3. Instale as dependências:

```bash
npm install
```

---

##  Execução

### Modo de Desenvolvimento (TS direto):

```bash
npm run dev
```

### Build (transpila TypeScript para JavaScript):

```bash
npm run build
```

### Executar build:

```bash
npm start
```

---

## Rotas da API

Base URL: `http://localhost:8000/api/v1`

### 🧍‍♂️ Pilotos

* `GET /drivers` → Lista todos os pilotos.
* `GET /drivers/:id` → Retorna piloto específico por ID.
* `GET /drivers/standings/:position` → Retorna piloto pela posição (ranking de pontos).
* `POST /drivers` → Adiciona novo piloto.
* `PUT /drivers/:id` → Atualiza informações do piloto.
* `DELETE /drivers/:id` → Remove piloto.

### Equipes

* `GET /teams` → Lista as equipes somando os pontos dos pilotos.
* `GET /teams/standings/:position` → Retorna equipe pela posição no ranking.

---

##  Estrutura do Projeto

```
src/
├── app.ts                 # Entrada principal
├── routes/
│   ├── driver.ts          # Rotas relacionadas a pilotos
│   └── team.ts            # Rotas relacionadas a equipes
├── data.ts                # Dados simulados (pilotos e equipes)
├── inputValidation.ts     # Validações com Joi
├── InsertionSortLike.ts   # Algoritmo de ordenação customizado
```

---

## Observações

* Os dados são mantidos em memória (sem banco de dados).
* IDs são gerados com `crypto.randomUUID()`.
* Toda validação de entrada é feita com `Joi`.
* Os dados das equipes são recalculados a cada mudança nos pilotos.

---

## Autor

Feito com dedicação por [Willian Oliveira](https://github.com/willianOliveira-dev)

---

## Relatar Problemas

Abra uma [issue aqui](https://github.com/willianOliveira-dev/f1-access-api/issues)
