# language: pt

Funcionalidade: Checkout
  Como usuário autenticado
  Quero finalizar a compra dos produtos adicionados ao carrinho
  Para concluir meu pedido com sucesso

  Contexto:
    Dado que o usuário acessa o sistema
    E realiza login com usuário e senha válidos
    Então deve ser direcionado para a tela de produtos


  Cenário: Compra realizada com sucesso
    Quando o usuário adiciona o produto "Sauce Labs Backpack" ao carrinho
    E acessa o carrinho
    Então deve ser direcionado para a tela do carrinho

    Quando prossegue para o checkout
    E informa o primeiro nome "Italo"
    E informa o sobrenome "Vieira"
    E informa o CEP "12345-000"
    E continua o checkout
    E finaliza a compra
    Então deve visualizar a mensagem "Thank you for your order!"