# language: pt

Funcionalidade: Logout
  Como usuário autenticado na aplicação
  Quero encerrar minha sessão
  Para garantir que minha conta não continue acessível após sair do sistema


  Contexto:
    Dado que o usuário acessa a página de login
    E realiza login com usuário e senha válidos
    Então deve ser direcionado para a tela de produtos


  Cenário: Logout com sucesso
    Quando o usuário abre o menu lateral
    Então o menu lateral deve ser exibido

    Quando o usuário aciona a opção de logout
    Então deve ser direcionado para a página de login
    E o botão de login deve estar visível
    E o campo de usuário deve estar visível
    E o campo de senha deve estar visível
    E não deve visualizar produtos na tela


  Cenário: Usuário não acessa inventory após logout
    Quando o usuário abre o menu lateral
    E aciona a opção de logout
    E tenta acessar diretamente a página de produtos
    Então deve ser redirecionado para a página de login
    E o botão de login deve estar visível