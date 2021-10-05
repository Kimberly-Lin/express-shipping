"use strict";

const {
  shipProduct,
} = require("./shipItApi");


test("shipProduct", async function () {
  const shipId = await shipProduct({
    productId: 1000,
    name: "Test Tester",
    addr: "100 Test St",
    zip: "12345-6789",
  });

  expect(shipId).toEqual(expect.any(Number));
});

// test("ship invalid productId", async function () {

//   const result = await shipProduct({
//     productId: 900,
//     name: "Test Tester",
//     addr: "100 Test St",
//     zip: "12345-6789",
//   });
//   console.log(result)
//   expect(result.body.statusCode).toEqual(400);
// });
