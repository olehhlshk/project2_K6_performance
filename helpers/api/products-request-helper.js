import http from "k6/http";
import { sleep, check } from "k6";
import { headerGenerate } from "../headers-helper.js";
import productsJsonGenerator from "../../fixtures/products-json-generation.js";
let config = JSON.parse(open("../../config/config.json"));
let params = headerGenerate();
export function productsGetRQ() {
  const env_url = config.env_url;
  const url = `${env_url}/api/external/v1/products?supplier_uid=sup_01G3S8C9C918F16XBA0F7ZV97J&page=1&per_page=500`;
  let res = http.get(url, params);
  check(res, {
    "is status 200": (r) => r.status === 200,
  });
  console.log("productsGetRQ Status = " + res.status);
  return res;
}
export function productsPostRQ(numberProducts) {
  const env_url = config.env_url;
  const url = `${env_url}/api/external/v1/products`;
  const body = productsJsonGenerator.generateProductsJson(numberProducts);
  const res = http.post(url, body, params);
  check(res, {
    "is status 201": (r) => r.status === 201,
  });
  console.log("productsPostRQ Status = " + res.status);
  console.log("productsPostRQ response = " + res.body);
  return res;
}