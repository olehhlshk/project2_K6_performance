import http from "k6/http";
import { sleep, check } from "k6";
import { headerGenerate } from "../headers-helper.js";
import accountsJsonGenerator from "../../fixtures/accounts-json-generation.js";

let config = JSON.parse(open("../../config/config.json"));
let params = headerGenerate();

export function accountsGetRQ() {
  const env_url = config.env_url;
  const marketplace_uid = "com_01G4YZPVBMGEPGJM4WJ6EFSXJZ";
  const url = `${env_url}/api/external/v1/accounts?marketplace_uid=${marketplace_uid}&page=1&per_page=500`;
  let res = http.get(url, params);
  check(res, {
    "is status 200": (r) => r.status === 200,
  });
  console.log("accountsGetRQ Status = " + res.status);
  return res;
}

export function accountsPostRQ() {
  const env_url = config.env_url;
  const url = `${env_url}/api/external/v1/accounts`;
  let body = accountsJsonGenerator.generateAccountsJson(1);
  let res = http.post(url, body, params);
  check(res, {
    "is status 201": (r) => r.status === 201,
  });
  console.log("accountsPostRQ Status = " + res.status);
  console.log("accountsPostRQ response = " + res.body);
  return res;
}