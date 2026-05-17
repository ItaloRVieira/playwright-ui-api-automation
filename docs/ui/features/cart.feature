# language: pt

Funcionalidade: Carrinho de compras
  Como usuário autenticado
  Quero adicionar, visualizar e remover produtos do carrinho
  Para controlar os itens antes de finalizar uma compra

  Contexto:
    Dado que o usuário acessa o sistema
    E realiza login com usuário e senha válidos
    Então deve ser direcionado para a tela de produtos


  Cenário: Adicionar produto ao carrinho
    Quando o usuário adiciona o produto "Sauce Labs Backpack" ao carrinho
    Então o badge do carrinho deve exibir "1"
    E o botão "Remove" do produto deve ser exibido
    E o botão "Add to cart" do produto não deve ser exibido


  Cenário: Produto correto aparece no carrinho
    Quando o usuário adiciona o produto "Sauce Labs Backpack" ao carrinho
    E acessa o carrinho
    Então deve ser direcionado para a tela do carrinho
    E o produto "Sauce Labs Backpack" deve ser exibido no carrinho
    E o carrinho deve conter 1 item


  Cenário: Preço correto do produto no carrinho
    Quando o usuário adiciona o produto "Sauce Labs Backpack" ao carrinho
    E acessa o carrinho
    Então o preço do produto deve ser exibido corretamente
    E o total do carrinho deve ser igual ao preço do produto


  Cenário: Remover produto do carrinho pela tela de produtos
    Quando o usuário adiciona o produto "Sauce Labs Backpack" ao carrinho
    E remove o produto "Sauce Labs Backpack" do carrinho
    Então o badge do carrinho não deve ser exibido
    E o botão "Remove" do produto não deve ser exibido
    E o botão "Add to cart" do produto deve ser exibido


  Cenário: Carrinho vazio após remover produto
    Quando o usuário adiciona o produto "Sauce Labs Backpack" ao carrinho
    E acessa o carrinho
    E remove o produto "Sauce Labs Backpack"
    Então o carrinho não deve exibir nenhum item


  Cenário: Adicionar múltiplos produtos ao carrinho
    Quando o usuário adiciona o produto "Sauce Labs Backpack" ao carrinho
    E adiciona o produto "Sauce Labs Bike Light" ao carrinho
    Então o badge do carrinho deve exibir "2"
    Quando o usuário acessa o carrinho
    Então o carrinho deve conter 2 itens
    E o produto "Sauce Labs Backpack" deve ser exibido no carrinho
    E o produto "Sauce Labs Bike Light" deve ser exibido no carrinho
    E o total do carrinho deve ser igual à soma dos produtos adicionados
    E o produto "Sauce Labs Backpack" deve aparecer apenas 1 vez
    E o produto "Sauce Labs Bike Light" deve aparecer apenas 1 vez


  Cenário: Carrinho persiste após recarregar a página
    Quando o usuário adiciona o produto "Sauce Labs Backpack" ao carrinho
    E recarrega a página
    Então o badge do carrinho deve continuar exibindo "1"
    Quando o usuário acessa o carrinho
    Então deve ser direcionado para a tela do carrinho
    E o produto "Sauce Labs Backpack" deve continuar visível no carrinho


  Cenário: Carrinho persiste após navegação
    Quando o usuário adiciona o produto "Sauce Labs Backpack" ao carrinho
    E acessa o carrinho
    E retorna para a tela anterior
    Então o badge do carrinho deve continuar exibindo "1"
    Quando o usuário acessa novamente o carrinho
    Então o produto "Sauce Labs Backpack" deve continuar visível no carrinho