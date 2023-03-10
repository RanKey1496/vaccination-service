# vaccination-service
API REST para coordinar registros de vacunaci贸n

## Comenzando 馃殌
Las instrucciones aqu铆 te permitir谩n obtener una copia del proyecto en funcionamiento en tu m谩quina local para prop贸sitos de desarrollo y pruebas.
Mira **Instalaci贸n 馃敡** para conocer como instalar el proyecto.

### Pre-requisitos 馃搵
_Para realizar la instalaci贸n local de debe contar con unos requisitos:_
```
- NodeJS v12+
- NPM
- MySQL DB
```
_Si se tiene instalado Docker es mucho m谩s f谩cil, solo se necesita:_
```
- Docker
- docker-compose
```

### Instalaci贸n 馃敡
Hay dos formas de poner a correr nuestro servicio vaccination:
1. Forma tradicional (instaladar todo en el equipo)
2. Docker con docker-compose

#### Forma tradicional 馃敡
Para la forma tradicional, debemos tener antes una base de datos en MySQL y nuestro respectivo archivo .env
Primero que todo debemos instalar las dependendencias del proyecto ejecutando:
```
npm install
```
Luego debemos modificar las variables de entorno que se encuentran dentro del archivo _.env.dev_ (development).
Por ultimo para correr nuestro programa solo debemos ejecutar el comando:
```
npm run watch
```
Luego de esto quedar谩 una instancia corriendo en el puerto 3000.
Para probar que todo funciona bien puede hacerse una petici贸n HTTP:
```
GET http://localhost:3000/signup
```

#### Docker y docker-compose 馃敡
Para esta forma, debemos tener previamente instalado docker y docker-compose en nuestro equipo.
Luego, lo unico que debemos ejecutar es:
```
docker-compose up
```
De esta manera, se crear谩 una instancia de MySQL y una de nuestro vaccination-service.
Luego de esto quedar谩 una instancia corriendo en el puerto 3000.
Para probar que todo funciona bien puede hacerse una petici贸n HTTP:
```
GET http://localhost:3000/signup
```

## Ejecutando las pruebas 鈿欙笍
En esta ocasi贸n, las pruebas que realizaremos ser谩n unitarias.
Primero debemos instalar los paquetes de npm con el comando:
```
npm install
```
Una vez instalados nuestros paquetes de npm podemos ejecutar las pruebas con:
```
npm test
```

## Endpoints 馃摝
Para pruebas podemos hacer peticiones a las siguientes URL:
```
_AUTH_
POST - http://localhost:3000/signup
POST - http://localhost:3000/login

_DRUGS_
POST - http://localhost:3000/drugs
PUT - http://localhost:3000/drugs/:id
GET - http://localhost:3000/drugs
DELETE - http://localhost:3000/drugs/:id

_VACCINATION_
POST - http://localhost:3000/vaccination
PUT - http://localhost:3000/vaccination/:id
GET - http://localhost:3000/vaccination
DELETE - http://localhost:3000/vaccination/:id
```

## 驴Que se hizo?
Se cre贸 un servicio utilizando Express que expone varios endpoints.

Dentro del proyecto se utilizaron varios patrones de dise帽o, podemos ver el patr贸n Dependency Injection con Inversify y el patr贸n Builder para hacer m谩s f谩cil las pruebas unitarias.

## Construido con 馃洜锔?
* [NodeJS](https://nodejs.org/) - Entorno en tiempo de ejecuci贸n multiplataforma
* [Express](https://expressjs.com/) - Framework en nodejs para realizar APIs
* [InversifyJS](https://github.com/inversify/InversifyJS) - Contenedor para inversi贸n de control (IoC)
* [TypeORM](https://typeorm.io/#/) - ORM para conexi贸n a bases de datos
* [MySQL](https://www.postgresql.org/) - Base de datos relacional
* [Docker](https://www.docker.com/) - Plataforma de contenedorizaci贸n open-source

## Autores 鉁掞笍

* **Jhon Gil Sepulveda** - *Trabajo Inicial* - [rankey1496](https://github.com/rankey1496)

## Licencia 馃搫

Este proyecto est谩 bajo la Licencia ISC