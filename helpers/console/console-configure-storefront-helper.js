import http from "k6/http";
import { sleep, check } from "k6";
import { headerSellerConsoleGenerate } from "../headers-helper.js";
import { configureStorefrontQuery } from "../../fixtures/console/cofigureStorefront-query-generator.js";
let config = JSON.parse(open("../../config/config.json"));
let params = headerSellerConsoleGenerate();
const url = config.console_url;
export function configureStorefrontRQ(storefrontName, accountId, primaryColor, secondaryColor) {
    let body = JSON.stringify({
      query: configureStorefrontQuery,
       variables:{
       accountId: accountId,
        storefrontName: storefrontName,
        primaryColor: primaryColor,
        secondaryColor: secondaryColor,
       }
    });
    let res = http.post(url, body, params);
    check(res, {
      "is status 200": (r) => r.status === 200,
    });
    console.log("configureStorefrontRQ Status = " + res.status);
    //console.log("configureStorefrontRQ response = " + res.body);
    return res;
  }