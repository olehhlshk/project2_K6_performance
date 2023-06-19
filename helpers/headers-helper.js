import http from "k6/http";
import { sleep, check } from "k6";
let config = JSON.parse(open("../config/config.json"));
export function headerGenerate() {
  let params = {
    headers: {
      Authorization: config.headers.authorization,
      "Content-Type": "application/json",
    },
  };
  return params;
}
export function headerStorefrontGenerate() {
  let params = {
    headers: {
      "hq-storefront": config.storefrontSlugs.storefront,
      "hq-marketplace": config.storefrontSlugs.marketplace,
      "hq-session": config.storefrontSlugs.session,
      "Content-Type": "application/json",
    },
  };
  return params;
}
export function headerSellerConsoleGenerate() {
  let params = {
    headers: {
      "hq-context": config.sellerSessionState.context,
      "hq-session": config.sellerSessionState.session,
      "hq-marketplace": config.sellerSessionState.marketplaceId,
      "Content-Type": "application/json"
    },
  };
  return params;
}
export function headerSupervisorConsoleGenerate() {
  let params = {
    headers: {
      "hq-context": config.supervisorSessionState.context,
      "hq-session": config.supervisorSessionState.session,
      "hq-marketplace": config.supervisorSessionState.marketplaceId,
      "Content-Type": "application/json"
    },
  };
  return params;
}
export function headerMpoConsoleGenerate() {
  let params = {
    headers: {
      "hq-context": config.mpoSessionState.context,
      "hq-session": config.mpoSessionState.session,
      "hq-marketplace": config.mpoSessionState.marketplaceId,
      "Content-Type": "application/json"
    },
  };
  return params;
}