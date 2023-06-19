import http from "k6/http";
import { sleep, check } from "k6";
import { headerSellerConsoleGenerate } from "../headers-helper.js";
import { detachSellerBrandQuery, allowedSellerBrandsQuery, attachSellerBrandQuery } from "../../fixtures/console/catalogManagment-query-generator.js";
let config = JSON.parse(open("../../config/config.json"));
let params = headerSellerConsoleGenerate();
const url = config.console_url;
export function allowedSellerBrandsRQ(sellerUid) {
    const parameters = `{"page": 1, "perPage": 20}`;
    let body = JSON.stringify({
      query: allowedSellerBrandsQuery,
      variables: {
        sort: "brandNameAsc",
        sellerUid: sellerUid,
        pagination: JSON.parse(parameters),
      },
    });
    let res = http.post(url, body, params);
    check(res, {
      "is status 200": (r) => r.status === 200,
    });
    console.log("allowedSellerBrandsQuery Status = " + res.status);
    //console.log("allowedSellerBrandsQuery response = " + res.body);
    return res;
  }
export function deatachBrandRQ(brandUid, sellerUid) {
    let body = JSON.stringify({
      query: detachSellerBrandQuery,
       variables:{
       sellerUid: sellerUid,
        brandUid: brandUid,
       }
    });
    let res = http.post(url, body, params);
    check(res, {
      "is status 200": (r) => r.status === 200,
    });
    console.log("deatachBrandRQ Status = " + res.status);
    //console.log("deatachBrandRQ response = " + res.body);
    return res;
  }
  export function attachBrandRQ(brandUid, sellerUid) {
    let body = JSON.stringify({
      query: attachSellerBrandQuery,
       variables:{
       sellerUid: sellerUid,
        brandUid: brandUid,
       }
    });
    let res = http.post(url, body, params);
    check(res, {
      "is status 200": (r) => r.status === 200,
    });
    console.log("attachBrandRQ Status = " + res.status);
    //console.log("attachBrandRQ response = " + res.body);
    return res;
  }