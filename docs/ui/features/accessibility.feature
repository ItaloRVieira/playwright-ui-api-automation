# language: pt

Funcionalidade: Acessibilidade
  Como usuário da aplicação
  Quero que as principais telas atendam critérios básicos de acessibilidade
  Para que o sistema seja mais inclusivo e utilizável


  Cenário: Validar acessibilidade da tela de login
    Dado que o usuário acessa a tela de login
    Quando executa a análise automática de acessibilidade
    Então não devem existir violações sérias ou críticas de acessibilidade


  Cenário: Validar acessibilidade da tela de produtos
    Dado que o usuário realiza login com usuário e senha válidos
    E acessa a tela de produtos
    Quando executa a análise automática de acessibilidade
    Então não devem existir violações sérias ou críticas de acessibilidade


  Cenário: Validar acessibilidade da tela do carrinho
    Dado que o usuário realiza login com usuário e senha válidos
    E adiciona um produto ao carrinho
    E acessa a tela do carrinho
    Quando executa a análise automática de acessibilidade
    Então não devem existir violações sérias ou críticas de acessibilidade


  Cenário: Validar acessibilidade da tela de informações do checkout
    Dado que o usuário realiza login com usuário e senha válidos
    E adiciona um produto ao carrinho
    E acessa a tela de informações do checkout
    Quando executa a análise automática de acessibilidade
    Então não devem existir violações sérias ou críticas de acessibilidade


  Cenário: Validar acessibilidade da tela de resumo do checkout
    Dado que o usuário realiza login com usuário e senha válidos
    E adiciona um produto ao carrinho
    E preenche as informações do checkout
    E acessa a tela de resumo da compra
    Quando executa a análise automática de acessibilidade
    Então não devem existir violações sérias ou críticas de acessibilidade


  Cenário: Validar acessibilidade da tela de confirmação da compra
    Dado que o usuário realiza login com usuário e senha válidos
    E adiciona um produto ao carrinho
    E finaliza o fluxo de compra
    Quando executa a análise automática de acessibilidade
    Então não devem existir violações sérias ou críticas de acessibilidade
