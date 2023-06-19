import http from "k6/http";
import { sleep, check } from "k6";
import { headerGenerate } from "./headers-pav-helper.js";
import faker from "../../libs/shim/faker.js";

let config = JSON.parse(open("../config/config_pav.json"));
let params = headerGenerate();

export function pavPostRQ() {
  let zip = faker.address.zipCode("#####");
  const env_url = config.env_url;
  const url = `${env_url}/pav/api/PavRestrictions?zip=${zip}`;
  let body = "";
  let res = http.post(url, body, params);
  check(res, {
    "is status 200": (r) => r.status === 200,
  });
  console.log("pavPostRQ Status = " + res.status);
  console.log("pavPostRQ url = " + url);
  return res;
}