import "./libs/shim/core.js";
import { searchAccountRQ, searchAccountMpoRQ } from "./helpers/console/searchHelpers/accounts-search-request-helper.js";
import { searchProductRQ } from "./helpers/console/searchHelpers/product-search-request-helper.js";
import { searchSellerItemRQ, searchSellerItemMpoRQ, searchSellerItemSellerRQ } from "./helpers/console/searchHelpers/sellerItems-search-request-helper.js";
import { searchOrderRQ, searchOrderMpoRQ, searchOrderSellerRQ } from "./helpers/console/searchHelpers/order-search-request-helper.js";
import faker from "../K6-Load-Testing/libs/shim/faker.js";
const marketplaceUid = "com_01G77ED7TJWBV2K3C862C6MDSD";
const supplierUid = "sup_01G9G68K8EVMG5FV9F7PE0MR59";
const sellerUid = "acc_01GQS8SX19CR74YYB0CWZZSDFQ";
export const options = {
    thresholds: {
        http_req_failed: ["rate<0.01"], // http errors should be less than 1%
        http_req_duration: ["p(95)<2000"], // 95% of requests should be below 200ms
      },
      discardResponseBodies: false,
      scenarios: {
        Scenario_1_search_order_query: {
          executor: "ramping-arrival-rate",
          exec: "Scenario_1_search_order_query",
          tags: { test_type: "Scenario_1_search_order_query" },
          startRate: 13,
          timeUnit: "1s",
          preAllocatedVUs: 20,
          maxVUs: 5000,
          stages: [
            { target: 5, duration: "1m" },
            { target: 10, duration: "1m" },
            { target: 15, duration: "1m" },
            { target: 20, duration: "1m" },
            { target: 10, duration: "1m" },
            { target: 3, duration: "1m" },
          ],
        },
        Scenario_2_search_accounts_query: {
          executor: "ramping-arrival-rate",
          exec: "Scenario_2_search_accounts_query",
          tags: { test_type: "Scenario_2_search_accounts_query" },
          startRate: 13,
          timeUnit: "1s",
          preAllocatedVUs: 20,
          maxVUs: 5000,
          stages: [
            { target: 5, duration: "1m" },
            { target: 10, duration: "1m" },
            { target: 15, duration: "1m" },
            { target: 20, duration: "1m" },
            { target: 10, duration: "1m" },
            { target: 3, duration: "1m" },
          ],
        },
        Scenario_3_search_product_query: {
          executor: "ramping-arrival-rate",
          exec: "Scenario_3_search_product_query",
          tags: { test_type: "Scenario_3_search_product_query" },
          startRate: 13,
          timeUnit: "1s",
          preAllocatedVUs: 20,
          maxVUs: 5000,
          stages: [
            { target: 5, duration: "1m" },
            { target: 10, duration: "1m" },
            { target: 15, duration: "1m" },
            { target: 20, duration: "1m" },
            { target: 10, duration: "1m" },
            { target: 3, duration: "1m" },
          ],
        },
        Scenario_4_search_sellerItems_query: {
          executor: "ramping-arrival-rate",
          exec: "Scenario_4_search_sellerItems_query",
          tags: { test_type: "Scenario_4_search_sellerItems_query" },
          startRate: 13,
          timeUnit: "1s",
          preAllocatedVUs: 20,
          maxVUs: 5000,
          stages: [
            { target: 5, duration: "1m" },
            { target: 10, duration: "1m" },
            { target: 15, duration: "1m" },
            { target: 20, duration: "1m" },
            { target: 10, duration: "1m" },
            { target: 3, duration: "1m" },
          ],
        },
      },
    };
    // Scenario 1- test orders query
    // Seller searches order by (order number, buyer las and first name)
    // Supervisor searches  order by (order number, storefront name, buyer first name)
    // MPO searches orders by (order number, buyer first name)
export function Scenario_1_search_order_query() {
  const nameBuyer = faker.name.firstName();
  const lastBuyerName = faker.name.lastName();
  const zipAddress = faker.address.zipCode('#####');
    searchOrderSellerRQ(marketplaceUid, nameBuyer);
    searchOrderSellerRQ(marketplaceUid, lastBuyerName);
    searchOrderSellerRQ(marketplaceUid);
    searchOrderRQ(marketplaceUid);
    searchOrderRQ(marketplaceUid, nameBuyer);
    searchOrderRQ(marketplaceUid, zipAddress);
    searchOrderMpoRQ(marketplaceUid);
    searchOrderMpoRQ(marketplaceUid, nameBuyer);
}
    // Scenario 2 - test account search query
    // Supervisor searches account by(name, last name, storefront name, email)
    // Mpo searches accounts by (name)
export function Scenario_2_search_accounts_query() {
  const lastName = faker.name.lastName();
  const zipAddress = faker.address.zipCode('#####');
  const fullName = faker.name.firstName() + faker.name.lastName();
  const storefrontName = faker.random.word();
    searchAccountRQ(marketplaceUid);
    searchAccountRQ(marketplaceUid, lastName);
    searchAccountRQ(marketplaceUid, fullName);
    searchAccountRQ(marketplaceUid, zipAddress);
    searchAccountMpoRQ(marketplaceUid, fullName);
    searchAccountMpoRQ(marketplaceUid, storefrontName);
}
    // Scenario 3 test product search query
    // supervisor is searching product by (sku, product description, product name)
export function Scenario_3_search_product_query() {
  const price = faker.address.zipCode('#####');
  const sku = faker.address.zipCode('#####');
  const productName = faker.commerce.productName();
    searchProductRQ(supplierUid);
    searchProductRQ(supplierUid, sku);
    searchProductRQ(supplierUid, productName);
    searchProductRQ(supplierUid, price);
}
    // Scenario 3 test seller items query
    // Seller searches items by ( sku, product description, product name)
    // MPO searches items by (sku, description )
    // Supervisor searches items by (sku, product name)
export function Scenario_4_search_sellerItems_query() {
  const price = faker.address.zipCode('##');
  const sku = faker.address.zipCode('#####');
  const productName = faker.commerce.productName();
    searchSellerItemRQ(sellerUid, sku);
    searchSellerItemRQ(sellerUid, productName);
    searchSellerItemMpoRQ(sellerUid);
    searchSellerItemSellerRQ(sellerUid);
    searchSellerItemSellerRQ(sellerUid, sku);
    searchSellerItemSellerRQ(sellerUid, price)
}