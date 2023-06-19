export const configureStorefrontQuery = `
mutation configureStorefront($accountId: String!, $storefrontName: String, $primaryColor: String, $secondaryColor: String)
{
    configureStorefront(
      accountUid: $accountId,
      storefrontInput: {
        name: $storefrontName,
        primaryColor: $primaryColor,
        secondaryColor: $secondaryColor,
      }
    ) {
      name
    }
}
`;