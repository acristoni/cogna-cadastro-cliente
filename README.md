# Cogna-cadastro-cliente
Mono-repo contendo o Front-end em ReactJs(NextJs) e back-end em NestJs projeto gestão de clinetes grupo Cogna

# Rodar localmente
1. Primeiro é necessário rodar o banco de dados, para isso preparei um docker-compose na pasta back
```
cd back/
```
```
sudo docker-compose up -d
```

*Caso der algum problema nesse passo é provável que as portas 5432 e 8080 já estejam sendo usadas*

2. Instalar dependências do back-end
*Ainda na mesma pasta back*
```
npm install
```

3. Rodar back-end localmente
**configurar .env, o repositório já tem um exemplo para ajudar**
```
npm run start
```

4. Instalar dependências do front-end, agora é necessário ir para a pasta do front
```
cd ..
```
```
cd front/
```
```
npm install --force
```
*A flag force é necessária, pois o MUI trabalhar com PeerDependencies (react e react-dom) diferente de alguns outros pacotes do projeto*

5. Rodar front-end
**configurar .env, o repositório já tem um exemplo para ajudar**
```
npm run dev
```

6. Rodar tests
Realizei uma cobertura de teste, como exemplo.

Na pasta **back/:**

Teste unitários:
```
npm run test:cov
```
Teste e2e:
```
npm run test:e2e
```
Na pasta **front/:**

Teste e2e:
```
npm run cypress
```
