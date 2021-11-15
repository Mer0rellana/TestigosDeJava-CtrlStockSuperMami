const supertest = require('supertest');
const mongoose = require('mongoose');
const { app, server } = require('../src/index');
const User = require('../src/models/user');
const { ItemSchema: Item } = require('../src/models/item');
const { Hash } = require('../src/utils/hashing');
const moment = require('moment');
const { expect } = require('chai');
const { usuario, loginUsuario, items, newItem } = require('./helper');

const api = supertest(app);
let token = null;
let someId=null;



after(() => {
  mongoose.connection.close();
  server.close();

})

before(async () => {
  const hashed_password = await Hash(usuario.password);
  await User.deleteMany({});
  await Item.deleteMany({});
  const user = new User({
    ...usuario,
    password: hashed_password,
    createdAt: moment.now(),
  });
  await user.save();

  for (const item of items) {
    const itemObjet = new Item({
      ...item,
      createdAt: moment.now(),
      state: 'Activo'
    });
    await itemObjet.save();
  }
  
  const data = await api
    .post('/user/login')
    .send(loginUsuario)

  token = data.body.token;
})

describe('getItem.js', () => {

  describe('Errores de item', () => {
    it('Responde con un objeto con un mensaje de "No token in header" y la causa "Unauthorized"', async () => {
      await api
        .get('/item')
        .expect(401)
        //.expect('Content-Type','/aplication/json/')
        .expect({ message: "No token in header", cause: "Unauthorized" })
    });

    it('Token equivocado', async () => {
      await api
        .get('/item')
        .set('Authorization', 'Bearer asd')
        .expect({ message: "Unauthorized token", cause: "Unauthorized" })
    });

  });

  describe('GET', () => {
    it('Devuelve un codigo 200 y un array de 3', async () => {
      const response = await api
        .get('/item')
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
      expect(response.body).length(3)
    });
  });

  describe('GET?code=', () => {
    it('Devuelve un codigo 200 y un array de 1 articulo', async () => {
      const response = await api
        .get('/item?code=' + `${items[0].code}`)
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
      expect(response.body).length(1)
    });
  });

  describe('GET?state=', () => {
    it('Devuelve un codigo 200 y un array de 3 articulos', async () => {
      const response = await api
        .get('/item?state=Activo')
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
      expect(response.body).length(3)
    });
  });
});


describe('postItem.js', () => {

  describe('Errores de postItem', () => {
    it('Responde con un objeto con un mensaje de "No token in header" y la causa "Unauthorized"', async () => {
      await api
        .post('/item/add')
        .expect(401)
        .expect({ message: "No token in header", cause: "Unauthorized" })
    });

    it('Token equivocado', async () => {
      await api
        .post('/item/add')
        .set('Authorization', 'Bearer asd')
        .expect({ message: "Unauthorized token", cause: "Unauthorized" })
    });

    it('Error 400, bad Request por datos erroneos', async () => {
      await api
        .post('/item/add')
        .set('Authorization', 'Bearer ' + token)
        .send({
          ...newItem,
          price: "otrodato"
        })
        .expect(400)
        .expect({
          message: [ ' Ingrese precio del artículo' ], cause: 'Bad Request'
        })
    });

    it('Error 404', async () => {
      await api
        .get('/item/add')
        .set('Authorization', 'Bearer ' + token)
        .expect(404)
    });

    //VERIFICAR EL ERROR DE CUANDO SE CARGA CON DATOS DE MAS
    it('Agregar datos de mas', async () => {
      await api
        .post('/item/add')
        .set('Authorization', 'Bearer ' + token)
        .send({
          ...newItem,
          code:"1234",
        otrodato:"otrodato"})
        .expect(200)
        //.expect({message: "El artículo se creó exitosamente"})
    });

    it('Error al agregar un item con el mismo codigo de uno existente, error 400 y un mensaje', async () => {
      await api
        .post('/item/add')
        .set('Authorization', 'Bearer ' + token)
        .send(items[0])
        .expect(400)
        .expect({
          cause: "Bad Request",
          message: "El código de artículo ya existe en el sistema"})
    });
  });

  describe('POST', () => {
    it('Responde con el codigo 200', async () => {
      await api
        .post('/item/add')
        .set('Authorization', 'Bearer ' + token)
        .send(newItem)
        .expect(200)
        .expect({message: "El artículo se creó exitosamente"})
    });
  });
});

describe('putItem.js', () => {

  describe('Errores de putItem', () => {
    it('Responde con un objeto con un mensaje de "No token in header" y la causa "Unauthorized"', async () => {
      await api
        .put(`/item/update/${items[0].code}`)
        .expect(401)
        .expect({ message: "No token in header", cause: "Unauthorized" })
    });

    it('Token equivocado', async () => {
      await api
        .put(`/item/update/${items[0].code}`)
        .set('Authorization', 'Bearer asd')
        .expect({ message: "Unauthorized token", cause: "Unauthorized" })
    });

    it('Error 400, bad Request por datos erroneos', async () => {
      await api
        .put(`/item/update/${items[0].code}`)
        .set('Authorization', 'Bearer ' + token)
        .send({
          ...newItem,
          price: "otrodato"
        })
        .expect(400)
        .expect({
          message: [ ' Ingrese precio del artículo' ], cause: 'Bad Request'})
    });

    it('Error 404 por peticion incorrecta', async () => {
      await api
        .post(`/item/update/${items[0].code}`)
        .set('Authorization', 'Bearer ' + token)
        .expect(404)
    });

    it('Error 400, no se pasan los datos', async () => {
      await api
        .put(`/item/update/999999999999a@[]`)
        .set('Authorization', 'Bearer ' + token)
        .expect(400)
        .expect({ message: [ //Esto es porque primero pasa por el control de yup 
          'Ingrese descripción del artículo',
          ' Ingrese familia del artículo',
          ' Ingrese grupo del artículo',
          'price is a required field',
          ' Ingrese unidad de medida del artículo',
          'amount is a required field'
        ],
        cause: 'Bad Request' })
    });

    //REVISAR
    it('Error al pasar datos erroneos', async () => {
      await api
        .put(`/item/update/${items[0].code}`)
        .set('Authorization', 'Bearer ' + token)
        .send({
          code:"2727"
        })
        .expect(400)
    });
  });

  describe('PUT', () => {
    it('Responde con el codigo 200', async () => {
      await api
        .put(`/item/update/${items[0].code}`)
        .set('Authorization', 'Bearer ' + token)
        .send({...items[0]})
        .expect(200)
        .expect({message: "Artículo actualizado con éxito"})
    });
  });
});

describe('putItemState.js', () => {

  describe('Errores de putItem', () => {
    it('Responde con un objeto con un mensaje de "No token in header" y la causa "Unauthorized"', async () => {
      await api
        .put(`/item/update-state/${items[0].code}`)
        .expect(401)
        .expect({ message: "No token in header", cause: "Unauthorized" })
    });

    it('Token equivocado', async () => {
      await api
        .put(`/item/update-state/${items[0].code}`)
        .set('Authorization', 'Bearer asd')
        .expect({ message: "Unauthorized token", cause: "Unauthorized" })
    });

    it('Error 404 por peticion incorrecta', async () => {
      await api
        .post(`/item/update-state/${items[0].code}`)
        .set('Authorization', 'Bearer ' + token)
        .expect(404)
    });

    it('Error 404', async () => {
      await api
        .put(`/item/update-state/999999999999a@[]`)
        .set('Authorization', 'Bearer ' + token)
        .expect(404)
        .expect({ message: 'El artículo no existe', cause: 'Not Found' })
    });

  });

  describe('PUT', () => {
    it('Responde con el codigo 200', async () => {
      await api
        .put(`/item/update-state/${items[0].code}`)
        .set('Authorization', 'Bearer ' + token)
        .send({...items[0]})
        .expect(200)
        .expect({message: "Artículo eliminado con éxito"})
    });
  });
});