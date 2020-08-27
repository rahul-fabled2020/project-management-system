import bcrypt from 'bcrypt';

import {TABLE} from '../../constants';

export function insertUsers(client) {
  const rounds = 10;

  const hash = bcrypt.hashSync('rahul123', rounds);

  const query = `
    INSERT INTO ${TABLE.users} (firstname, lastname, password, email) VALUES (
      'Rahul', 'Sharma', '${hash}', 'rahul.fabled@gmail.com'
    ),
    ('Chumlung', 'Limbu', '${hash}', 'chumlung@gmail.com'),
    ('Shradha', 'Neupane', '${hash}', 'shradha@gmail.com'),
    ('Lucky', 'Shrestha', '${hash}', 'lucky@gmail.com'),
    ('Prashant', 'Acharya', '${hash}', 'prashant@gmail.com'),
    ('Eliza', 'Raj Bhandari', '${hash}', 'eliza@gmail.com'),
    ('Aakriti', 'Neupane', '${hash}', 'aatu@gmail.com')    
  `;
  
  return client
    .query(query);
}
