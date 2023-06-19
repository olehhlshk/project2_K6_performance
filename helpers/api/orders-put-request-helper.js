import http from "k6/http";
import { sleep, check } from "k6";
import { headerGenerate } from "../headers-helper.js";
import { ordersGetRQ } from "./orders-requests-helper.js";
import ordersJsonGenerator from "../../fixtures/order-update-generator.js";

let config = JSON.parse(open("../../config/config.json"));
let params = headerGenerate();

export function ordersPutRQ(response) {
  const orders = JSON.parse(response.body).data;
  let orderItemUidArray = orders
    .map((order) => order.order_items)
    .flat()
    .map((item) => item.uid);
  orderItemUidArray.sort(() => (Math.random() > 0.5 ? 1 : -1));
  const orderItemUidArraySliced = orderItemUidArray.slice(0, 10); //change 10 to any number of order_items you want to update
  const env_url = config.env_url;
  const url = `${env_url}/api/external/v1/orders/items`;
  const body = ordersJsonGenerator.generateOrdersJson(orderItemUidArraySliced);
  console.log("ordersPutRQ body = " + body);
  const res = http.put(url, body, params);
  check(res, {
    "is status 200": (r) => r.status === 200,
  });
  console.log("ordersPutRQ response = " + res.body);
  return res;
}