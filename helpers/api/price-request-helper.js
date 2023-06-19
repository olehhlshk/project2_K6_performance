import http from "k6/http";
import { sleep, check } from "k6";
import { headerGenerate } from "../headers-helper.js";
import pricesJsonGenerator from "../../fixtures/prices-json-generation.js";
let config = JSON.parse(open("../../config/config.json"));
let params = headerGenerate();
export function pricesPostRQ(response) {
  const products = JSON.parse(response.body).data;
  let productsUidArray = products.map((product) => product.uid);
  const env_url = config.env_url;
  const url = `${env_url}/api/external/v1/products/prices`;
  const body = pricesJsonGenerator.generatePricesJson(productsUidArray);
  const res = http.post(url, body, params);
  check(res, {
    "is status 201": (r) => r.status === 201,
  });
  // console.log("pricesPostRQ Status = " + res.status);
  // console.log("pricesPostRQ response = " + res.body);
  return res;
}