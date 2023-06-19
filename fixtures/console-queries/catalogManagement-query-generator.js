export const allowedSellerBrandsQuery = `
query allowedSellerBrands($sellerUid: String!, $sort: SellerBrandsSortEnum, $pagination: PaginationInput)
{
    allowedSellerBrands(pagination: $pagination, sellerUid: $sellerUid, sort: $sort)
    {
        nodes
        {
            allowed
            sellerUid
            brand
            {
                uid
                name
                coverImage
                {
                    thumbUrl
                    __typename
                }
                __typename
            }
            __typename
        }
        pagination
        {
            perPage
            lastPage
            nextPage
            totalNodes
            totalPages
            currentPage
            __typename
        }
        __typename
    }
}
`;
export const detachSellerBrandQuery = `
mutation detachSellerBrand($brandUid: String!, $sellerUid: String!)
{
    detachSellerBrandMutation(
        brandUid: $brandUid,
        sellerUid: $sellerUid)
    {
        status
        __typename
    }
}
`;
export const attachSellerBrandQuery = `
mutation attachSellerBrand($brandUid: String!, $sellerUid: String!)
{
    attachSellerBrandMutation(
        brandUid: $brandUid,
        sellerUid: $sellerUid)
        {
            status
            __typename
        }
    }
`;