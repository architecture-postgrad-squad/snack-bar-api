# Pós Tech - Tech challenge 

### Alunos

- Débora Silveira - RM353919
- Eduardo Petri - RM353438
- Fernanda - RM 353224
- Miriéle Silvério - RM 353515

### O que é o projeto?

Solução do tech challenge da pós tech de Software Architecture, nossa solução foi desenvolvida em Typescript utilizando o framework Nestjs.

### Documentação do sistema

[Miro]( https://miro.com/app/board/uXjVKUrPAdA=/?share_link_id=25578601860) contém:
- Event storming
- MER
- Desenho da arquitetura


### Como iniciar localmente

```bash
$ git submodule update --init
$ cd snack-bar-api
$ docker-compose --env-file ./env/local.env up
```

Para acessar o swagger: http://localhost:3000/api

## Como rodar os testes localmente

```bash
# unit tests
$ cd snack-bar-api
$ npm run test
```
