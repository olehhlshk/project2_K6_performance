let config = JSON.parse(open("../config/config_pav.json"));
export function headerGenerate() {
  let params = {
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": config.headers.Key,
    },
  };
  return params;
}