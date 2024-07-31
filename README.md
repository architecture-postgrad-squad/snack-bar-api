# Pós Tech - Tech challenge 2

### Alunos

- Débora Silveira - RM353919
- Eduardo Petri - RM353438
- Fernanda - RM 353224
- Miriéle Silvério - RM 353515

### O que é o projeto?

Solução do segundo tech challenge da pós tech de Software Architecture, nossa solução foi desenvolvida em Typescript utilizando o framework Nestjs.

### Documentação do sistema

[Miro]( https://miro.com/app/board/uXjVKUrPAdA=/?share_link_id=25578601860) contém:
- Event storming
- MER
- Desenho da arquitetura

A arquitetura implementada para os requisitos técnicos solicitados no tech challenge 2 está descrito na imagem abaixo:

![image](https://github.com/user-attachments/assets/4c28d533-ac45-46b5-99f9-fd481eda1f34)

- Webhook: API que receberá notificações sobre status do pagamento do QR code referente a compra no backend;
- Backend: API que gerencia os pedidos da lanchonete e faz interface com o banco de dados do serviço;
- Db: Banco de dados do backend

### Requisitos 
Ter [kubernetes](https://kubernetes.io/releases/download/), [docker](https://docs.docker.com/get-docker/) e [git](https://git-scm.com/downloads) instalado.

### Como iniciar localmente
Para essa etapa do tech challenge, subimos nossa aplicação utilizando kubernetes. Foi criado um cluster com um namespace (snack-bar) e pods para cada serviço especificado no desenho de arquitetura.

```bash
$ git submodule update --init --recursive
$ cd k8s
$ kubectl apply -f .
```

Para validar o funcionamento da API, utilize a collection do postman: [TODO: Adicionar link]

## Como rodar os testes localmente

```bash
$ cd snack-bar-api
$ npm i
$ npm run test
```
