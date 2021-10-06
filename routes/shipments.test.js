"use strict";

const shipIt = require("../shipItApi");
shipIt.shipProduct = jest.fn();

const request = require("supertest");
const app = require("../app");

describe("POST /", function () {
  test("valid", async function () {
    shipIt.shipProduct.mockReturnValue(2345);

    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.body).toEqual({ shipped: 2345 });
  });

  test("invalid productId", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 151,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });
    expect(resp.body).toEqual({
      "error": {
        "message": [
          "instance.productId must be greater than or equal to 1000"
        ],
        "status": 400
      }
    });
    expect(resp.statusCode).toEqual(400);
  });

  test("invalid name", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: 546,
      addr: "100 Test St",
      zip: "12345-6789",
    });
    expect(resp.body).toEqual({
      "error": {
        "message": [
          "instance.name is not of a type(s) string"
        ],
        "status": 400
      }
    });
    expect(resp.statusCode).toEqual(400);
  });

  test("invalid addr", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: 54564,
      zip: "12345-6789",
    });
    expect(resp.body).toEqual({
      "error": {
        "message": [
          "instance.addr is not of a type(s) string"
        ],
        "status": 400
      }
    });
    expect(resp.statusCode).toEqual(400);
  });

  test("invalid zip", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: 456,
    });
    expect(resp.body).toEqual({
      "error": {
        "message": [
          "instance.zip is not of a type(s) string"
        ],
        "status": 400
      }
    });

    expect(resp.statusCode).toEqual(400);
  });

  test("pass in extra properties", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
      color: "red"
    });
    expect(resp.body).toEqual({
      "error": {
        "message": [
          "instance is not allowed to have the additional property \"color\""
        ],
        "status": 400
      }
    });

    expect(resp.statusCode).toEqual(400);
  });

});
