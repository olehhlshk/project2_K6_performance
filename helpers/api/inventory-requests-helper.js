import http from "k6/http";
import { sleep, check } from "k6";
import { headerGenerate } from "../headers-helper.js";
import inventoryJsonGenerator from "../../fixtures/inventory-update-generator.js";
let config = JSON.parse(open("../../config/config.json"));
let params = headerGenerate();

export function inventoryPutRQ(response) {
  const products = JSON.parse(response.body).data;
  let productsUidArray = products.map((product) => product.uid);
  const env_url = config.env_url;
  const url = `${env_url}/api/external/v1/products`;
  const body = inventoryJsonGenerator.generateInventoryJson(productsUidArray);
  const res = http.put(url, body, params);
  check(res, {
    "is status 200": (r) => r.status === 200,
  });
  console.log("invenrotyPutRQ response = " + res.body);
  return res;
}