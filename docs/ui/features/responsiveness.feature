# language: pt

Funcionalidade: Responsividade
  Como usuário da aplicação
  Quero que as principais telas se adaptem a diferentes resoluções
  Para conseguir utilizar o sistema em dispositivos mobile, tablet e desktop


  Esquema do Cenário: Tela de login deve ser exibida corretamente em diferentes resoluções
    Dado que o usuário acessa a aplicação na resolução "<dispositivo>"
    Quando visualiza a tela de login
    Então o campo de usuário deve estar visível
    E o campo de senha deve estar visível
    E o botão de login deve estar visível

    Exemplos:
      | dispositivo |
      | mobile      |
      | tablet      |
      | desktop     |


  Esquema do Cenário: Lista de produtos deve ser exibida corretamente em diferentes resoluções
    Dado que o usuário acessa a aplicação na resolução "<dispositivo>"
    E realiza login com usuário e senha válidos
    Então deve ser direcionado para a tela de produtos
    E deve visualizar o título "Products"
    E deve visualizar 6 produtos disponíveis
    E o filtro de ordenação deve estar visível
    E o ícone do carrinho deve estar visível

    Exemplos:
      | dispositivo |
      | mobile      |
      | tablet      |
      | desktop     |


  Esquema do Cenário: Menu lateral deve abrir e fechar corretamente em diferentes resoluções
    Dado que o usuário acessa a aplicação na resolução "<dispositivo>"
    E realiza login com usuário e senha válidos
    Quando abre o menu lateral
    Então o menu lateral deve ser exibido
    E a opção "All Items" deve estar visível
    E a opção "About" deve estar visível
    E a opção "Logout" deve estar visível
    Quando fecha o menu lateral
    Então o menu lateral não deve ser exibido

    Exemplos:
      | dispositivo |
      | mobile      |
      | tablet      |
      | desktop     |


  Esquema do Cenário: Carrinho deve ser acessível em diferentes resoluções
    Dado que o usuário acessa a aplicação na resolução "<dispositivo>"
    E realiza login com usuário e senha válidos
    Quando acessa o carrinho
    Então deve ser direcionado para a tela do carrinho
    E o botão de checkout deve estar visível
    E o botão de continuar comprando deve estar visível

    Exemplos:
      | dispositivo |
      | mobile      |
      | tablet      |
      | desktop     |
