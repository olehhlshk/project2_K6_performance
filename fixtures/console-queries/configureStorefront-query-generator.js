export const configureStorefrontQuery = `
mutation configureStorefront($accountId: String!, $storefrontName: String, $primaryColor: String, $secondaryColor: String)
{
    configureStorefront(
      accountUi
      }
    ) {
      name
    }
}
`;