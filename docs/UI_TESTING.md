# UI Testing - Sauce Demo

## 1. Objetivo

Esta etapa teve como objetivo validar os principais fluxos funcionais da aplicação **Sauce Demo**, garantindo que o usuário consiga autenticar, visualizar produtos, manipular o carrinho, concluir uma compra, navegar entre páginas e realizar logout.

Também foram incluídos cenários diferenciais de **responsividade**, **acessibilidade** e **automação dos testes**.

---

## 2. Ferramentas utilizadas

| Ferramenta | Finalidade |
|---|---|
| Playwright | Automação dos testes de interface |
| Cucumber / BDD | Escrita dos cenários em Gherkin |
| TypeScript | Linguagem utilizada no projeto |
| Axe Core | Validação automatizada de acessibilidade |
| Node.js / NPM | Execução e gerenciamento de dependências |

---

## 3. Escopo dos testes

| Funcionalidade | Arquivo | Quantidade |
|---|---|---:|
| Autenticação | `login.feature` | 14 |
| Carrinho | `cart.feature` | 8 |
| Checkout | `checkout.feature` | 1 |
| Logout | `logout.feature` | 2 |
| Navegação | `navigation.feature` | 5 |
| Ordenação de produtos | `sorting.feature` | 6 |
| Responsividade | `responsiveness.feature` | 12 |
| Acessibilidade | `accessibility.feature` | 6 |
| **Total** |  | **54 cenários** |

---

# 4. Cenários testados

## 4.1 Fluxo de autenticação

Foram validados cenários de login com diferentes tipos de usuários, credenciais inválidas, campos obrigatórios, caracteres especiais e tentativa de SQL Injection.

| ID | Cenário | Resultado esperado | Status |
|---|---|---|---|
| UI-AUTH-001 | Login com usuário válido | Acesso à tela de produtos | Automatizado |
| UI-AUTH-002 | Login com usuário bloqueado | Mensagem de usuário bloqueado | Automatizado |
| UI-AUTH-003 | Usuário inválido | Mensagem de credenciais inválidas | Automatizado |
| UI-AUTH-004 | Senha inválida | Mensagem de credenciais inválidas | Automatizado |
| UI-AUTH-005 | Usuário e senha inválidos | Mensagem de credenciais inválidas | Automatizado |
| UI-AUTH-006 | Campos vazios | Mensagem de usuário obrigatório | Automatizado |
| UI-AUTH-007 | Usuário vazio | Mensagem de usuário obrigatório | Automatizado |
| UI-AUTH-008 | Senha vazia | Mensagem de senha obrigatória | Automatizado |
| UI-AUTH-009 | SQL Injection | Login não deve ser permitido | Automatizado |
| UI-AUTH-010 | Caracteres especiais | Login não deve ser permitido | Automatizado |
| UI-AUTH-011 | Login com `problem_user` | Acesso à tela de produtos | Automatizado |
| UI-AUTH-012 | Login com `performance_glitch_user` | Acesso à tela de produtos | Automatizado |
| UI-AUTH-013 | Fechar mensagem de erro | Erro não deve permanecer visível | Automatizado |
| UI-AUTH-014 | Elementos da tela de login | Campos e botão devem estar visíveis | Automatizado |

---

## 4.2 Gerenciamento de produtos

Foram validadas a listagem e a ordenação dos produtos disponíveis.

| ID | Cenário | Resultado esperado | Status |
|---|---|---|---|
| UI-PROD-001 | Ordenação padrão | Produtos em ordem A-Z | Automatizado |
| UI-PROD-002 | Ordenar A-Z | Ordem alfabética crescente | Automatizado |
| UI-PROD-003 | Ordenar Z-A | Ordem alfabética decrescente | Automatizado |
| UI-PROD-004 | Ordenar menor preço | Preços em ordem crescente | Automatizado |
| UI-PROD-005 | Ordenar maior preço | Preços em ordem decrescente | Automatizado |
| UI-PROD-006 | Quantidade após ordenação | Quantidade deve permanecer 6 | Automatizado |

---

## 4.3 Gestão do carrinho

Foram validadas as ações de adicionar, remover e consultar produtos no carrinho, além da persistência após navegação e reload.

| ID | Cenário | Resultado esperado | Status |
|---|---|---|---|
| UI-CART-001 | Adicionar produto | Badge do carrinho deve exibir 1 item | Automatizado |
| UI-CART-002 | Produto no carrinho | Produto correto deve ser exibido | Automatizado |
| UI-CART-003 | Preço do produto | Preço deve corresponder ao produto selecionado | Automatizado |
| UI-CART-004 | Remover produto | Produto deve ser removido | Automatizado |
| UI-CART-005 | Carrinho vazio | Nenhum item deve ser exibido | Automatizado |
| UI-CART-006 | Múltiplos produtos | Carrinho deve exibir todos os itens adicionados | Automatizado |
| UI-CART-007 | Persistência após reload | Produto deve permanecer no carrinho | Automatizado |
| UI-CART-008 | Persistência após navegação | Produto deve continuar disponível | Automatizado |

---

## 4.4 Processo de checkout

Foi validado o fluxo completo de compra com usuário autenticado e produto no carrinho.

| ID | Cenário | Resultado esperado | Status |
|---|---|---|---|
| UI-CHECKOUT-001 | Finalizar compra com sucesso | Exibir mensagem `Thank you for your order!` | Automatizado |

---

## 4.5 Navegação e logout

Foram validadas as principais ações de navegação do site, incluindo carrinho, menu lateral, página About e encerramento da sessão.

| ID | Cenário | Resultado esperado | Status |
|---|---|---|---|
| UI-NAV-001 | Acessar carrinho | Página do carrinho deve ser exibida | Automatizado |
| UI-NAV-002 | Voltar para produtos | Lista de produtos deve ser exibida | Automatizado |
| UI-NAV-003 | Abrir menu lateral | Opções do menu devem aparecer | Automatizado |
| UI-NAV-004 | Fechar menu lateral | Menu não deve permanecer visível | Automatizado |
| UI-NAV-005 | Acessar About | Redirecionamento para Sauce Labs | Automatizado |
| UI-LOGOUT-001 | Logout com sucesso | Retorno para tela de login | Automatizado |
| UI-LOGOUT-002 | Acesso após logout | Usuário deve ser redirecionado ao login | Automatizado |

---

## 4.6 Responsividade

Foram testados os principais fluxos em resoluções representando mobile, tablet e desktop.

| ID | Cenário | Dispositivo | Resultado esperado | Status |
|---|---|---|---|---|
| UI-RESP-001 | Login responsivo | Mobile | Campos e botão visíveis | Automatizado |
| UI-RESP-002 | Login responsivo | Tablet | Campos e botão visíveis | Automatizado |
| UI-RESP-003 | Login responsivo | Desktop | Campos e botão visíveis | Automatizado |
| UI-RESP-004 | Produtos responsivo | Mobile | Lista, filtro e carrinho visíveis | Automatizado |
| UI-RESP-005 | Produtos responsivo | Tablet | Lista, filtro e carrinho visíveis | Automatizado |
| UI-RESP-006 | Produtos responsivo | Desktop | Lista, filtro e carrinho visíveis | Automatizado |
| UI-RESP-007 | Menu responsivo | Mobile | Menu deve abrir e fechar | Automatizado |
| UI-RESP-008 | Menu responsivo | Tablet | Menu deve abrir e fechar | Automatizado |
| UI-RESP-009 | Menu responsivo | Desktop | Menu deve abrir e fechar | Automatizado |
| UI-RESP-010 | Carrinho responsivo | Mobile | Botões e itens visíveis | Automatizado |
| UI-RESP-011 | Carrinho responsivo | Tablet | Botões e itens visíveis | Automatizado |
| UI-RESP-012 | Carrinho responsivo | Desktop | Botões e itens visíveis | Automatizado |

---

## 4.7 Acessibilidade

Foram executadas validações automatizadas para identificar violações sérias ou críticas nas principais telas.

| ID | Cenário | Resultado esperado | Status |
|---|---|---|---|
| UI-A11Y-001 | Tela de login | Sem violações sérias ou críticas | Automatizado |
| UI-A11Y-002 | Tela de produtos | Sem violações sérias ou críticas | Automatizado |
| UI-A11Y-003 | Tela do carrinho | Sem violações sérias ou críticas | Automatizado |
| UI-A11Y-004 | Informações do checkout | Sem violações sérias ou críticas | Automatizado |
| UI-A11Y-005 | Resumo do checkout | Sem violações sérias ou críticas | Automatizado |
| UI-A11Y-006 | Confirmação da compra | Sem violações sérias ou críticas | Automatizado |

---

# 5. Resultados dos testes

| Funcionalidade | Cenários | Resultado |
|---|---:|---|
| Autenticação | 14 | Automatizado |
| Produtos | 6 | Automatizado |
| Carrinho | 8 | Automatizado |
| Checkout | 1 | Automatizado |
| Navegação e logout | 7 | Automatizado |
| Responsividade | 12 | Automatizado |
| Acessibilidade | 6 | Automatizado |
| **Total** | **54** | **Cenários mapeados e automatizados** |

---

# 6. Bugs e pontos de atenção

| ID | Área | Descrição | Impacto |
|---|---|---|---|
| BUG-UI-001 | Login | Usuário bloqueado deve permanecer sem acesso às áreas internas | Alto |
| BUG-UI-002 | Login | Entradas inválidas devem exibir mensagens consistentes | Médio |
| BUG-UI-003 | Segurança | SQL Injection e caracteres especiais não devem permitir autenticação | Alto |
| BUG-UI-004 | Produtos | Ordenação não deve alterar a quantidade de itens exibidos | Médio |
| BUG-UI-005 | Carrinho | Badge deve refletir corretamente a quantidade de produtos | Alto |
| BUG-UI-006 | Carrinho | Produtos removidos não devem permanecer no carrinho | Alto |
| BUG-UI-007 | Checkout | Fluxo possui apenas cenário positivo | Médio |
| BUG-UI-008 | Logout | Rotas internas não devem ser acessadas após logout | Alto |
| BUG-UI-009 | Responsividade | Elementos principais devem permanecer visíveis em telas menores | Médio |
| BUG-UI-010 | Acessibilidade | Violações sérias ou críticas devem ser tratadas | Alto |

---

# 7. Sugestões de melhorias

- Adicionar cenários negativos no checkout.
- Validar subtotal, taxa e total final da compra.
- Testar a opção `Reset App State`.
- Ampliar validações de acesso direto a rotas internas.
- Gerar relatório HTML com screenshots e vídeos.
- Separar a execução em suítes de smoke, regressão, responsividade e acessibilidade.
- Manter uso de seletores estáveis, como `data-test`.

---

# 8. Análise de riscos

| ID | Risco | Impacto | Mitigação |
|---|---|---|---|
| RISCO-UI-001 | Falha no login bloqueia fluxos dependentes | Alto | Isolar cenários e manter massa válida |
| RISCO-UI-002 | Estado do carrinho pode afetar testes | Alto | Limpar estado antes de cada cenário |
| RISCO-UI-003 | Lentidão do usuário de performance pode gerar timeout | Médio | Ajustar timeout e isolar cenário |
| RISCO-UI-004 | Alterações no layout podem quebrar testes | Médio | Utilizar Page Objects e seletores estáveis |
| RISCO-UI-005 | Falhas de acessibilidade podem não ser percebidas manualmente | Alto | Manter suíte automatizada com Axe Core |
| RISCO-UI-006 | Ausência de evidências pode dificultar análise | Médio | Armazenar screenshots, vídeos e relatórios |

---

<!-- # 9. Evidências

As evidências dos testes devem ser salvas no repositório, seguindo uma estrutura simples:

```text
test-results/
└── ui/
    ├── screenshots/
    ├── videos/
    └── reports/
```

--- -->

# 10. Conclusão

A etapa de UI Testing contemplou os principais fluxos solicitados para a aplicação Sauce Demo, cobrindo autenticação, produtos, carrinho, checkout, navegação e logout.

Também foram adicionados diferenciais de responsividade, acessibilidade e automação, totalizando **54 cenários mapeados**.