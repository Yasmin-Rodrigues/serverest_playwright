# Projeto Serverest - Testes Automatizados

Este projeto contém testes automatizados para a API e o Frontend do sistema **Serverest** usando **Playwright**.

## Os testes cobrem funcionalidades de:

- API: CRUD de usuários (GET, POST, PUT, DELETE)
- Front-end: Login, cadastro de produtos e validação de campos obrigatórios
- Fluxo de autenticação via token

## Observações: 

- Os relatórios dos testes são gerados automaticamente pelo Playwright.
- Os casos de teste foram documentados na pasta **`doc/`** de cada projeto (frontend e backend).

## Tecnologias Utilizadas

- Node.js
- Playwright
- JavaScript / TypeScript
- Fetch API (para requisições HTTP)
- HTML/CSS (Front-end)
---

## Pré-requisitos

- Node.js >= 18
- npm ou yarn
- Playwright instalado (`npm install -D @playwright/test`)
---

## Como clonar o projeto

```bash
git clone https://github.com/Yasmin-Rodrigues/serverest_playwright.git
cd serverest
```

## Rodando o Backend (Testes de API)

1. **Acesse a pasta do backend:**

```bash
cd backend
```

2. **Instale as dependências:**

```bash
npm install
```

3. **Execute os testes:**

```bash
npx playwright test
```

4. **Visualize o relatório:**

```bash
npx playwright show-report
```

## Rodando o Frontend (Testes de UI)

1. **Acesse a pasta do frontend:**

```bash
cd frontend
```

2. **Instale as dependências:**

```bash
npm install
```

3. **Execute os testes:**

```bash
npx playwright test
```

4. **Visualize o relatório:**

```bash
npx playwright show-report
```
**Links ServeRest:**

- **Back-end:** [https://serverest.dev/](https://serverest.dev/)  
- **Front-end:** [https://front.serverest.dev/](https://front.serverest.dev/)
