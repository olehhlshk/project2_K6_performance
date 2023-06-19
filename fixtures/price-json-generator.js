export function pricesJson() {
    return JSON.parse(body);
  }
  class pricesJsonGenerator {
    generatePricesJson(productsUidArray) {
      const pricesNumber = productsUidArray.length;
      let fixture = pricesJson();
      for (let i = 0; i < pricesNumber; i++) {
        let type = "regular";
        let value = "1100";
        let productUid = productsUidArray[i];
        fixture.data.push({ product_uid: productUid, type: type, value: value });
      }
      return JSON.stringify(fixture);
    }
  }
  export default new pricesJsonGenerator();