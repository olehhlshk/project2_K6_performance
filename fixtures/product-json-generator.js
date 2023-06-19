import faker from "../libs/shim/faker.js";
const body = `{
    "supplier_uid": "sup_01G3S8C9C918F16XBA0F7ZV97J",
    "data": [
    ]
}`;
export function productsJson() {
  return JSON.parse(body);
}
class productsJsonGenerator {
  generateProductsJson(productsNumber) {
    let fixture = productsJson();
    for (let i = 0; i < productsNumber; i++) {
      let sku = "sku " + faker.random.number({ max: 999999, min: 1111 });
      let name =
        faker.commerce.productName() +
        " " +
        faker.commerce.color() +
        " " +
        faker.random.number({ max: 950, min: 20 }) +
        "ml";
      let description = "test description";
      let active = true;
      const availability = {
        availability_control: true,
        available_quantity: 1111,
      };
      let brand_uid = "bra_01G51JRPX4C1H9DZ66TTBNXQNC";
      fixture.data.push({
        sku: sku,
        name: name,
        description: description,
        active: active,
        availability: availability,
        brand_uid: brand_uid,
      });
    }
    return JSON.stringify(fixture);
  }
}
export default new productsJsonGenerator();