export const listBuyersQuery = `
query listBuyers($pagination: PaginationInput, $filter: AccountsFilterInput, $sort: AccountsSortEnum)
{
    buyers(pagination: $pagination, filter: $filter, sort: $sort)
    {
        
            role
            status
            marketplaceUid
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