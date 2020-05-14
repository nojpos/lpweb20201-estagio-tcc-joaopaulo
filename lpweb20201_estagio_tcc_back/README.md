# Gerenciador de Estágio e TCC (backend)

---

Este software fornece as funcionalidades de backend para um software gerenciador de atividades de Estágio e TCC.

## Dependências

A arquitetura e a estrutura deste software dependem dos seguintes pacotes:

* django
* djangorestframework

Essas dependências também estão descritas, com suas versões específicas, no arquivo `requirements.txt`, que pode ser utilizado para você criar seu ambiente de desenvolvimento ou de produção.

## Criar o ambiente de desenvolvimento

Para criar o ambiente de desenvolvimento, crie um ambiente virtual do python e, depois, instale as dependências descritas no arquivo `requirements.txt`.

Na sequência, como este é um projeto Django, execute as migrations:

```
python manage.py migrate
```

