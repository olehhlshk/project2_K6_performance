export const allowedSellerBrandsQuery = `
query allowedSellerBrands($sellerUid: String!, $sort: SellerBrandsSortEnum, $pagination: PaginationInput)
{
    allowedSellerBrands(pagination: $pagination, sellerUid: $sellerUid, sort: $sort)
    {
       
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
     
        {
            status
            __typename
        }
    }
`;