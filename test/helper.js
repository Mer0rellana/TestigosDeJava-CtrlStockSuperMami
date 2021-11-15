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
  code: "56230001562",
  description: "Colgate plax ice 500ml",
  family: "Higiene",
  group: "Dental",
  price: 500,
  unit: "ml",
  amount: 500
}, {
  code: "7790895000218",
  description: "Coca cola",
  family: "Gaseosa",
  group: "Bebidas",
  price: 100,
  unit: "l",
  amount: 1
}, {
  code: "56230001553",
  description: "Auricular Bluetooth Philips High Resolution Taph802bk/00",
  family: "Electrónico",
  group: "Audio",
  price: 14500,
  unit: "unidad",
  amount: 1
}];

const newItem = {
  code: "2705",
  description: "Colgate plax ice 250ml",
  family: "Higiene",
  group: "Dental",
  price: 500,
  unit: "ml",
  amount: 500
};


/* id: yup.string().required("Debe ingresar el id del lote"),
            codeItem: yup.string().required("Debe ingresar el código del artículo"),
            expiredAt: yup.string().optional().matches(DateReg, 'El formato de fecha debe ser dd/mmm/yyyy'),
            amount: yup.number().required("Debe ingresar la cantidad del artículo"),
            storage: yup.number().required("Debe ingresar el depósito de almacenamiento del lote"),
            area: yup.string().required("Debe ingresar el área de almacenamiento del lote") */

const batches = [{
  id: 1,
  codeItem: "7790895000218",
  storage: 1,
  area: "A6",
  amount: 25,
  expiredAt: "27/05/2021"
}, {
  id: 2,
  codeItem: "56230001562",
  storage: 1,
  area: "G3",
  amount: 51,
  expiredAt: "15/05/2020"
}, {
  id: 3,
  codeItem: "56230001562",
  storage: 1,
  area: "F3",
  amount: 123,
  expiredAt: "10/05/2022"
}, {
  id: 4,
  codeItem: "56230001553",
  storage: 1,
  area: "F1",
  amount: 13,
  expiredAt: "12/07/2025"
}];

const newTransactions = [
  {
    type: 'Entrada',
    batches: [batches[0], batches[1]]
  },
  {
    type: 'Salida',
    batches: [batches[2]]
  },
  {
    type: 'Entrada',
    batches: [batches[3]]
  }
];

const transactions=[
  {
    type: "Entrada",
    idUser: 114,
    state: "Activo",
    createdAt: 1636426800000,
    batches: [
      "AAA715165DP",
      "AAA715165DPZZ"
    ]
  },{
    type: "Entrada",
    idUser: 114,
    state: "Activo",
    createdAt: 1636426800000,
    batches: [
      "AAA715165DSP",
      "AAA715165DSPZ",
      "AAA715165DSW"
    ]
  },{
    type: "Entrada",
    idUser: 114,
    state: "Activo",
    createdAt: 1636426800000,
    batches: [
      "7811515535A",
      "7811515535B"
    ]
  },{
    type: "Entrada",
    idUser: 114,
    state: "Activo",
    createdAt: 1636426800000,
    batches: [
      "20210930P0K78000T4"
    ]
  }
]


const loginUsuario = {
  id: usuario.id,
  password: usuario.password,
};

module.exports = { usuario, items, loginUsuario, newItem, transactions };