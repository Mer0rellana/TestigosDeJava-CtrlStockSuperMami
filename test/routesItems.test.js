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
    const itemObjet = new Item( {
      ...item,
      createdAt:moment.now(),
      state:'Activo'
    } );
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
        .expect({ message: {}, cause: "Unauthorized" })
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
    it('Devuelve un codigo 200 y un array de 1', async () => {
      const response = await api
        .get('/item?code='+`${items[0].code}`)
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
        expect(response.body).length(1)
    });
  });

  describe('GET?state=', () => {
    it('Devuelve un codigo 200 y un array de 3', async () => {
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
        .expect({ message: {}, cause: "Unauthorized" })
    });

  });

  /* describe('POST', () => {
    it('Responde con un objeto con un mensaje de "No token in header" y la causa "Unauthorized"', async () => {
      await api
        .post('/item/add')
        .set('Authorization', 'Bearer ' + token)
        .send(newItem)
        .expect(201)
    });
  }); */
});