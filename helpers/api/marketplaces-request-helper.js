import http from "k6/http";
import { sleep, check } from "k6";
import { headerGenerate } from "../headers-helper.js";

let config = JSON.parse(open("../../config/config.json"));
let params = headerGenerate();

export function marketplacesGetRQ() {
  const env_url = config.env_url;
  const url = `${env_url}/api/external/v1/marketplaces?page=1&per_page=50`;
  let res = http.get(url, params);
  check(res, {
    "is status 200": (r) => r.status === 200,
  });
  console.log("marketplacesGetRQ Status = " + res.status);
  return res;
}