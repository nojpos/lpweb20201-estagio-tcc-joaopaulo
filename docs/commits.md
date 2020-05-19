# Padrão para mensagens dos commits

O projeto adota o padrão [conventional commits](https://www.conventionalcommits.org/) para a definição das mensagens de commits. Além disso, o pacote [standard-version](https://github.com/conventional-changelog/standard-version) gera o changelog e o incremento de versão (com release) conforme a mensagem do commit, que é validada pelo pacote [husky](https://github.com/typicode/husky).

Os escopos das mensagens dos commits são:

* **backend**: para commit relacionado ao backend 
* **frontend**: para commit relacionado ao frontend

Escopos específicos de cada um desses também são permitidos. Ex.: **frontend-publico** poderia se referir a um módulo do frontend chamado publico e **frotend-login** poderia se referir a um componente do frontend chamado login. No gral, é indicado dar preferência à utilização dos escopos gerais.

Os tipos das mensagens são:

* **feat**: para lançamento de nova funcionalidade
* **fix**: para correção de bug
* **chore**: usado automaticamente pelo standard-version para incremento de versão
* **docs**: para mudanças referentes à documentação
* **refactor**: para melhoria de dcódigo que não gera correção de bug e nem adiciona funcionalidade
* **perf**: para mudança de código que melhora desempenho
* **test**: para adição ou correção de testes

Desta forma, ao desenvolver acrescentar recursos a este projeto, procure utilizar este padrão.
