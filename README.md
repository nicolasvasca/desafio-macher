# Executando a aplicação com Docker
## Requisitos
- Ter o **Docker Compose** instalado.

## Como executar
```bash
$ docker-compose up --build
```


# Executando a aplicação com NPM
## Requisitos
Ter o Node.js na versão 18 ou superior.

## Instalação

```bash
$ npm install
```

## Como executar a aplicação

```bash
# Ambiente de desenvolvimento
$ npm run start

# Modo de observação
$ npm run start:dev

# Ambiente de produção
$ npm run start:prod
```

# Execuntado Testes

```bash
# Testes unitários
$ npm run test
```

# Documentação
Após iniciar a aplicação, acesse o endereço [http://localhost:3000](http://localhost:3000) para visualizar a documentação interativa do **Swagger**.