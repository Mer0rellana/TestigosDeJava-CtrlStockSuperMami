const supertest = require('supertest');
const app = require('../src/index');
const User = require('../src/models/user');
const { Hash } = require('../src/utils/hashing');
const moment = require('moment');

const api = supertest(app);



const usuario = {
  id: 200,
  name: "Manu",
  dni: 404040,
  mail: "manu_2705@hotmail.com",
  password: "123456Manu",
  role: "Admin",
  tel: "2045245"
};
const loginUsuario = {
  id: usuario.id,
  password: usuario.password,
}

beforeEach(async () => {
  const hashed_password = await Hash(usuario.password);
  await User.deleteMany({});
  const user = new User({
    ...usuario,
    password:hashed_password,
    createdAt: moment.now(),
  });
  await user.save();

  const token = await api
    .post('/user/login')
    .send(loginUsuario)

  console.log(token.body)
})

describe('pruebas de item', () => {


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
  })
});

/* describe('Prueba',()=>{
  it('Deberia funcionar',()=>{

  })
}) */