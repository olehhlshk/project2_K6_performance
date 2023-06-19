import http from "k6/http";
import { sleep, check } from "k6";
import { headerGenerate } from "../headers-helper.js";
import categoriesJsonGenerator from "../../fixtures/categories-json-generator.js";
let config = JSON.parse(open("../../config/config.json"));
let params = headerGenerate();

export function categoriesGetRQ() {
  const env_url = config.env_url;
  const url = `${env_url}/api/external/v1/categories?supplier_uid=sup_01G3S8C9C918F16XBA0F7ZV97J&page=1&per_page=500`;
  let res = http.get(url, params);
  check(res, {
    "is status 200": (r) => r.status === 200,
  });
  console.log("categoriesGetRQ Status = " + res.status);
  return res;
}

export function categoriesPostRQ() {
  const env_url = config.env_url;
  const url = `${env_url}/api/external/v1/categories`;
  let body = categoriesJsonGenerator.generateCategoriesJson(1);
  let res = http.post(url, body, params);
  check(res, {
    "is status 201": (r) => r.status === 201,
  });
  console.log("categoriesPostRQ Status = " + res.status);
  console.log("categoriesPostRQ response = " + res.body);
  return res;
}