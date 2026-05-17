# language: pt

Funcionalidade: Ordenação de produtos
  Como usuário autenticado na aplicação
  Quero ordenar a listagem de produtos
  Para visualizar os itens conforme nome ou preço


  Contexto:
    Dado que o usuário acessa a página de login
    E realiza login com usuário e senha válidos
    Então deve ser direcionado para a tela de produtos
    E deve visualizar 6 produtos disponíveis


  Cenário: Ordenar produtos de A a Z
    Quando o usuário seleciona a ordenação "Name (A to Z)"
    Então os produtos devem ser exibidos em ordem alfabética crescente
    E o primeiro produto da lista deve ser "Sauce Labs Backpack"


  Cenário: Ordenar produtos de Z a A
    Quando o usuário seleciona a ordenação "Name (Z to A)"
    Então os produtos devem ser exibidos em ordem alfabética decrescente
    E o primeiro produto da lista deve ser "Test.allTheThings() T-Shirt (Red)"


  Cenário: Ordenar produtos do menor para o maior preço
    Quando o usuário seleciona a ordenação "Price (low to high)"
    Então os produtos devem ser exibidos do menor para o maior preço
    E o primeiro preço da lista deve ser o menor preço disponível


  Cenário: Ordenar produtos do maior para o menor preço
    Quando o usuário seleciona a ordenação "Price (high to low)"
    Então os produtos devem ser exibidos do maior para o menor preço
    E o primeiro preço da lista deve ser o maior preço disponível


  Cenário: Validar ordenação padrão dos produtos
    Então a ordenação padrão selecionada deve ser "Name (A to Z)"
    E os produtos devem estar ordenados em ordem alfabética crescente


  Cenário: Ordenação não altera quantidade de itens
    Dado que o usuário visualiza a lista de produtos
    Quando o usuário seleciona a ordenação "Price (high to low)"
    Então a quantidade de produtos exibidos deve permanecer a mesma
    E deve visualizar 6 produtos disponíveis