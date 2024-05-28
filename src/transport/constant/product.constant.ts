export const PRODUCT = {
  API_PROPERTY: {
    CREATE: {
      SUMMARY: 'Creates a product register',
      DESC: 'Creates a product register in database',
    },
    GET_ALL: {
      SUMMARY: 'Gets all registered products in database',
      DESC: 'Fetches all product register from database',
    },
    GET_BY_ID: {
      SUMMARY: 'Gets product by identifier',
      DESC: 'Fetches product register from database by identifier',
    },
    GET_BY_CATEGORY: {
      SUMMARY: 'Gets products by category',
      DESC: 'Fetches all product by category (BURGUER | SIDE_DISH | DESSERT | DRINK)',
    },
  },
  ID: {
    DESC: 'Product identifier in database',
    EXAMPLE: '5671843b-324b-40ae-aaa8-a3b404013703',
  },
  NAME: {
    DESC: 'Product name',
    EXAMPLE: 'X Bacon',
  },
  CATEGORY: {
    DESC: 'Category in which the product is registered',
    EXAMPLE: 'BURGUER',
  },
  PRICE: {
    DESC: 'Product price',
    EXAMPLE: 20.99,
  },
  DESCRIPTION: {
    DESC: 'Description of what to expect of product',
    EXAMPLE: 'X bacon with eggs and cheese',
  },
  IMAGES: {
    DESC: 'Visual description of product',
    EXAMPLE: 'EXAMPLEBLOB',
  },
};
