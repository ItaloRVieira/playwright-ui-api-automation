# API Testing - Restful-Booker

## 1. Objetivo

Esta etapa teve como objetivo validar os principais fluxos da API **Restful-Booker**, contemplando autenticação, criação, consulta, atualização e exclusão de reservas.

A collection foi construída no Postman com validações de status code, schema, campos obrigatórios, mensagens de erro, tempo de resposta e controle de autenticação para operações protegidas.

---

## 2. Ferramentas utilizadas

| Ferramenta | Finalidade |
|---|---|
| Postman | Criação e execução da collection de API |
| JavaScript | Scripts de pré-requisição e validações |
| JSON Schema | Validação da estrutura das respostas |
| Restful-Booker | API utilizada no teste |
| Newman | Execução da collection via linha de comando, se necessário |

---

## 3. Collection de requests

A collection utilizada nos testes foi:

```text
Restful-Booker API Tests.postman_collection.json
```

A collection contempla os seguintes grupos de requests:

| Grupo | Quantidade |
|---|---:|
| Authentication | 8 |
| Create Booking | 6 |
| Get Booking Id | 5 |
| Get Booking | 4 |
| Update Booking | 7 |
| Partial Update Booking | 5 |
| Delete Booking | 5 |
| **Total** | **40 requests/cenários** |

---

# 4. Cenários testados

## 4.1 Fluxo de autenticação

Foram testados cenários de autenticação com credenciais válidas, inválidas, campos vazios e payload incompleto.

| ID | Método | Endpoint | Cenário | Resultado esperado | Status |
|---|---|---|---|---|---|
| API-AUTH-001 | POST | `/auth` | Credenciais válidas | Retornar status 200, token válido e schema correto | Automatizado |
| API-AUTH-002 | POST | `/auth` | Senha inválida | Retornar reason `Bad credentials` e não gerar token | Automatizado |
| API-AUTH-003 | POST | `/auth` | Nome inválido | Retornar reason `Bad credentials` e não gerar token | Automatizado |
| API-AUTH-004 | POST | `/auth` | Nome vazio | Retornar reason `Bad credentials` e não gerar token | Automatizado |
| API-AUTH-005 | POST | `/auth` | Senha vazia | Retornar reason `Bad credentials` e não gerar token | Automatizado |
| API-AUTH-006 | POST | `/auth` | Somente senha | Retornar reason `Bad credentials` e não gerar token | Automatizado |
| API-AUTH-007 | POST | `/auth` | Somente nome | Retornar reason `Bad credentials` e não gerar token | Automatizado |
| API-AUTH-008 | POST | `/auth` | Body vazio | Retornar reason `Bad credentials` e não gerar token | Automatizado |

---

## 4.2 Gestão de reservas - Criação

Foram testados cenários de criação de reserva com payload válido, dados inválidos e campos obrigatórios ausentes.

| ID | Método | Endpoint | Cenário | Resultado esperado | Status |
|---|---|---|---|---|---|
| API-CREATE-001 | POST | `/booking` | Criação com sucesso | Retornar status 200, `bookingid`, dados da reserva e schema válido | Automatizado |
| API-CREATE-002 | POST | `/booking` | Datas inválidas | Reserva não deve ser criada com datas inválidas | Automatizado |
| API-CREATE-003 | POST | `/booking` | Total price como string | Validar comportamento da API com tipo inválido no campo `totalprice` | Automatizado |
| API-CREATE-004 | POST | `/booking` | Lastname ausente | Reserva não deve ser criada sem sobrenome | Automatizado |
| API-CREATE-005 | POST | `/booking` | Firstname ausente | Reserva não deve ser criada sem nome | Automatizado |
| API-CREATE-006 | POST | `/booking` | Body vazio | Reserva não deve ser criada com payload vazio | Automatizado |

---

## 4.3 Filtros e buscas - Get Booking Id

Foram testadas consultas por filtros de nome, sobrenome, filtro inválido e busca sem filtros.

| ID | Método | Endpoint | Cenário | Resultado esperado | Status |
|---|---|---|---|---|---|
| API-GETID-001 | POST | `/booking` | Pré-requisito: criação de reserva | Criar reserva e armazenar `bookingId` | Automatizado |
| API-GETID-002 | GET | `/booking?firstname={{firstName}}` | Buscar por firstname válido | Retornar array com o `bookingId` criado | Automatizado |
| API-GETID-003 | GET | `/booking?lastname={{lastName}}` | Buscar por lastname válido | Retornar array com o `bookingId` criado | Automatizado |
| API-GETID-004 | GET | `/booking?lastname=invalido` | Buscar com filtro inválido | Retornar array vazio | Automatizado |
| API-GETID-005 | GET | `/booking` | Buscar sem filtro | Retornar array com reservas e campo `bookingid` | Automatizado |

---

## 4.4 Filtros e buscas - Get Booking

Foram testadas consultas de reserva por ID válido, ID inexistente e ID inválido.

| ID | Método | Endpoint | Cenário | Resultado esperado | Status |
|---|---|---|---|---|---|
| API-GET-001 | POST | `/booking` | Pré-requisito: criação de reserva | Criar reserva e armazenar `bookingId` | Automatizado |
| API-GET-002 | GET | `/booking/{{bookingId}}` | Buscar reserva com sucesso | Retornar status 200, dados da reserva e schema válido | Automatizado |
| API-GET-003 | GET | `/booking/99999999999` | Booking inexistente | Retornar status 404 e body não vazio | Automatizado |
| API-GET-004 | GET | `/booking/abc` | BookingId inválido | Retornar status 404 e body não vazio | Automatizado |

---

## 4.5 Gestão de reservas - Atualização completa

Foram testados cenários de atualização completa de reserva com token válido, payload inválido, ID inválido e ausência de token.

| ID | Método | Endpoint | Cenário | Resultado esperado | Status |
|---|---|---|---|---|---|
| API-PUT-001 | POST | `/auth` | Pré-requisito: autenticação | Gerar token e armazenar na variável `token` | Automatizado |
| API-PUT-002 | POST | `/booking` | Pré-requisito: criação de reserva | Criar reserva e armazenar `bookingId` | Automatizado |
| API-PUT-003 | PUT | `/booking/{{bookingId}}` | Atualização com sucesso | Retornar status 200 e dados atualizados corretamente | Automatizado |
| API-PUT-004 | PUT | `/booking/` | URL sem Booking ID | Retornar status 404 e body não vazio | Automatizado |
| API-PUT-005 | PUT | `/booking/{{bookingId}}` | Payload inválido | Retornar status 500, conforme comportamento atual da API | Automatizado |
| API-PUT-006 | PUT | `/booking/99999999999` | BookingId inválido | Retornar status 405 e mensagem `Method Not Allowed` | Automatizado |
| API-PUT-007 | PUT | `/booking/{{bookingId}}` | Sem token | Retornar status 403 | Automatizado |

---

## 4.6 Gestão de reservas - Atualização parcial

Foram testados cenários de atualização parcial com token válido, tentativa sem token e cenário nomeado como booking inexistente.

| ID | Método | Endpoint | Cenário | Resultado esperado | Status |
|---|---|---|---|---|---|
| API-PATCH-001 | POST | `/auth` | Pré-requisito: autenticação | Gerar token e armazenar na variável `token` | Automatizado |
| API-PATCH-002 | POST | `/booking` | Pré-requisito: criação de reserva | Criar reserva e armazenar `bookingId` | Automatizado |
| API-PATCH-003 | PATCH | `/booking/{{bookingId}}` | Alteração parcial com sucesso | Retornar status 200 e atualizar apenas os campos enviados | Automatizado |
| API-PATCH-004 | PATCH | `/booking/{{bookingId}}` | Booking inexistente | Validar comportamento definido na collection | Automatizado |
| API-PATCH-005 | PATCH | `/booking/{{bookingId}}` | Sem token | Retornar status 403 | Automatizado |

---

## 4.7 Gestão de reservas - Exclusão

Foram testados cenários de exclusão com sucesso, exclusão de reserva inexistente e exclusão sem token.

| ID | Método | Endpoint | Cenário | Resultado esperado | Status |
|---|---|---|---|---|---|
| API-DELETE-001 | POST | `/auth` | Pré-requisito: autenticação | Gerar token e armazenar na variável `token` | Automatizado |
| API-DELETE-002 | POST | `/booking` | Pré-requisito: criação de reserva | Criar reserva e armazenar `bookingId` | Automatizado |
| API-DELETE-003 | DELETE | `/booking/{{bookingId}}` | Delete Booking Sucesso | Retornar status 201 e body com `Created` | Automatizado |
| API-DELETE-004 | DELETE | `/booking/99999999999` | Booking inexistente | Retornar status 405 e mensagem `Method Not Allowed` | Automatizado |
| API-DELETE-005 | DELETE | `/booking/{{bookingId}}` | Sem token | Retornar status 403 e body com `Forbidden` | Automatizado |

---

# 5. Resultados dos testes

| Fluxo | Cenários | Resultado |
|---|---:|---|
| Autenticação | 8 | Automatizado |
| Criação de reservas | 6 | Automatizado |
| Busca de IDs de reserva | 5 | Automatizado |
| Consulta de reserva | 4 | Automatizado |
| Atualização completa | 7 | Automatizado |
| Atualização parcial | 5 | Automatizado |
| Exclusão de reserva | 5 | Automatizado |
| **Total** | **40** | **Requests/cenários mapeados e automatizados** |

---

# 6. Análise de bugs e inconsistências

| ID | Área | Descrição | Impacto |
|---|---|---|---|
| BUG-API-001 | Autenticação | Credenciais inválidas retornam status 200 em vez de 401 ou 400 | Médio |
| BUG-API-002 | Criação | API pode aceitar `totalprice` como string | Médio |
| BUG-API-003 | Criação | API deve validar corretamente campos obrigatórios ausentes | Alto |
| BUG-API-004 | Criação | Datas inválidas não devem permitir criação de reserva | Alto |
| BUG-API-005 | Atualização | Payload inválido retorna 500, mas o ideal seria 400 | Médio |
| BUG-API-006 | Atualização | Booking inexistente retorna 405, mas o ideal seria 404 | Médio |
| BUG-API-007 | Atualização parcial | Cenário de booking inexistente usa `{{bookingId}}`, podendo não testar um ID realmente inexistente | Alto |
| BUG-API-008 | Exclusão | Booking inexistente retorna 405, mas o ideal seria 404 | Médio |
| BUG-API-009 | Padronização | Alguns endpoints usam URL fixa em vez de `{{baseUrl}}` | Baixo |
| BUG-API-010 | Segurança | PUT, PATCH e DELETE devem bloquear corretamente requisições sem token | Alto |

---

# 7. Sugestões de melhorias

<!-- - Padronizar todos os endpoints utilizando `{{baseUrl}}` -->
- Ajustar o cenário de PATCH para booking inexistente usando um ID fixo inexistente.
- Criar testes para token inválido.
- Criar testes para token vazio.
- Criar testes para ausência do header `Content-Type`.
- Criar testes para payload com campos extras.
- Ampliar validações de schema para cenários de erro.
- Separar melhor os pré-requisitos de criação e autenticação.
- Incluir execução via Newman no pipeline.
- Gerar relatório HTML da execução da collection.
- Revisar expectativas de status code para erros de validação.

---

# 8. Análise de riscos

| ID | Risco | Impacto | Mitigação |
|---|---|---|---|
| RISCO-API-001 | API pública pode estar indisponível ou instável | Médio | Executar novamente e registrar evidências |
| RISCO-API-002 | Dependência da ordem de execução da collection | Alto | Garantir pré-requisitos e uso correto de variáveis |
| RISCO-API-003 | Massa criada pode interferir em buscas futuras | Médio | Gerar dados únicos por execução |
| RISCO-API-004 | Status codes inconsistentes podem mascarar bugs | Alto | Documentar comportamento atual e sugerir correção |
| RISCO-API-005 | Falha na autenticação bloqueia PUT, PATCH e DELETE | Alto | Validar autenticação antes dos fluxos protegidos |
| RISCO-API-006 | Uso de URL fixa dificulta execução em múltiplos ambientes | Baixo | Usar sempre `{{baseUrl}}` |
| RISCO-API-007 | Falta de relatório dificulta análise das falhas | Médio | Gerar evidências e relatório da execução |
| RISCO-API-008 | Validações de campos obrigatórios podem não estar cobertas em todos os endpoints | Médio | Ampliar cobertura negativa |

---

# 9. Variáveis de ambiente

As variáveis abaixo são utilizadas na collection para parametrização dos testes.

| Variável | Descrição | Exemplo |
|---|---|---|
| `baseUrl` | URL base da API | `https://restful-booker.herokuapp.com` |
| `username` | Usuário utilizado na autenticação | `admin` |
| `password` | Senha utilizada na autenticação | `password123` |
| `token` | Token retornado no fluxo de autenticação | Preenchido automaticamente |
| `bookingId` | ID da reserva criada durante os testes | Preenchido automaticamente |
| `firstName` | Nome utilizado na criação da reserva | `Italo` |
| `lastName` | Sobrenome utilizado na criação da reserva | `Vieira` |
| `totalPrice` | Valor total da reserva | `850` |
| `updatedFirstName` | Nome utilizado na atualização completa | `Italo Updated` |
| `updatedLastName` | Sobrenome utilizado na atualização completa | `Vieira Updated` |
| `updatedTotalPrice` | Valor utilizado na atualização completa | `1200` |
| `partialFirstName` | Nome utilizado na atualização parcial | Valor definido no script |

Exemplo de ambiente:

```json
{
  "baseUrl": "https://restful-booker.herokuapp.com",
  "username": "admin",
  "password": "password123",
  "token": "",
  "bookingId": "",
  "firstName": "Italo",
  "lastName": "Vieira",
  "totalPrice": "850",
  "updatedFirstName": "Italo Updated",
  "updatedLastName": "Vieira Updated",
  "updatedTotalPrice": "1200",
  "partialFirstName": ""
}
```

---

<!-- # 10. Evidências

As evidências dos testes de API devem ser salvas no repositório, preferencialmente em uma estrutura separada.

```text
evidencias/
└── api/
    ├── screenshots/
    └── reports/
``` -->

<!-- Exemplos de evidências esperadas:

- Print da execução da collection no Postman.
- Relatório gerado via Newman.
- Evidências dos testes com falha, quando existirem.
- Logs ou exportação dos resultados da execução.

--- -->

# 11. Conclusão

A etapa de API Testing contemplou os principais fluxos solicitados para a API Restful-Booker.

Foram cobertos os requisitos obrigatórios de autenticação básica, CRUD de reservas e validação de campos obrigatórios.

Também foram incluídos diferenciais como scripts automatizados na collection, validação de schema, controle de variáveis, validação de tempo de resposta e cenários negativos de segurança e tratamento de erro.