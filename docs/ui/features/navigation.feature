# language: pt

Funcionalidade: Navegação
  Como usuário autenticado na aplicação
  Quero navegar entre as principais telas do sistema
  Para acessar carrinho, produtos, menu lateral e página About


  Contexto:
    Dado que o usuário acessa a página de login
    E realiza login com usuário e senha válidos
    Então deve ser direcionado para a tela de produtos


  Cenário: Navegar para carrinho
    Quando o usuário acessa o carrinho
    Então deve ser direcionado para a tela do carrinho
    E o carrinho não deve possuir itens
    E o botão de checkout deve estar visível


  Cenário: Voltar do carrinho para produtos
    Quando o usuário acessa o carrinho
    E aciona a opção de continuar comprando
    Então deve ser direcionado para a tela de produtos
    E deve visualizar 6 produtos disponíveis
    E deve visualizar o título "Products"


  Cenário: Abrir menu lateral
    Quando o usuário abre o menu lateral
    Então o menu lateral deve ser exibido
    E a opção "All Items" deve estar visível
    E a opção "About" deve estar visível
    E a opção "Logout" deve estar visível
    E a opção "Reset App State" deve estar visível


  Cenário: Fechar menu lateral
    Quando o usuário abre o menu lateral
    Então o menu lateral deve ser exibido

    Quando o usuário fecha o menu lateral
    Então o menu lateral não deve ser exibido


  Cenário: Navegar para página About
    Quando o usuário abre o menu lateral
    E aciona a opção "About"
    Então deve ser direcionado para a página da Sauce Labs