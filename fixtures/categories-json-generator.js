import faker from '../libs/shim/faker.js';
const body = `{
    "supplier_uid": "sup_010F7ZV97J",
    "data": [
    ]
}`;
export function categoriesJson() {
    return JSON.parse(body);
}
class CategoriesJsonGenerator {
    generateCategoriesJson(categoriesNumber) {
       let fixture = categoriesJson();
       for( let i = 0; i < categoriesNumber; i++ ) {
           let name = faker.commerce.department() + ' ' + faker.commerce.productAdjective() + ' ' + faker.commerce.productMaterial();
           fixture.data.push({ "name": name });
       }
       return JSON.stringify(fixture);
   }
}
export default new CategoriesJsonGenerator();