// test/mocks/salesMocks.js

const sales = [
  {
    id: 1,
    itemsSold: [
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 3 },
    ],
  },
  {
    id: 2,
    itemsSold: [
      { productId: 3, quantity: 1 },
      { productId: 4, quantity: 4 },
    ],
  },
];

const saleById = {
  id: 1,
  itemsSold: [
    { productId: 1, quantity: 2 },
    { productId: 2, quantity: 3 },
  ],
};

module.exports = {
  sales,
  saleById,
};
