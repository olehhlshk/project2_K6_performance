import http from "k6/http";
import { sleep, check } from "k6";
import { headerGenerate } from "../headers-helper.js";

let config = JSON.parse(open("../../config/config.json"));
let params = headerGenerate();

export function ordersGetRQ(shipping_status = 'paid') {
  const env_url = config.env_url;
  //const filter = `paid`;
  const marketplace_uid = 'com_01GAKA0866CYVNC2DV097Y1P45';
  const url = `${env_url}/api/external/v1/orders?marketplace_uid=${marketplace_uid}&page=1&per_page=300&filters[shipping_status]=${shipping_status}`;
  let res = http.get(url, params);
  check(res, {
    "is status 200": (r) => r.status === 200,
  });
  console.log("ordersGetRQ Status = " + res.status);
  return res;
}

export function ordersGetByUid(uid) {
  const env_url = config.env_url;
  //const filter = `paid`;
  const marketplace_uid = 'com_01GAKA0866CYVNC2DV097Y1P45';
  const url = `${env_url}/api/external/v1/orders?marketplace_uid=${marketplace_uid}&page=1&per_page=300&filters[uid]=${uid}`;
  let res = http.get(url, params);
  check(res, {
    "is status 200": (r) => r.status === 200,
  });
  console.log("ordersGetRQ Status = " + res.status);
  console.log("ordersGetRQ response = " + res.body);
  return res;
}