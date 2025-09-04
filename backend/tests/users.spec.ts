import { test, expect } from '@playwright/test';

const BASE_URL = 'https://serverest.dev';

test('Listar usuários com sucesso', async ({ request }) => {
  const response = await request.get(`${BASE_URL}/usuarios`);

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body).toHaveProperty('usuarios');
  expect(Array.isArray(body.usuarios)).toBe(true);
});

test('Buscar usuário inexistente', async ({ request }) => {
  const response = await request.get(`${BASE_URL}/usuarios/0B7fiLufhIQ2HfyP`);

  expect(response.status()).toBe(400);

  const body = await response.json();
  expect(body).toHaveProperty('message');
  expect(body.message).toMatch(/Usuário não encontrado/i);
});

test('Criar usuário com dados válidos', async ({ request }) => {
  const response = await request.post(`${BASE_URL}/usuarios`, {
    data: {
      nome: 'teste',
      email: `emailteste_${Date.now()}@gmail.com`, 
      password: '123',
      administrador: 'true'
    }
  });

  expect(response.status()).toBe(201);

  const body = await response.json();
  expect(body).toHaveProperty('_id');
  expect(body.message).toMatch(/Cadastro realizado com sucesso/i);
});

test('Editar usuário existente', async ({ request }) => {
  const create = await request.post(`${BASE_URL}/usuarios`, {
    data: {
      nome: 'Usuario para editar',
      email: `editar_${Date.now()}@teste.com`,
      password: '123',
      administrador: 'true'
    }
  });
  const createdBody = await create.json();
  const userId = createdBody._id;

  const response = await request.put(`${BASE_URL}/usuarios/${userId}`, {
    data: {
      nome: 'Usuario Editado',
      email: `editado_${Date.now()}@teste.com`,
      password: '456',
      administrador: 'true'
    }
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.message).toMatch(/Registro alterado com sucesso/i);
});

test('Excluir usuário existente', async ({ request }) => {
  const create = await request.post(`${BASE_URL}/usuarios`, {
    data: {
      nome: 'Usuario para deletar',
      email: `deletar_${Date.now()}@teste.com`,
      password: '123',
      administrador: 'true'
    }
  });
  const createdBody = await create.json();
  const userId = createdBody._id;

  const response = await request.delete(`${BASE_URL}/usuarios/${userId}`);

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.message).toMatch(/Registro excluído com sucesso/i);
});
