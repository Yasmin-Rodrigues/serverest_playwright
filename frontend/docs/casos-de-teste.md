# Casos de Teste - Sistema Serverest

## CT01 - Login com sucesso e redirecionamento para a página inicial

**Objetivo:**  
Verificar se o usuário consegue realizar o login com sucesso e é redirecionado para a página inicial do sistema.

**Pré-condição:**  
- O sistema Serverest deve estar disponível.  
- O usuário deve possuir um cadastro válido (e-mail e senha).  

**Passos:**  
1. Acessar a página de login do Serverest.  
2. Informar um e-mail válido.  
3. Informar a senha correta.  
4. Clicar no botão "Entrar" ou "Login".

**Resultado Esperado:**  
- O sistema deve autenticar o usuário e redirecionar para a página inicial.  
- O nome do usuário ou mensagem de boas-vindas deve estar visível na tela.

---

## CT02 - Login com credenciais inválidas e exibição da mensagem de erro

**Objetivo:**  
Verificar se o sistema exibe mensagem de erro ao tentar logar com e-mail e/ou senha inválidos.

**Pré-condição:**  
- O sistema Serverest deve estar disponível.

**Passos:**  
1. Acessar a página de login do Serverest.  
2. Informar um e-mail inexistente ou incorreto.  
3. Informar uma senha incorreta.  
4. Clicar no botão "Entrar" ou "Login".

**Resultado Esperado:**  
- O sistema não deve autenticar o usuário.  
- Deve exibir uma mensagem de erro clara como: "Usuário ou senha inválidos".

---

### CT03 - Cadastrar um novo produto e verificar se ele aparece na lista

**Objetivo:**  
Validar que um usuário logado consegue cadastrar um novo produto e que o produto cadastrado aparece corretamente na lista de produtos.

**Pré-condição:**  
- Usuário deve estar logado no sistema.  
- A tela de cadastro de produtos deve estar acessível.

**Passos:**  
1. Acessar a tela de cadastro de produtos.  
2. Preencher todos os campos obrigatórios do produto (nome, preço, descrição, categoria, etc.).  
3. Clicar no botão “Salvar” ou “Cadastrar”.  
4. Acessar a lista de produtos cadastrados.  
5. Verificar se o produto recém-cadastrado está presente na lista.

**Resultado Esperado:**  
- O produto é cadastrado com sucesso.  
- O produto aparece corretamente na lista de produtos com todas as informações preenchidas.

---

### CT04 - Cadastrar um produto sem preencher todos os campos obrigatórios

**Objetivo:**  
Validar que o sistema impede o cadastro de um produto quando campos obrigatórios não são preenchidos, exibindo mensagens de erro apropriadas.

**Pré-condição:**  
- Usuário deve estar logado no sistema.  
- A tela de cadastro de produtos deve estar acessível.

**Passos:**  
1. Acessar a tela de cadastro de produtos.  
2. Preencher apenas alguns campos obrigatórios, deixando pelo menos um em branco.  
3. Clicar no botão “Cadastrar”.  
4. Observar as mensagens de validação exibidas pelo sistema.

**Resultado Esperado:**  
- O produto **não** é cadastrado.  
- O sistema exibe mensagens de erro indicando quais campos são obrigatórios e devem ser preenchidos.

---

### CT05 - Login e uso de token em endpoint restrito

**Objetivo:**  
Validar que um usuário válido consegue autenticar-se e utilizar o token para acessar endpoints protegidos.

**Pré-condição:**  
- Usuário válido cadastrado na base (fulano@qa.com).
- A API deve estar ativa.

**Passos:**  
1. Realizar login na API (/login) com o usuário válido
2. Capturar o token retornado na resposta.
3. Enviar o token em uma requisição GET para /usuarios.
4. Validar o status code e os dados retornados.

**Resultado Esperado:**  
- Login retorna status code 200 e fornece um token válido. 
- Requisição para /usuarios retorna status code 200 e uma lista de usuários.