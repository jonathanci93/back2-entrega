## Variables de entorno
Crear .env en la raiz del proyecto
```
MONGO_URL=mongodb+srv://<usuario>:<password>@<cluster>/<db>?retryWrites=true&w=majority
SECRET_KEY=1234
PORT=8080
NODE_ENV=development
```
## Rutas
```
Ruta registro---
POST http://localhost:8080/api/sessions/register
Body:
{
  "first_name": "Jona",
  "last_name": "Carles",
  "email": "jona@mail.com",
  "age": 32,
  "password": "123456",
  "role": "user"
}

Ruta registro admin---
POST http://localhost:8080/api/sessions/register
Body:
{
  "first_name": "Jona",
  "last_name": "Carles",
  "email": "jona@mail.com",
  "age": 32,
  "password": "123456",
  "role": "admin"
}

Ruta login---
POST http://localhost:8080/api/sessions/login
Body:
{
  "email": "jona@mail.com",
  "password": "123456"
}

Ruta autorizacion---
GET http://localhost:8080/api/sessions/current

Ruta logout
POST http://localhost:8080/api/sessions/logout

Vincular carrito---
POST http://localhost:8080/api/sessions/me/ensure-cart

Crear producto COMO ADMIN---
POST http://localhost:8080/api/products

Json:
{
  "title": "Camiseta Invictus Negra",
  "description": "Remera de entrenamiento",
  "price": 19999,
  "stock": 50,
  "category": "indumentaria",
  "code": "REM-INV-001"
}
(La respuesta devuelve un ID se usa para el carrito)

Agregar producto al carrito como usuario---
POST http://localhost:8080/api/carts/me/product/:pid
json:
{ "quantity": 2 }

Finalizar compra---
POST http://localhost:8080/api/carts/me/purchase
json:
{}

Flujo de prueba:
1- Registrarse como admin y crear un producto
2-Login como usuario
3- Vincular carrito 
4- Agregar el producto
5- Finalizar la compra
```
