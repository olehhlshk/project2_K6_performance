export const currentConfigQuery = `
  query currentConfig {
    current {
      config {
        storefront {
          general {
            name
            primaryColorHex
            secondaryColorHex
            shopUrl
            logoImage {
              url
              __typename
            }
            longLogoImage {
              url
              __typename
            }
            __typename
          }
          checkout {
            allowedCountries
            allowedLanguage
            __typename
          }
          helpCenter {
            chatbotId
            url
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
export const homePageDataQuery = `
  query homePageData($itemsSort: ItemsSortEnum, $brandsSort: BrandsSortEnum, $categoriesSort: CategoriesSortEnum, $itemsFilter: ItemsFilterInput, $brandsFilter: BrandsFilterInput) {
    items(sort: $itemsSort, pagination: {page: 1, perPage: 20}, filter: $itemsFilter) {
      nodes {
        brand {
          name
          slug
          uid
          __typename
        }
        categories {
          name
          slug
          uid
          __typename
        }
        description
        primaryImage {
          url
          __typename
        }
        name
        prices {
          currencyCode
          currencySign
          type
          value
          __typename
        }
        slug
        uid
        availability {
          availableQty
          availabilityControl
          outOfStockThreshold
          __typename
        }
        __typename
      }
      __typename
    }
    brands(sort: $brandsSort, filter: $brandsFilter) {
      nodes {
        uid
        name
        slug
        coverImage {
          url
          __typename
        }
        __typename
      }
      __typename
    }
    categories(sort: $categoriesSort) {
      nodes {
        uid
        name
        slug
        coverImage {
          url
          __typename
        }
        __typename
      }
      __typename
    }
    promotionBanners {
      nodes {
        clickUrl
        name
        placement
        uid
        bannerImage {
          uid
          url
          __typename
        }
        __typename
      }
      __typename
    }
  }
  `;
export const getItemBySlugQuery = `
  query getItemBySlug($itemSlug: String) {
    items(filter: {slugEq: $itemSlug}) {
      nodes {
        brand {
          name
          slug
          uid
          __typename
        }
        categories {
          name
          slug
          uid
          __typename
        }
        description
        primaryImage {
          url
          __typename
        }
        name
        prices {
          currencyCode
          currencySign
          type
          value
          __typename
        }
        slug
        uid
        availability {
          availableQty
          availabilityControl
          outOfStockThreshold
          __typename
        }
        __typename
      }
      __typename
    }
  }
`;
export const getItemsAvailabilityQuery = `
  query getItemsAvailability($filter: ItemsFilterInput) {
    items(filter: $filter) {
      nodes {
        uid
        availability {
          availableQty
          availabilityControl
          __typename
        }
        __typename
      }
      __typename
    }
  }
`;
export const createOrderAccountMutation = `
  mutation createOrderAccount($input: CreateBuyerInput!) {
    createOrderBuyer(buyerInput: $input) {
      identifier
      uid
      __typename
    }
  }
`;
export const createAddressMutation = `
  mutation createAddress($accountUid: String!, $input: AddressInput!) {
    createAddress(accountUid: $accountUid, input: $input) {
      uid
      __typename
    }
  }
`;
export const createOrderMutationMutation = `
  mutation createOrder($orderedItems: [OrderItemInput!]!, $buyerUid: String!, $shippingAddressUid: String!) {
    createOrder(orderedItems: $orderedItems, buyerUid: $buyerUid, shippingAddressUid: $shippingAddressUid) {
      uid
      __typename
    }
  }
`;
export const createCheckoutMutation = `
  mutation createCheckout($orderUid: String!, $backLinks: CheckoutBackLinksInput!) {
    createCheckout(backLinks: $backLinks, orderUid: $orderUid) {
      remoteSession {
        id
        __typename
      }
      __typename
    }
  }
`;
export const searchProductsQuery = `
  query searchProductsQueries($query: String!, $pagination: PaginationInput, $filter: SearchFilterInput) {
    search(query: $query, pagination: $pagination, filter: $filter) {
      items {
        nodes {
          brand {
            name
            slug
            uid
            __typename
          }
          categories {
            name
            slug
            uid
            __typename
          }
          description
          primaryImage {
            url
            __typename
          }
          name
          prices {
            currencyCode
            currencySign
            type
            value
            __typename
          }
          slug
          uid
          availability {
            availableQty
            availabilityControl
            outOfStockThreshold
            __typename
          }
          __typename
        }
        pagination {
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
      __typename
    }
  }
`;
export const recommendationsQuery = `
query recommendations($pagination: PaginationInput) {
  recommendations(pagination: $pagination) {
    nodes {
      brand {
        name
        slug
        uid
        __typename
      }
      categories {
        name
        slug
        uid
        __typename
      }
      description
      primaryImage {
        url
        __typename
      }
      name
      prices {
        currencyCode
        currencySign
        type
        value
        __typename
      }
      slug
      uid
      availability {
        availableQty
        availabilityControl
        outOfStockThreshold
        lowInStockThreshold
        __typename
      }
      __typename
    }
    pagination {
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