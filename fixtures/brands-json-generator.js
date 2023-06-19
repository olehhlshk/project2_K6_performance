export function brandsJson() {
    return JSON.parse(body);
}
class BrandJsonGenerator {
     generateBrandsJson(brandsNumber) {
        let fixture = brandsJson();
        for( let i = 0; i < brandsNumber; i++ ) {
            let name = 'AT ' + faker.company.companyName() + ' ' + faker.company.catchPhraseAdjective();
            fixture.data.push({ "name": name });
        }
        return JSON.stringify(fixture);
    }
}
export default new BrandJsonGenerator();