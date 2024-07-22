export const ORDER = {
    API_PROPERTY: {
        CREATE: {
            SUMMARY: 'Creates an order register',
            DESC: 'Creates an order register in database',
        },
        GET_ALL: {
            SUMMARY: 'Gets all registered orders in database',
            DESC: 'Fetches all orders registered in database',
        },
        GET_BY_ID: {
            SUMMARY: 'Gets order by identifier',
            DESC: 'Fetches order register from database by identifier',
        },
        UPDATE: {
            SUMMARY: 'Updates order status register',
            DESC: 'Updates order status register in database by identifier',
        },
        ORDER: {
            ID: {
                DESC: 'Order identifier in database',
                EXAMPLE: '5671843b-324b-40ae-aaa8-a3b404013703',
            },
            ORDER_CODE: {
                DESC: 'Order code used to identify the order by the client',
                EXAMPLE: '10',
            },
            STATUS: {
                DESC: 'Order status in database',
                EXAMPLE: 'IN_PROGRESS',
            },
        }
    }
};