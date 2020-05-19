# Endpoints da API

Este documento descreve os endpoints da API, agrupados por elementos principais da API.

## Autenticação

Os endpoints permitem autenticar e atualizar o token.

* `POST /api/token-auth/`
* `POST /api/token-refresh/`

### `POST /api/token-auth/`

Realiza a autenticação do usuário conforme as credenciais, que são informadas no corpo da requisição representando um objeto com os atributos:

| atributo   | tipo   | detalhes           |
| :--------- | :----- | :----------------- |
| `username` | string | o nome do usuário  |
| `password` | string | a senha do usuário |

**Exemplo:**

```json
{
    "username": "admin",
    "password": "admin123"
}
```

O retorno é um objeto que contém o atributo `token` (string), o qual representa o token gerado no padrão JWT que contém informações do usuário da requisição e permite autorizar requisições subsequentes.

Códigos de retorno:

* **200**: ok
* **403**: credenciais incorretas

## User

**Base da URL: `/api/users/`.**

Utiliza a view `UserViewSet` e o serializer `UserSerializer`.

Só pode ser acessada por uma requisição autenticada (com informações do usuário da requisição).

Os endpoints permitem consultar, cadastrar, excluir e editar informações de usuários do sistema: 

* `GET /api/users/`
* `GET /api/users/:id/`
* `POST /api/users/`
* `PUT /api/users/:id/`
* `PATCH /api/users/:id/`
* `DELETE /api/users/:id/`

O objeto que representa as informações de usuário contém os atributos:

| atributo   |  tipo   | detalhes                                                                     |
| :--------- | :-----: | :--------------------------------------------------------------------------- |
| `id`       | integer | identificador do usuário                                                     |
| `username` | string  | obrigatório; 150 caracteres ou menos; letras, números e @/./+/-/_ apenas     |
| `email`    | string  | precisa ser um endereço de e-mmail válido; 254 caracteres ou menos           |
| `groups`   |  array  | os grupos do usuário, na forma de um array com os identificadores dos grupos |

**Exemplo:**

```json
{
    "id": 1,
    "username": "admin",
    "email": "admin@gmail.com",
    "groups": [
        1
    ]
}
```

### `GET /api/users/`

Retorna os usuários cadastrados. A estrutura do retorno segue a definição-padrão de resultados paginados do djangorestframework: um objeto com os atributos:

| atributo   | tipo    | descrição                                                        |
| :--------- | :------ | :--------------------------------------------------------------- |
| `count`    | integer | indica a quantidade de usuários cadastrados                      |
| `next`     | string  | indica a URL para requisição da próxima página dos resultados    |
| `previous` | string  | indica a URL para a requisição da página anterior dos resultados |
| `results`  | array   | um array contendo os dados dos usuários                          |

**Exemplo:**

```json
{
    "count": 2,
    "next": null,
    "previous": null,
    "results": [
    ]
}
```

Códigos de retorno:

* **200**: ok

### `GET /api/users/:id/`

Retorna os dados de um usuário específico, com base no parâmetro de rota `id`, que representa o identificador do usuário.

**Exemplo:**

```json
{
    "id": 1,
    "username": "admin",
    "email": "admin@gmail.com",
    "groups": [
        1
    ]
}
```

Códigos de retorno:

* **200**: ok
* **404**: usuário não encontrado

### `POST /api/users/`

Cadastra um usuário. Os dados da requisição devem representar um objeto com os atributos:

| atributo   | requerido |
| :--------- | :-------: |
| `username` |    sim    |
| `email`    |    sim    |
| `groups`   |    não    |

**Exemplo:**

```json
{
    "username": "admin",
    "email": "admin@gmail.com",
    "groups": []
}
```

Códigos de retorno:

* **201**: usuário cadastrado
* **400**: erro na requisição; geralmente ocorre quando um dado não está de acordo com o esperado, como quando a requisição envia um nome de usuário (username) que já está cadastrado. Neste caso, o conteúdo do retorno contém um objeto que descreve o erro encontrado e contém um atributo conforme o nome do campo onde ocorreu erro e seu valor é um array de string com mensagem descritiva do erro
* **500**: erro na requisição correspondendo a um erro de execução no servidor; o retorno é um objeto com o atributo `detail`, que descreve o erro

### `PUT /api/users/:id/`

Atualiza os dados de um usuário específico, com base no parâmetro de rota `id`, que representa o identificador do usuário. Os dados da requisição devem representar um objeto com os atributos:

| atributo   | requerido | somente leitura |
| :--------- | :-------: | :-------------: |
| `id`       |    não    |       sim       |
| `username` |    sim    |       não       |
| `email`    |    não    |       não       |
| `groups`   |    não    |       não       |

Códigos de retorno:

* **200**: usuário atualizado
* **400**: erro na requisição; geralmente ocorre quando um dado não está de acordo com o esperado, como quando a requisição envia um nome de usuário (username) que já está cadastrado. Neste caso, o conteúdo do retorno contém um objeto que descreve o erro encontrado e contém um atributo conforme o nome do campo onde ocorreu erro e seu valor é um array de string com mensagem descritiva do erro
* **500**: erro na requisição correspondendo a um erro de execução no servidor; o retorno é um objeto com o atributo `detail`, que descreve o erro

### `PATCH /api/users/:id`

Atualiza os dados de um usuário específico, com base no parâmetro de rota `id`, que representa o identificador do usuário. Opera de forma semelhante ao endpoint `PUT /api/users/:id`, com a diferença de que os dados da requisição não precisam conter todos os atributos para serem atualizados. Geralmente é utilizado para atualizar apenas uma parte do objeto.

## Group

**Base da URL: `/api/groups/`.**

Utiliza a view `GroupViewSet` e o serializer `GroupSerializer`.

Só pode ser acessada por uma requisição autenticada (com informações do usuário da requisição).

Os endpoints permitem consultar, cadastrar, excluir e editar informações de grupos de usuários do sistema: 

* `GET /api/groups/`
* `GET /api/groups/:id/`
* `POST /api/groups/`
* `PUT /api/groups/:id/`
* `PATCH /api/groups/:id/`
* `DELETE /api/groups/:id/`

O objeto que representa as informações de usuário contém os atributos:

| atributo |  tipo   | detalhes                             |
| :------- | :-----: | :----------------------------------- |
| `id`     | integer | identificador do grupo               |
| `name`   | string  | obrigatório; 150 caracteres ou menos |

**Exemplo:**

```json
{
    "id": 1,
    "name": "Administradores"
}
```

## Perfil logado

**Base da URL: `/api/perfil-logado/`.**

Utiliza a view `PerfilLogadoViewSet` e o serializer `PerfilSerializer`.

Só pode ser acessada por uma requisição autenticada (com informações do usuário da requisição).

O endpoint permite consultar informações do perfil do usuário da requisição.

O objeto que representa as informações do perfil contém os atributos:

| atributo        |   tipo   | detalhes                                               |
| :-------------- | :------: | :----------------------------------------------------- |
| `id`            | integer  | identificador do perfil                                |
| `cadatrado_em`  | datetime | data de criação do registro                            |
| `atualizado_em` | datetime | data de atualização do registro                        |
| `usuario`       | integer  | obrigatório; identificador do usuário que tem o perfil |
| `nome`          |  string  | obrigatório; 128 caracteres ou menos                   |
| `sexo`          |  string  | um caractere: 'F' ou 'M'                               |
| `cpf`           |  string  | 14 carateres ou menos; não pode repetir                |
| `telefone`      |  string  | 15 caracteres ou menos                                 |
| `endereco`      |  string  | 512 caracteres ou menos                                |
| `estado_uf`     |  string  | 2 caracteres                                           |
| `cidade`        |  string  | 64 caracteres ou menos                                 |
| `cep`           |  string  | 10 caracteres ou menos                                 |


**Exemplo:**

```json
{
    "id": 1,
    "cadastrado_em": "2020-05-14T15:47:14.792525-03:00",
    "atualizado_em": "2020-05-14T16:09:20.083284-03:00",
    "usuario": 2,
    "nome": "José S. da Silva",
    "sexo": "M",
    "cpf": "032.964.254-54",
    "telefone": "(63) 98432-0123",
    "endereco": "Quadra 204 Sul, Alameda 2",
    "estado_uf": "TO",
    "cidade": "Palmas",
    "cep": "77.000-00"
}
```

Códigos de retorno:

* **200**: ok
* **404**: usuário não possui perfil

## Perfis

**Base da URL: `/api/perfis/`.**

Utiliza a view `PerfilViewSet` e o serializer `PerfilSerializer`.

Só pode ser acessada por uma requisição autenticada (com informações do usuário da requisição).

Os endpoints permitem consultar, cadastrar, editar e excluir informações de perfis de usuários: 

* `GET /api/perfis/`
* `GET /api/perfis/:id/`
* `POST /api/perfis/`
* `PUT /api/perfis/:id/`
* `PATCH /api/perfis/:id/`
* `DELETE /api/perfis/:id/`
