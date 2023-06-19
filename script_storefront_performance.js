import "./libs/shim/core.js";
import {
  storefrontSettingsGetRQ,
  storefrontDataGetRQ,
  storefrontProductDataGetRQ,
  searchProductsQueries,
  getItemsAvailability,
  createOrderAccount,
  createAddress,
  createOrder,
  createCheckout,
  recommendations,
} from "./helpers/storefront/storefront-request-helpers.js";
import exec from "k6/execution";
import { ordersGetRQ, ordersGetByUid } from "./helpers/api/orders-requests-helper.js";
import { ordersPutRQ } from "./helpers/api/orders-put-request-helper.js";
// export const options = {
//   discardResponseBodies: false,
//   scenarios: {
//     buyerLoadMarketplace: {
//       executor: "constant-arrival-rate",
//       exec: "buyerLoadMarketplace",
//       tags: { test_type: "buyerLoadMarketplace" },
//       duration: "120s",
//       rate: 6,
//       timeUnit: "1s",
//       preAllocatedVUs: 20,
//       maxVUs: 500,
//     },
//     buyerCreateOrder: {
//       executor: "constant-arrival-rate",
//       exec: "buyerCreateOrder",
//       tags: { test_type: "buyerCreateOrder" },
//       duration: "120s",
//       rate: 10,
//       timeUnit: "1m",
//       preAllocatedVUs: 10,
//       maxVUs: 500,
//     },
//     buyerSearchAndView: {
//       executor: "constant-arrival-rate",
//       exec: "buyerSearchAndView",
//       tags: { test_type: "buyerSearchAndView" },
//       duration: "120s",
//       rate: 3,
//       timeUnit: "1s",
//       preAllocatedVUs: 10,
//       maxVUs: 500,
//     },
//   },
// };
export const options = {
  thresholds: {
    http_req_failed: ["rate<0.01"], // http errors should be less than 1%
    http_req_duration: ["p(95)<2000"], // 95% of requests should be below 200ms
  },
  discardResponseBodies: false,
  scenarios: {
    buyerLoadMarketplace: {
      executor: "ramping-arrival-rate",
      exec: "buyerLoadMarketplace",
      tags: { test_type: "buyerLoadMarketplace" },
      startRate: 8,
      timeUnit: "1s",
      preAllocatedVUs: 10,
      maxVUs: 5000,
      stages: [
        { target: 8, duration: "5m" },
        { target: 14, duration: "20m" },
        { target: 20, duration: "20m" },
        { target: 30, duration: "20m" },
        { target: 10, duration: "10m" },
      ],
    },
    buyerCreateOrder: {
      executor: "ramping-arrival-rate",
      exec: "buyerCreateOrder",
      tags: { test_type: "buyerCreateOrder" },
      startRate: 5,
      timeUnit: "1m",
      preAllocatedVUs: 5,
      maxVUs: 500,
      stages: [
        { target: 8, duration: "5m" },
        { target: 10, duration: "20m" },
        { target: 12, duration: "20m" },
        { target: 14, duration: "20m" },
        { target: 5, duration: "10m" },
      ],
    },
    buyerSearchAndView: {
      executor: "ramping-arrival-rate",
      exec: "buyerSearchAndView",
      tags: { test_type: "buyerSearchAndView" },
      startRate: 3,
      timeUnit: "1s",
      preAllocatedVUs: 5,
      maxVUs: 500,
      stages: [
        { target: 4, duration: "5m" },
        { target: 5, duration: "20m" },
        { target: 7, duration: "20m" },
        { target: 9, duration: "20m" },
        { target: 6, duration: "10m" },
      ],
    },
    // ordersSyncSnaplogic: {
    //   executor: "ramping-arrival-rate",
    //   exec: "ordersSyncSnaplogic",
    //   tags: { test_type: "ordersSyncSnaplogic" },
    //   startRate: 1,
    //   timeUnit: "10m",
    //   preAllocatedVUs: 2,
    //   maxVUs: 3,
    //   stages: [
    //     { target: 1, duration: "35m" },
    //   ],
    // },
  },
};
// export const product = "2-0-fl-oz-10a-10-1-extra-light-blonde-ash";
export const product = "Age Defying Herbal Body Moisturizer-2.5_fl_oz";
// export const query = "shampoo";
export const query = "Age Defying Herbal Body Moisturizer-2.5_fl_oz";
export const buyerDetails = `{"formalName":"Mark","email":"oleh.hlushko+mark@spsoft.com","phone":"+13242342342"}`;
export const addressDetails = `{"type":"shipping","streetLine1":"3433 California Avenue","streetLine2":"","city":"Bakersfield","stateCode":"CA","postalCode":"93309","countryCode":"US"}`;
// export const productUid = "itm_01G9G70715YRZP4DVQMCJNXPDQ";
export const productUid = "itm_01GK4VB79QTMXFJB0C0Y5KWPNV";
const filterPaid = `paid`;
export function buyerLoadMarketplace() {
  storefrontSettingsGetRQ();
  storefrontDataGetRQ();
  recommendations();
}
export function buyerCreateOrder() {
  let products = `{"uidIn":["${productUid}"]}`;
  storefrontSettingsGetRQ();
  storefrontDataGetRQ();
  recommendations();
  storefrontProductDataGetRQ(product);
  searchProductsQueries(query);
  getItemsAvailability(products);
  let buyerResponse = createOrderAccount(buyerDetails);
  let uid = JSON.parse(buyerResponse.body).data.createOrderBuyer.uid;
  // console.log("uid = " + uid);
  let addressResponse = createAddress(uid, addressDetails);
  let addressUid = JSON.parse(addressResponse.body).data.createAddress.uid;
  // console.log("addressUid = " + addressUid);
  let orderItems = `[{"uid":"${productUid}","qty":1}]`;
  // console.log("orderItems = " + orderItems);
  let createOrderResponse = createOrder(orderItems, uid, addressUid);
  let orderUid = JSON.parse(createOrderResponse.body).data.createOrder.uid;
  // console.log("orderUid = " + orderUid);
  createCheckout(orderUid);
  recommendations();
}
export function buyerSearchAndView() {
  searchProductsQueries(query);
  storefrontProductDataGetRQ(product);
}
export function getOrdersBySnaplogic() {
  let orders = ordersGetRQ(filterPaid);
}
export function ordersSyncSnaplogic() {
  let ordersResponse = ordersGetRQ(filterPaid);
  let orders = JSON.parse(ordersResponse.body).data;
  console.log("orders count = " + orders.length);
  orders.forEach((order) => {
    //console.log("uid = " + order.uid);
    let orderResponse = ordersGetByUid(order.uid);
    //console.log("orderResponse = " + orderResponse);
    ordersPutRQ(orderResponse);
  });
  // for (let i = 0; i < orders.length; i++) {
  //   let order = ordersGetByUid(uid);
  //   const newOrders = ordersPutRQ(orders);
  // }
}