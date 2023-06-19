import "./libs/shim/core.js";
import faker from "../K6-Load-Testing/libs/shim/faker.js";
import {
    dashboardTokenGetRQ,
    meAccountGetRQ,
    myMarketplaceGetRQ,
} from "./helpers/console/console-request-helper.js";
import { listOrders, getOrder,} from "./helpers/console/console-orders-request-helper.js";
//import {marketplacesDetails} from "./helpers/console/console-marketplaceDetails-request-helper.js";
import { listBuyers, getBuyer } from "./helpers/console/console-buyers-requests-helper.js";
import { releaseDocsGetRQ } from "./helpers/console/console-releaseDocs-request-helper.js";
import { configureStorefrontRQ } from "./helpers/console/console-cofigureStorefront-request-helper.js";
import { updateAccountRQ } from "./helpers/console/console-updateAccount-request-helper.js";
import { updateAddressRQ } from "./helpers/console/console-updateAddress-request-helper.js";
import {deatachBrandRQ, allowedSellerBrandsRQ, attachBrandRQ} from "./helpers/console/console-catalog-request-helper.js";
const marketplaceUid = "com_01G6MX7AR2RPQAKA9N3D9S3WF5";
const orderId = "ord_01GKK17F7CTQ92MD01BYHSB1Z1";
const buyerAccountId = "acc_01G6MZ3XC1YNXQ5M3K7652PHJX";
const storefrontName = faker.commerce.productName();
const sellerAccountId = "acc_01G6WRTAE0NFKEVVWBZZ9S28RK";
const primaryColor =  "#"+faker.random.number(999999);
const secondaryColor = "#"+faker.random.number(999999);
const formalName = faker.name.lastName();
const addressUid = "adr_01G6WRTWJHFN7T1D0J1B9GJN09";
const type = "shipping";
const streetLine1 = faker.address.streetAddress();
const city = faker.address.city();
const stateCode = faker.address.stateAbbr();
const postalCode = faker.address.zipCode('#####');
const countryCode = "US";
const brandUid = "bra_01GK4TXQ9EGVASNQ9R6W3D05MX";
export const options = {
    thresholds: {
        http_req_failed: ["rate<0.01"], // http errors should be less than 1%
        http_req_duration: ["p(95)<2000"], // 95% of requests should be below 200ms
      },
      discardResponseBodies: false,
      scenarios: {
        Scenario1_day_to_day_use: {
          executor: "ramping-arrival-rate",
          exec: "Scenario1_day_to_day_use",
          tags: { test_type: "Scenario1_day_to_day_use" },
          startRate: 13,
          timeUnit: "1s",
          preAllocatedVUs: 26,
          maxVUs: 5000,
          stages: [
            { target: 26, duration: "5m" },
            { target: 28, duration: "20m" },
            { target: 30, duration: "20m" },
            { target: 34, duration: "20m" },
            { target: 25, duration: "10m" },
          ],
        },
        Scenario2_Seller_rare_action: {
            executor: "ramping-arrival-rate",
            exec: "Scenario2_Seller_rare_action",
            tags: { test_type: "Scenario2_Seller_rare_action" },
            startRate: 1,
            timeUnit: "1s",
            preAllocatedVUs: 13,
            maxVUs: 5000,
            stages: [
                { target: 13, duration: "5m" },
                { target: 14, duration: "20m" },
                { target: 15, duration: "20m" },
                { target: 16, duration: "20m" },
                { target: 10, duration: "10m" },
            ],
          },
          Scenario3_Seller_super_rare_action: {
            executor: "ramping-arrival-rate",
            exec: "Scenario3_Seller_super_rare_action",
            tags: { test_type: "Scenario3_Seller_super_rare_action" },
            startRate: 1,
            timeUnit: "1s",
            preAllocatedVUs: 13,
            maxVUs: 5000,
            stages: [
                { target: 13, duration: "5m" },
                { target: 14, duration: "20m" },
                { target: 15, duration: "20m" },
                { target: 16, duration: "20m" },
                { target: 10, duration: "10m" },
            ],
          },
      },
    };
//     Scenario 1 (everyday actions)
// *    check dashboard info
// *    Check orders list
// *    Open order details
export function Scenario1_day_to_day_use() {
    meAccountGetRQ();
    myMarketplaceGetRQ();
    dashboardTokenGetRQ();
    listOrders(marketplaceUid);
    getOrder(orderId, marketplaceUid);
}
// Scenario 2 (rarely actions)
// *    go through onboarding
// *    Make wholesale order
// *    Open their storefront
// *    Open buyers list
// *    Open buyer details
export function Scenario2_Seller_rare_action() {
    listBuyers();
    getBuyer(buyerAccountId);
    listOrders(marketplaceUid);
}
// Scenario 3 (super rarely actions)
// *    open release notes
// *    Select/deselect products in catalog
// *    Update their personal information in settings
// *    Update storefront
export function Scenario3_Seller_super_rare_action() {
    meAccountGetRQ();
    myMarketplaceGetRQ();
    dashboardTokenGetRQ();
    listOrders(marketplaceUid);
    configureStorefrontRQ(storefrontName, sellerAccountId, primaryColor, secondaryColor);
    releaseDocsGetRQ();
    updateAccountRQ(formalName, sellerAccountId);
    updateAddressRQ(streetLine1, addressUid, city, stateCode, postalCode, type, countryCode);
    allowedSellerBrandsRQ(sellerAccountId);
    deatachBrandRQ(brandUid, sellerAccountId);
    attachBrandRQ(brandUid, sellerAccountId);
}
// export function openSellerDashboard() {
//     meAccountGetRQ();
//     myMarketplaceGetRQ();
//     dashboardTokenGetRQ();
// }
// export function checksOrders() {
//     listOrders(marketplaceUid);
//     getOrder(orderId, marketplaceUid);
// }
// export function checksByers() {
//     listBuyers();
//     getBuyer(buyerAccountId);
// }
// export function openReleaseDocs() {
//     releaseDocsGetRQ();
// }
// export function saveNewStorefront() {
//     configureStorefrontRQ(storefrontName, sellerAccountId, primaryColor, secondaryColor);
// }
// export function updateAccount() {
//     updateAccountRQ(formalName, sellerAccountId);
// }
// export function updateAddress() {
//     updateAddressRQ(streetLine1, addressUid, city, stateCode, postalCode, type, countryCode);
// }
// export function allowedBrands() {
//     allowedSellerBrandsRQ(sellerAccountId);
//     deatachBrandRQ(brandUid, sellerAccountId);
//     attachBrandRQ(brandUid, sellerAccountId);
// }