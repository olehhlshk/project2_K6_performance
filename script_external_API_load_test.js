import "./libs/shim/core.js";
import { brandsGetRQ, brandsPostRQ } from "./helpers/api/brands-requests-helper.js";
import { ordersGetRQ } from "./helpers/api/orders-requests-helper.js";
import { productsGetRQ, productsPostRQ } from "./helpers/api/products-requests-helper.js";
import { categoriesGetRQ, categoriesPostRQ } from "./helpers/api/categories-requests-helper.js";
import { suppliersGetRQ } from "./helpers/api/suppliers-requests-helper.js";
import { marketplacesGetRQ } from "./helpers/api/marketplaces-requests-helper.js";
import { accountsGetRQ, accountsPostRQ } from "./helpers/api/accounts-requests-helper.js";
import { restrictionsGetRQ } from "./helpers/api/restrictions-request-helper.js";
import { pricesPostRQ } from "./helpers/api/prices-request-helper.js";
export const options = {
    discardResponseBodies: false,
    scenarios: {
      allGetRQ: {
        //Execution and scenarios are higly dependent on exexutor's type. In our case it's constant-arrival-rate. read more https://k6.io/docs/using-k6/scenarios/executors/constant-arrival-rate/
        executor: 'constant-arrival-rate',
        exec: 'allGetRQ',
        tags: { test_type: 'allGetRQ' },
        //delays start of the scenario by specified time
        startTime: '1s',
        // Duration of the test is set to 10s. https://k6.io/docs/using-k6/options/#duration
        duration: '2s',
        // It should start 1 iterations per `timeUnit`.
        //Note that iterations starting points will be evenly spread across the `timeUnit` period
        rate: 1,
        // It should start `rate` iterations per second
        timeUnit: '1s',
        // It should preallocate 1 VUs before starting the test. Number of VUs to pre-allocate before test start to preserve runtime resources.
        preAllocatedVUs: 1,
        // It is allowed to spin up to 50 maximum VUs in order to sustain the defined
        // Maximum number of VUs to allow during the test run.
        maxVUs: 50,
      },
    brandsPost: {
        executor: 'constant-arrival-rate',
        exec: 'brandsPost',
        tags: { test_type: 'brandsPost' },
        duration: '2s',
        rate: 1,
        timeUnit: '1s',
        preAllocatedVUs: 1,
        maxVUs: 50,
      },
      categoriesPost: {
        executor: 'constant-arrival-rate',
        exec: 'categoriesPost',
        tags: { test_type: 'categoriesPost' },
        duration: '2s',
        rate: 1,
        timeUnit: '1s',
        preAllocatedVUs: 1,
        maxVUs: 50,
      },
      accountsPost: {
        executor: 'constant-arrival-rate',
        exec: 'accountsPost',
        tags: { test_type: 'accountsPost' },
        duration: '2s',
        rate: 1,
        timeUnit: '1s',
        preAllocatedVUs: 1,
        maxVUs: 50,
      },
      productsPost: {
        executor: 'constant-arrival-rate',
        exec: 'productsPost',
        tags: { test_type: 'productsPost' },
        duration: '2s',
        rate: 1,
        timeUnit: '1s',
        preAllocatedVUs: 1,
        maxVUs: 50,
      },
    },
    thresholds: {
      // we can set different thresholds for the different scenarios because of the extra metric tags we set!
      'http_req_duration{test_type:brandsPost}': ['p(95)<300', 'p(99)<350'],
      'http_req_duration{test_type:categoriesPost}': ['p(95)<300', 'p(99)<350'],
      'http_req_duration{test_type:accountsPost}': ['p(95)<300', 'p(99)<350'],
      'http_req_duration{test_type:productsPost}': ['p(95)<300', 'p(99)<350'],
      // 'http_req_failed{test_type:brandsPost}': ['rate<0.01'],
      'http_req_duration{test_type:allGetRQ}': ['p(95)<300', 'p(99)<350'],
      // 'http_req_failed{test_type:brandsPost}': ['rate<0.01'],
    },
  };
  export function allGetRQ() {
    brandsGetRQ();
    ordersGetRQ();
    productsGetRQ();
    categoriesGetRQ();
    suppliersGetRQ();
    marketplacesGetRQ();
    accountsGetRQ();
    restrictionsGetRQ();
  }
  export function brandsPost() {
   let res = brandsPostRQ();
  }
  export function categoriesPost() {
    let res = categoriesPostRQ();
  }
  export function accountsPost() {
    let res = accountsPostRQ();
  }
  export const productsPost = () => {
    let product = productsPostRQ(3);
    const price = pricesPostRQ(product);
  }