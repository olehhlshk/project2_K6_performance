import faker from "../libs/shim/faker.js";
const body = `{
    "data": [
    ]
}`;
export function orderJson() {
  return JSON.parse(body);
}
class ordersJsonGenerator {
  generateOrdersJson(orderItemUidArray) {
    const orderNumber = orderItemUidArray.length;
    let fixture = orderJson();
    for (let i = 0; i < orderNumber; i++) {
      let invoice_number = "test-invoice-number";
      let tracking_number = faker.random.number({ max: 999999, min: 1 });
      let shipping_number = faker.random.number({ max: 999999, min: 1 });
      let shipping_status = "shipping";
      let uid = orderItemUidArray[i];
      console.log(orderNumber);
      fixture.data.push({
        uid: uid,
        invoice_number: invoice_number,
        tracking_number: tracking_number,
        shipping_number: shipping_number,
        shipping_status: shipping_status,
      });
    }
    return JSON.stringify(fixture);
  }
}
export default new ordersJsonGenerator();