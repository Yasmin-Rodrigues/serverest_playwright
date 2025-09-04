# Testes API Serverest

---

## CT01 - Listar usuários com sucesso

**Objetivo:** Validar que o endpoint de listagem de usuários retorna todos os usuários corretamente.

**Pré-condição:**  
- A API deve estar ativa.  
- Existirem usuários cadastrados no sistema.

**Passos:**  
1. Enviar requisição GET para `/usuarios`.  
2. Validar status code da resposta.  
3. Validar se o corpo da resposta contém a lista de usuários.

**Resultado Esperado:**  
- Status code 200.  
- A resposta contém uma lista de usuários.

---

## CT02 - Buscar usuário inexistente

**Objetivo:** Validar que a API retorna erro ao buscar um usuário que não existe.

**Pré-condição:**  
- A API deve estar ativa.

**Passos:**  
1. Enviar requisição GET para `/usuarios/<id-inexistente>`.

**Resultado Esperado:**  
- Status code 404.  
- Mensagem de erro indicando que o usuário não foi encontrado.

---

## CT03 - Criar usuário com dados inválidos ou já existentes

**Objetivo:** Validar que a API retorna erro ao tentar criar usuário com dados inválidos ou e-mail já existente.

**Pré-condição:**  
- A API deve estar ativa.  
- O e-mail usado já deve existir ou os dados enviados são inválidos.

**Passos:**  
1. Enviar requisição POST para `/usuarios` com dados inválidos ou e-mail duplicado.

**Resultado Esperado:**  
- Status code 400 ou 409 (dependendo da API).  
- Mensagem de erro indicando o problema (ex.: “Email já cadastrado”).

---

## CT04 - Editar usuário existente com sucesso

**Objetivo:** Validar que é possível atualizar os dados de um usuário existente.

**Pré-condição:**  
- A API deve estar ativa.  
- O usuário a ser editado deve existir.

**Passos:**  
1. Enviar requisição PUT para `/usuarios/<id>` com os dados atualizados.  
2. Validar status code da resposta.  
3. Validar se os dados retornados correspondem aos dados atualizados.

**Resultado Esperado:**  
- Status code 200.  
- Dados do usuário atualizados corretamente.

---

## CT05 - Excluir usuário com sucesso

**Objetivo:** Validar que é possível excluir um usuário existente.

**Pré-condição:**  
- A API deve estar ativa.  
- O usuário a ser excluído deve existir.

**Passos:**  
1. Enviar requisição DELETE para `/usuarios/<id>`.  
2. Validar status code da resposta.

**Resultado Esperado:**  
- Status code 200.  
- Mensagem de sucesso confirmando a exclusão.