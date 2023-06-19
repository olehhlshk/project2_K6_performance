import http from "k6/http";
import { sleep, check } from "k6";
import { headerSellerConsoleGenerate } from "../headers-helper.js";
import { listBuyersQuery } from "../../fixtures/console/listBuyers-query-generator.js"
import { getBuyerQuery } from "../../fixtures/console/getBuyer-query-generator.js"

let config = JSON.parse(open("../../config/config.json"));
let params = headerSellerConsoleGenerate();
const url = config.console_url;

export function listBuyers() {
    const parameters = `{"page": 1, "perPage": 20}`;
    let body = JSON.stringify({
      query: listBuyersQuery,
      variables: {
        pagination: JSON.parse(parameters),
      },
    });
    let res = http.post(url, body, params);
    check(res, {
      "is status 200": (r) => r.status === 200,
    });
    console.log("listBuyers Status = " + res.status);
    //console.log("listBuyers response = " + res.body);
    return res;
  }
  export function getBuyer(accountId) {
    let body = JSON.stringify({
      query: getBuyerQuery,
      variables: {
        accountId: accountId,
      },
    });
    let res = http.post(url, body, params);
    check(res, {
      "is status 200": (r) => r.status === 200,
    });
    console.log("getBuyer Status = " + res.status);
    //console.log("getBuyer response = " + res.body);
    return res;
  }