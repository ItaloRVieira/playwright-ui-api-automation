# Bugs e Melhorias

## 1. Objetivo

Este documento consolida os bugs, inconsistências, pontos de atenção e sugestões de melhorias identificados durante a execução dos testes de **UI Testing** na aplicação Sauce Demo e **API Testing** na API Restful-Booker.

A análise foi feita com base nos resultados reais das execuções automatizadas.

---

# 2. Resumo da execução

## 2.1 UI Testing

| Métrica | Resultado |
|---|---:|
| Total de testes executados | 54 |
| Testes com sucesso | 53 |
| Testes com falha | 1 |

A falha identificada ocorreu no cenário de acessibilidade da tela de produtos.

---

## 2.2 API Testing

| Métrica | Resultado |
|---|---:|
| Requests executadas | 40 |
| Requests com falha | 0 |
| Assertions executadas | 225 |
| Assertions com falha | 4 |
| Tempo médio de resposta | 222ms |
| Maior tempo de resposta | 1783ms |

As falhas ocorreram em validações de tempo de resposta, criação com datas inválidas e busca por bookingId criado.

---

# 3. Bugs e pontos de atenção - UI Testing

## BUG-UI-001 - Select de ordenação sem nome acessível

| Campo | Informação |
|---|---|
| Funcionalidade | Acessibilidade |
| Cenário | Validar acessibilidade da tela de produtos |
| Severidade | Crítica |
| Status | Identificado na execução |
| Ferramenta | Axe Core + Playwright |

### Descrição

Foi identificada uma violação crítica de acessibilidade no componente de ordenação dos produtos.

O elemento `<select>` responsável pela ordenação dos produtos não possui um nome acessível. Isso significa que tecnologias assistivas, como leitores de tela, podem não conseguir informar corretamente ao usuário qual é a finalidade do campo.

### Elemento impactado

```html
<select class="product_sort_container" data-test="product-sort-container">
  <option value="az">Name (A to Z)</option>
  <option value="za">Name (Z to A)</option>
  <option value="lohi">Price (low to high)</option>
  <option value="hilo">Price (high to low)</option>
</select>
```

### Regra violada

```text
select-name
```

### Mensagem retornada

```text
Select element must have an accessible name
```

### Impacto

Usuários que dependem de leitores de tela podem não compreender a função do campo de ordenação, prejudicando a navegação e a usabilidade da aplicação.

### Sugestão de correção

Adicionar um nome acessível ao componente usando um `<label>` associado ao campo ou utilizando `aria-label`.

Exemplo:

```html
<select
  class="product_sort_container"
  data-test="product-sort-container"
  aria-label="Ordenar produtos"
>
  <option value="az">Name (A to Z)</option>
  <option value="za">Name (Z to A)</option>
  <option value="lohi">Price (low to high)</option>
  <option value="hilo">Price (high to low)</option>
</select>
```

---

## BUG-UI-002 - Fluxo de checkout possui apenas cenário positivo

| Campo | Informação |
|---|---|
| Funcionalidade | Checkout |
| Severidade | Média |
| Status | Ponto de melhoria |

### Descrição

O fluxo de checkout foi validado com sucesso no caminho feliz, porém ainda não existem cenários negativos para campos obrigatórios ou dados inválidos.

### Impacto

Falhas de validação no formulário de checkout podem passar despercebidas.

### Sugestão de melhoria

Adicionar cenários para:

- Nome vazio.
- Sobrenome vazio.
- CEP vazio.
- CEP inválido.
- Cancelamento do checkout.
- Validação do subtotal, taxa e total final.

---

## BUG-UI-003 - Usuário de performance pode gerar lentidão

| Campo | Informação |
|---|---|
| Funcionalidade | Login |
| Severidade | Baixa |
| Status | Ponto de atenção |

### Descrição

O cenário com o usuário `performance_glitch_user` passou, mas apresentou tempo de execução maior que os demais testes de login.

### Impacto

Pode gerar instabilidade em ambientes de CI/CD caso os timeouts estejam muito baixos.

### Sugestão de melhoria

Manter esse cenário separado dos testes críticos ou configurar timeout adequado para ele.

---

# 4. Bugs e pontos de atenção - API Testing

## BUG-API-001 - Tempo de resposta acima do limite definido

| Campo | Informação |
|---|---|
| Funcionalidade | Authentication |
| Request | Credenciais válidas |
| Severidade | Média |
| Status | Identificado na execução |

### Descrição

A request de autenticação com credenciais válidas retornou status 200 e gerou o token corretamente, porém ultrapassou o limite definido no teste.

### Resultado obtido

```text
Tempo obtido: 1783ms
Tempo esperado: menor que 1000ms
```

### Impacto

Apesar de funcionalmente correta, a API apresentou tempo de resposta acima do critério definido, podendo indicar instabilidade momentânea ou limite muito restritivo para ambiente público.

### Sugestão de melhoria

Avaliar uma das opções:

- Aumentar o limite para um valor mais realista, como 2000ms.
- Manter 1000ms como critério de performance e registrar a falha como ponto de atenção.
- Executar a medição em mais de uma rodada para evitar falso negativo por oscilação.

---

## BUG-API-002 - API aceita criação de reserva com datas inválidas

| Campo | Informação |
|---|---|
| Funcionalidade | Create Booking |
| Request | Datas inválidas |
| Severidade | Alta |
| Status | Identificado na execução |

### Descrição

Foi enviada uma reserva com datas inválidas:

```json
{
  "bookingdates": {
    "checkin": "invalid-date",
    "checkout": "invalid-date"
  }
}
```

O teste esperava que a reserva não fosse criada, porém a API retornou status 200.

### Resultado obtido

```text
Status obtido: 200
Resultado esperado: diferente de 200
```

### Impacto

A API permite criação de reservas com datas inválidas, podendo gerar dados inconsistentes no sistema.

### Sugestão de correção

A API deveria validar o formato das datas e retornar erro de validação, como:

```text
400 Bad Request
```

Também é recomendado validar:

- Formato da data.
- Data de checkin anterior à data de checkout.
- Campos obrigatórios dentro de `bookingdates`.

---

## BUG-API-003 - Busca por firstname não garante retorno do bookingId criado

| Campo | Informação |
|---|---|
| Funcionalidade | Get Booking Id |
| Request | Buscar por firstname válido |
| Severidade | Média |
| Status | Identificado na execução |

### Descrição

A busca por `firstname` retornou uma lista de reservas, porém o primeiro item da lista não correspondeu ao `bookingId` criado no pré-requisito.

### Resultado obtido

```text
BookingId retornado no primeiro item: 1590
BookingId esperado: 1604
```

### Impacto

O teste assume que o primeiro item retornado será sempre a reserva criada na execução atual. Porém, como a API pode retornar várias reservas com o mesmo firstname, essa validação pode gerar falso negativo.

### Sugestão de melhoria no teste

Em vez de validar apenas `response[0].bookingid`, validar se algum item da lista contém o `bookingId` criado.

Exemplo:

```javascript
pm.test('Response contains created bookingId', () => {
  const bookingId = Number(pm.collectionVariables.get('bookingId'));
  const ids = response.map(item => item.bookingid);
  pm.expect(ids).to.include(bookingId);
});
```

---

## BUG-API-004 - Busca por lastname não garante retorno do bookingId criado

| Campo | Informação |
|---|---|
| Funcionalidade | Get Booking Id |
| Request | Buscar por lastname válido |
| Severidade | Média |
| Status | Identificado na execução |

### Descrição

A busca por `lastname` apresentou o mesmo problema da busca por `firstname`: o primeiro item retornado não foi a reserva criada no pré-requisito.

### Resultado obtido

```text
BookingId retornado no primeiro item: 1590
BookingId esperado: 1604
```

### Impacto

A validação está sensível à ordenação da resposta da API, podendo falhar mesmo quando a reserva criada está presente em outra posição do array.

### Sugestão de melhoria no teste

Substituir a validação direta do primeiro item por uma busca no array completo:

```javascript
pm.test('Response contains created bookingId', () => {
  const bookingId = Number(pm.collectionVariables.get('bookingId'));
  const ids = response.map(item => item.bookingid);
  pm.expect(ids).to.include(bookingId);
});
```

---

## BUG-API-005 - API retorna 500 para campos obrigatórios ausentes

| Campo | Informação |
|---|---|
| Funcionalidade | Create Booking |
| Requests | Lastname ausente, Firstname ausente e Body vazio |
| Severidade | Média |
| Status | Ponto de atenção |

### Descrição

Ao enviar payloads com campos obrigatórios ausentes ou body vazio, a API retornou `500 Internal Server Error`.

### Impacto

O erro 500 indica falha interna no servidor. Para erro de validação enviado pelo cliente, o ideal seria retornar um erro controlado, como `400 Bad Request`.

### Sugestão de correção

Padronizar o tratamento de erro para payloads inválidos com status `400 Bad Request` e mensagem clara sobre o campo ausente.

---

## BUG-API-006 - Payload inválido no PUT retorna 500

| Campo | Informação |
|---|---|
| Funcionalidade | Update Booking |
| Request | Payload inválido |
| Severidade | Média |
| Status | Ponto de atenção |

### Descrição

A API retornou `500 Internal Server Error` ao receber payload inválido na atualização completa.

### Impacto

O comportamento indica ausência de tratamento adequado para erro de contrato ou validação.

### Sugestão de correção

Retornar status adequado para erro de cliente, como `400 Bad Request`, e informar quais campos estão inválidos.

---

## BUG-API-007 - Booking inexistente retorna 405 em alguns fluxos

| Campo | Informação |
|---|---|
| Funcionalidade | Update/Delete Booking |
| Requests | BookingId inválido / Booking inexistente |
| Severidade | Média |
| Status | Ponto de atenção |

### Descrição

Em alguns fluxos, como PUT e DELETE para booking inexistente, a API retornou `405 Method Not Allowed`.

Para recurso inexistente, o status mais esperado seria `404 Not Found`.

### Impacto

O retorno 405 pode dificultar a interpretação correta do erro por consumidores da API.

### Sugestão de melhoria

Padronizar o retorno de recursos inexistentes para `404 Not Found`.

---

## BUG-API-008 - Cenário de PATCH nomeado como booking inexistente não usa ID inexistente

| Campo | Informação |
|---|---|
| Funcionalidade | Partial Update Booking |
| Request | Booking inexistente |
| Severidade | Alta |
| Status | Ponto de melhoria do teste |

### Descrição

O cenário está nomeado como `Booking inexistente`, porém utiliza `{{bookingId}}`, que foi criado previamente no pré-requisito.

### Impacto

O teste não valida de fato o comportamento da API para um booking inexistente.

### Sugestão de melhoria no teste

Alterar a URL para um ID fixo inexistente:

```text
{{baseUrl}}/booking/99999999999
```

E ajustar o resultado esperado para o comportamento adequado da API.

---

# 5. Melhorias recomendadas - UI

| ID | Melhoria | Prioridade |
|---|---|---|
| MELHORIA-UI-001 | Adicionar nome acessível ao select de ordenação | Alta |
| MELHORIA-UI-002 | Incluir cenários negativos no checkout | Alta |
| MELHORIA-UI-003 | Validar subtotal, taxa e total final da compra | Média |
| MELHORIA-UI-004 | Validar navegação por teclado nos principais fluxos | Média |
| MELHORIA-UI-005 | Manter evidências de screenshot, vídeo e trace para falhas | Média |
| MELHORIA-UI-006 | Separar testes de acessibilidade em suíte própria | Baixa |

---

# 6. Melhorias recomendadas - API

| ID | Melhoria | Prioridade |
|---|---|---|
| MELHORIA-API-001 | Ajustar validação de busca para procurar `bookingId` no array completo | Alta |
| MELHORIA-API-002 | Revisar regra de criação com datas inválidas | Alta |
| MELHORIA-API-003 | Revisar status code para payloads inválidos | Média |
| MELHORIA-API-004 | Ajustar cenário de PATCH para booking inexistente | Alta |
| MELHORIA-API-005 | Criar testes para token inválido e token vazio | Média |
| MELHORIA-API-006 | Usar dados dinâmicos para firstname e lastname | Média |
| MELHORIA-API-007 | Avaliar limite de tempo de resposta para API pública | Média |
| MELHORIA-API-008 | Padronizar todos os endpoints com `{{baseUrl}}` | Baixa |

---

# 7. Priorização

| Prioridade | Itens |
|---|---|
| Alta | Correção da acessibilidade no select, validação de datas inválidas, ajuste dos testes de busca por bookingId e correção do cenário PATCH inexistente |
| Média | Revisão de status codes, cobertura negativa no checkout, testes com token inválido e melhoria dos critérios de performance |
| Baixa | Padronização de nomes, organização da collection e refinamento das evidências |

---

# 8. Conclusão

A execução dos testes demonstrou boa cobertura dos fluxos principais, com a maior parte dos cenários de UI passando com sucesso e a collection de API executando todas as requests.

Os principais pontos identificados foram:

- Uma falha crítica de acessibilidade na tela de produtos.
- Criação de reserva com datas inválidas sendo aceita pela API.
- Testes de busca por `firstname` e `lastname` sensíveis à ordenação da resposta.
- Tempo de resposta acima do limite definido no fluxo de autenticação.
- Alguns retornos da API com status codes tecnicamente pouco adequados.

As melhorias propostas ajudam a aumentar a confiabilidade dos testes, reduzir falsos negativos e melhorar a qualidade da aplicação testada.
