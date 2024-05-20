export const CLIENT = {
  API_PROPERTY: {
    CREATE: {
      SUMMARY: 'Creates a client register',
      DESC: 'Creates a client register in database',
    },
    GET_ALL: {
      SUMMARY: 'Gets all registered clients in database',
      DESC: 'Fetches all clients registered in database',
    },
    GET_BY_ID: {
      SUMMARY: 'Gets client by identifier',
      DESC: 'Fetches client register from database by identifier',
    },
    GET_BY_CPF: {
      SUMMARY: 'Gets client by CPF',
      DESC: 'Fetches client register from database by CPF',
    },
    UPDATE: {
      SUMMARY: 'Updates client register',
      DESC: 'Updates client register in database by identifier',
    },
    CLIENT: {
      ID: {
        DESC: 'Client identifier in database',
        EXAMPLE: '5671843b-324b-40ae-aaa8-a3b404013703',
      },
      CPF: {
        DESC: 'Client unique Cadastro de Pessoa física (CPF)',
        EXAMPLE: '17256987564',
      },
      NAME: {
        DESC: 'Client name',
        EXAMPLE: 'Bilbo Baggins',
      },
      EMAIL: {
        DESC: 'Client email',
        EXAMPLE: 'bilbo.baggins@tlotr.com',
      },
    },
  },
};
