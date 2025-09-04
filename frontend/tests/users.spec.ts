import { test, expect, request } from '@playwright/test';
import path from 'path';

const BASE_URL = 'https://serverest.dev';
const FRONT_URL = 'https://front.serverest.dev';

const usuarioTeste = {
  email: 'fulano@qa.com',
  password: 'teste',
};

test.describe('Testes Serverest', () => {
  let token: string;
  test.beforeAll(async () => {
    const apiRequestContext = await request.newContext();

    const response = await apiRequestContext.post(`${BASE_URL}/login`, {
      data: usuarioTeste,
    });

    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    token = body.authorization;
    console.log('Token gerado:', token);
  });

  test('Validar acesso à API com token', async () => {
    const apiRequestContext = await request.newContext({
      extraHTTPHeaders: {
        Authorization: token,
      },
    });

    const response = await apiRequestContext.get(`${BASE_URL}/usuarios`);
    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    console.log('Usuários cadastrados:', body);
  });
  test.describe('Testes de Login e Funcionalidades UI', () => {
    const loginUI = async (page) => {
      await page.goto(FRONT_URL);
      await page.fill('input[placeholder="Digite seu email"]', usuarioTeste.email);
      await page.fill('input[placeholder="Digite sua senha"]', usuarioTeste.password);
      await page.getByRole('button', { name: 'Entrar' }).click();
      await expect(page).toHaveURL(/.*\/admin\/home/);
    };

    test('Login com sucesso e redirecionamento para a página inicial', async ({ page }) => {
      await loginUI(page);
    });

    test('Login com credenciais inválidas e exibição da mensagem de erro', async ({ page }) => {
      await page.goto(FRONT_URL);
      await page.fill('input[placeholder="Digite seu email"]', 'emailerrado@gmail.com');
      await page.fill('input[placeholder="Digite sua senha"]', '123');
      await page.getByRole('button', { name: 'Entrar' }).click();

      const erroMensagem = page.getByText('Email e/ou senha inválidos', { exact: true });
      await expect(erroMensagem).toBeVisible();
    });

    test('Cadastrar um novo produto e verificar se ele aparece na lista', async ({ page }) => {
      const gerarNomeProduto = () => `Produto Teste ${Math.random().toString(36).substring(2, 8)}`;

      const nomeProduto = gerarNomeProduto();
      await loginUI(page);
      await page.getByTestId('cadastrarProdutos').click();
      await expect(page).toHaveURL(/.*\/admin\/cadastrarprodutos/);
      await page.fill('input[name="nome"]', nomeProduto);
      await page.fill('input[name="price"]', '10');
      await page.getByLabel('Descrição: *').fill('Cadastrando um novo produto');
      await page.fill('input[name="quantity"]', '2');

      const arquivo = path.resolve(__dirname, 'assets/teste.pdf');
      await page.getByTestId('imagem').setInputFiles(arquivo);
      await Promise.all([
        page.waitForURL(/.*\/admin\/listarprodutos/, { timeout: 15000 }),
        page.getByTestId('cadastarProdutos').click()
      ]);

      const produto = page.getByText(nomeProduto);
      await produto.waitFor({ state: 'visible', timeout: 10000 });
      await expect(produto).toBeVisible();
    });

    test('Cadastrar um produto sem preencher todos os campos obrigatórios', async ({ page }) => {
      const gerarNomeProduto = () => `Produto Teste ${Math.random().toString(36).substring(2, 8)}`;

      const nomeProduto = gerarNomeProduto();
      await loginUI(page);
      await page.getByTestId('cadastrarProdutos').click();
      await expect(page).toHaveURL(/.*\/admin\/cadastrarprodutos/);
      await page.fill('input[name="nome"]', nomeProduto);
      await page.fill('input[name="price"]', '10');
      await page.fill('input[name="quantity"]', '2');

      const arquivo = path.resolve(__dirname, 'assets/teste.pdf');
      await page.getByTestId('imagem').setInputFiles(arquivo);
      await page.getByTestId('cadastarProdutos').click()

      const alertaDescricao = page.locator('.alert span', { hasText: 'Descricao é obrigatório' });
      await expect(alertaDescricao).toBeVisible();
    });
  });
});
