const usuario = {
  id: 200,
  name: "Manu",
  dni: 404040,
  mail: "manu_2705@hotmail.com",
  password: "123456Manu",
  role: "Admin",
  tel: "2045245"
};

const items = [{
  code: "5386",
  description: "Colgate plax ice 500ml",
  family: "Higiene",
  group: "Dental",
  price: 500,
  unit: "ml",
  amount: 500
},{
  code: "122222",
  description: "Pepsi 1l",
  family: "Gaseosa",
  group: "Bebidas",
  price: 100,
  unit: "l",
  amount: 1
},{
  code: "8878",
  description: "Auricular Bluetooth Philips High Resolution Taph802bk/00",
  family: "Electrónico",
  group: "Audio",
  price: 14500,
  unit: "unidad",
  amount: 1
}];

const newItem={
  code: "2705",
  description: "Colgate plax ice 250ml",
  family: "Higiene",
  group: "Dental",
  price: 500,
  unit: "ml",
  amount: 500
};

const loginUsuario = {
  id: usuario.id,
  password: usuario.password,
};

module.exports={usuario,items,loginUsuario,newItem};