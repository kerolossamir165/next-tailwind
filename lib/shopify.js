let domain = process.env.SHOPIFY_STOREFRONT_DOMAIN;
let storeForntAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN;

async function shopifyData(query) {
  let URL = `${domain}api/2021-10/graphql.json`;

  let options = {
    endpoint: URL,
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": storeForntAccessToken,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  };

  try {
    let data = await fetch(URL, options).then((res) => {
      return res.json();
    });

    return data;
  } catch (error) {
    throw new Error("products not Fetched");
  }
}

export async function getProductsInCollections() {
  let query = `
    {
        collection(handle: "frontpage") {
          title
          products(first: 25) {
            edges {
              node {
                id
                title
                handle
                priceRange{
                  minVariantPrice {
                    amount
                  }
                }
                images(first: 25) {
                  edges{
                    node{
                      originalSrc
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      }
      
    `;
  let responce = await shopifyData(query);
  return responce.data.collection.products.edges ?? [];
}

export async function getAllProducts() {
  let query = `{
    products(first:250) {
      edges{
        node{
         handle
          id
        }
      }
    }
  }
  `;

  let responce = await shopifyData(query);
  return responce.data.products.edges ?? [];
}

export async function getProduct(handle) {
  let query = `
  {
    productByHandle(handle: "${handle}") {
      id
      title
      handle
      description
      images(first: 5){
        edges{
          node{
            originalSrc
            altText
          }
        }
      }
      options {
        name
        values
        id
        
      }
      variants(first: 25) {
        edges{
          node{
            selectedOptions{
              name 
              value
            }
            image{
              originalSrc
              altText
            }
            title
            id
            priceV2{
              amount
            }
          }
        }
      }
    }
  }
  
  `;

  let responce = await shopifyData(query);
  return responce.data.productByHandle ?? {};
}

export async function createCheckOut(id, quantity) {
  let query = `
  mutation{
    checkoutCreate(input: {
      lineItems:[{variantId: "${id}", quantity:${quantity}}]
    }){
      checkout{
        id
        webUrl
      }
    }
  }
  `;

  let responce = await shopifyData(query);
  return responce.data.checkoutCreate.checkout ?? {};
}

export async function updateCheckOut(id, lineItems) {
  let lineItemsObject = lineItems.map((line) => {
    return `
    {
      variantId: "${line.id}",
      quantity: ${line.variantQuantity}
    }`;
  });

  let query = `
    mutation {
      checkoutLineItemsReplace(lineItems:[${lineItemsObject}], checkoutId: "${id}") {
        checkout {
          id
          webUrl
          lineItems(first:25) {
            edges{
              node{
                id
                title
                quantity
              }
            }
          }
        }
     }
    }
  `;

  let responce = await shopifyData(query);
  console.log(responce);
  return responce.data?.checkoutLineItemsReplace.checkout ?? {};
}
