# language: pt

Funcionalidade: Login
  Como usuário do sistema
  Quero realizar autenticação na aplicação
  Para acessar a área de produtos quando minhas credenciais forem válidas


  Cenário: Login com sucesso
    Dado que o usuário acessa a página de login
    Quando informa usuário e senha válidos
    E aciona a opção de login
    Então deve ser direcionado para a tela de produtos
    E deve visualizar o título "Products"
    E deve visualizar 6 produtos disponíveis
    E não deve visualizar mensagem de erro


  Cenário: Usuário bloqueado
    Dado que o usuário acessa a página de login
    Quando informa usuário e senha de um usuário bloqueado
    E aciona a opção de login
    Então deve visualizar a mensagem "Sorry, this user has been locked out."
    E não deve ser direcionado para a tela de produtos
    E o botão de login deve continuar visível


  Cenário: Login com usuário inválido
    Dado que o usuário acessa a página de login
    Quando informa um usuário inválido
    E informa uma senha válida
    E aciona a opção de login
    Então deve visualizar a mensagem "Username and password do not match"
    E não deve ser direcionado para a tela de produtos


  Cenário: Login com senha inválida
    Dado que o usuário acessa a página de login
    Quando informa um usuário válido
    E informa uma senha inválida
    E aciona a opção de login
    Então deve visualizar a mensagem "Username and password do not match"
    E não deve ser direcionado para a tela de produtos


  Cenário: Login com usuário e senha inválidos
    Dado que o usuário acessa a página de login
    Quando informa usuário e senha inválidos
    E aciona a opção de login
    Então deve visualizar a mensagem "Username and password do not match"
    E não deve ser direcionado para a tela de produtos


  Cenário: Login sem informar usuário e senha
    Dado que o usuário acessa a página de login
    Quando não informa usuário
    E não informa senha
    E aciona a opção de login
    Então deve visualizar a mensagem "Username is required"
    E não deve ser direcionado para a tela de produtos


  Cenário: Login sem informar usuário
    Dado que o usuário acessa a página de login
    Quando não informa usuário
    E informa uma senha válida
    E aciona a opção de login
    Então deve visualizar a mensagem "Username is required"
    E não deve ser direcionado para a tela de produtos


  Cenário: Login sem informar senha
    Dado que o usuário acessa a página de login
    Quando informa um usuário válido
    E não informa senha
    E aciona a opção de login
    Então deve visualizar a mensagem "Password is required"
    E não deve ser direcionado para a tela de produtos


  Cenário: Login com tentativa de SQL Injection
    Dado que o usuário acessa a página de login
    Quando informa dados com tentativa de SQL Injection no usuário e senha
    E aciona a opção de login
    Então deve visualizar a mensagem "Username and password do not match"
    E não deve ser direcionado para a tela de produtos


  Cenário: Login com caracteres especiais
    Dado que o usuário acessa a página de login
    Quando informa caracteres especiais no usuário e senha
    E aciona a opção de login
    Então deve visualizar a mensagem "Username and password do not match"
    E não deve ser direcionado para a tela de produtos


  Cenário: Login com usuário problem_user
    Dado que o usuário acessa a página de login
    Quando informa usuário e senha do usuário "problem_user"
    E aciona a opção de login
    Então deve ser direcionado para a tela de produtos
    E deve visualizar o título "Products"
    E deve visualizar 6 produtos disponíveis


  Cenário: Login com usuário performance_glitch_user
    Dado que o usuário acessa a página de login
    Quando informa usuário e senha do usuário "performance_glitch_user"
    E aciona a opção de login
    Então deve ser direcionado para a tela de produtos
    E deve visualizar o título "Products"
    E deve visualizar 6 produtos disponíveis


  Cenário: Fechar mensagem de erro de login
    Dado que o usuário acessa a página de login
    Quando informa usuário e senha inválidos
    E aciona a opção de login
    Então deve visualizar a mensagem de erro de login
    Quando fecha a mensagem de erro
    Então a mensagem de erro não deve ser exibida


  Cenário: Campos da tela de login devem estar visíveis
    Dado que o usuário acessa a página de login
    Então o campo de usuário deve estar visível
    E o campo de senha deve estar visível
    E o botão de login deve estar visível