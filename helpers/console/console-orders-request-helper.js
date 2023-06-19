import http from "k6/http";
import { sleep, check } from "k6";
import { headerSellerConsoleGenerate } from "../headers-helper.js";
import { listOrdersQuery } from "../../fixtures/console/listOrders-query-generator.js";
import { getOrderQuery } from "../../fixtures/console/getOrder-query-generator.js";
let config = JSON.parse(open("../../config/config.json"));
let params = headerSellerConsoleGenerate();
const url = config.console_url;
export function listOrders(marketplaceUid) {
    const parameters = `{"page": 1, "perPage": 20}`;
    let body = JSON.stringify({
      query: listOrdersQuery,
      variables: {
        sort: "createdAtDesc",
        marketplaceUid: marketplaceUid,
        pagination: JSON.parse(parameters),
      },
    });
    let res = http.post(url, body, params);
    check(res, {
      "is status 200": (r) => r.status === 200,
    });
    console.log("listOrders Status = " + res.status);
    //console.log("listOrders response = " + res.body);
    return res;
  }
  export function getOrder(orderId, marketplaceUid) {
    let body = JSON.stringify({
      query: getOrderQuery,
      variables: {
        orderId: orderId,
        marketplaceUid: marketplaceUid,
      },
    });
    let res = http.post(url, body, params);
    check(res, {
      "is status 200": (r) => r.status === 200,
    });
    console.log("getOrder Status = " + res.status);
    //console.log("getOrder response = " + res.body);
    return res;
  }