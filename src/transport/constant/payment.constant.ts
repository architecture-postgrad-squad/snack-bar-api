export const PAYMENT = {
  API_PROPERTY: {
    CREATE: {
      SUMMARY: 'Creates a payment register',
      DESC: 'Creates a payment register attached to an order in database',
    },
    PRODUCT: {
      ID: {
        DESC: 'Product identifier in database',
        EXAMPLE: '5671843b-324b-40ae-aaa8-a3b404013703',
      },
      VALUE: {
        DESC: 'Order value',
        EXAMPLE: 39.99,
      },
      METHOD: {
        DESC: 'Category in which the product is registered',
        EXAMPLE: 'Credit Card',
      },
    },
  },
};
