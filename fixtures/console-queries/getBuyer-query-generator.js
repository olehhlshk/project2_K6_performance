export const getBuyerQuery = `
query getBuyerDetail($accountId: String!)
{
    buyers(filter: {uidEq: $accountId})
    {
        nodes
        {
            uid
            userUid
            contact
            {
                email
                formalName
                phone
                __typename
            }
            createdAt
            addresses
            {
                city
                countryCode
                postalCode
                stateCode
                streetLine1
                streetLine2
                type
                uid
                __typename
            }
role
            status
            marketplaceUid
            parent
            {
                uid
                contact
                {
                    formalName
                    __typename
                }
                __typename
            }
            __typename
        }
        __typename
    }
}
`;