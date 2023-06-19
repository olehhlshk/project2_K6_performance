import faker from '../libs/shim/faker.js';
const body = `{
    "data": [
    ]
}`;
export function inventoryJson() {
    return JSON.parse(body);
}
    class inventoryJsonGenerator {
        generateInventoryJson(productsUidArray) {
            const inventoryNumber = productsUidArray.length;
            let fixture = inventoryJson();
            for( let i = 0; i < inventoryNumber; i++ ) {
                const availability = {
                    availability_control: true,
                    available_quantity: faker.random.number({max:999999, min:1})
                   };
                //let productUid = productsUidArray[i];
                let uid = productsUidArray[i];
                fixture.data.push({ "uid": uid, "availability":availability});
            }
            return JSON.stringify(fixture);
       }
    }
    export default new inventoryJsonGenerator();