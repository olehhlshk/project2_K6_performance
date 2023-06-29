import faker from '../libs/shim/faker.js';
const body = `{
    "marketplace_uid": "com_01G4YZPVBM",
    "data": [
    ]
}`;
export function accountsJson() {
    return JSON.parse(body);
}
class accountsJsonGenerator {
     generateAccountsJson(accountsNumber) {
        let fixture = accountsJson();
        for( let i = 0; i < accountsNumber; i++ ) {
         let contact = {
             formal_name: faker.name.firstName() + ' ' + faker.name.lastName(),
             email: faker.internet.email(),
             phone: faker.phone.phoneNumber('+1##########')
            }
            fixture.data.push({ "contact": contact});
        }
        return JSON.stringify(fixture);
       }
    }
export default new accountsJsonGenerator();