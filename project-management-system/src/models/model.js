import client from '../database/db';

/**
 * Generic Model Class
 * Defines methods for CRUD operations with fetch
 */
class Model {
  /**
   * Constructor
   * @param {string} table Name of the table
   * @param {Object} columnTypes Names of columns along with data type (either string or number)
   */
  constructor(table, columnTypes) {
    this.table = table;
    this.columnTypes = columnTypes;
  }

  /**
   * Fetches all the records  from the table
   */
  all = () => {
    const sql = `SELECT * FROM ${this.table}`;

    return this.queryDatabase(sql);
  };

  /**
   * 
   * @param {integer} id 
   */
  find = (id) => {
    const sql = `SELECT * FROM ${this.table} WHERE id = ${id}`;

    return this.queryDatabase(sql);
  };

  /**
   * Inserts entity into the table
   * @param {Object} valueObject Contains field names with respective values
   */
  create = (valueObject) => {
    const columns = Object.keys(valueObject);
    const values = formatNonNumericValues(columns, Object.values(valueObject), this.columnTypes);

    const sql = `INSERT INTO ${this.table} (${columns.join(',')}) VALUES (${values.join(',')}) RETURNING id`;

    return this.queryDatabase(sql);
  };

  /**
   * Updates entity of the table
   * @param {integer} id 
   * @param {Object} valueObject Contains field names with respective values
   */
  update = (id, valueObject) => {
    const columns = Object.keys(valueObject);
    const values = formatNonNumericValues(columns, Object.values(valueObject), this.columnTypes);

    const sql = `UPDATE ${this.table} SET ${formKeyValue(
      columns,
      values
    )}, updated_at = CURRENT_TIMESTAMP WHERE id = ${id}`;

    return this.queryDatabase(sql);
  };

  /**
   * Deletes entity from the table
   * @param {integer} id 
   */
  destroy = (id) => {
    const sql = `DELETE FROM ${this.table} WHERE id = ${id}`;

    return this.queryDatabase(sql);
  };

  /**
   * Returns the filtered rows from the table
   * @param {Object} filterData An object containing fieldnames with values
   * @param {string} logicalOperator AND OR
   */
  filterBy(filterData, logicalOperator = 'AND') {
    const columns = Object.keys(filterData);
    const values = formatNonNumericValues(columns, Object.values(filterData), this.columnTypes);

    const sql = `SELECT * FROM ${this.table} WHERE ${formKeyValue(columns, values, logicalOperator + ' ')}`;

    return this.queryDatabase(sql);
  }

  /**
   * Sends sql to the database for execution
   * @param {string} sql 
   */
  queryDatabase = (sql) => {
    return new Promise((resolve, reject) => {
      client
        .query(sql)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        })
        .finally(() => {
          // client.end();
        });
    });
  };
}

/**
 * Formats the string values to include single quotation mark
 * @param {Array} columns 
 * @param {Array} values 
 * @param {Object} columnTypes 
 */
function formatNonNumericValues(columns, values, columnTypes) {
  columns.forEach((column, index) => {
    if (columnTypes[column] === 'string') values[index] = `'${values[index]}'`;
  });
  return values;
}

/**
 * Forms key = value pair separated by separator
 * @param {Array} columns 
 * @param {Array} values 
 * @param {string} separator 
 */
function formKeyValue(columns, values, separator = ', ') {
  let output = '';
  columns.forEach((column, index) => {
    output += `${column} = ${values[index]}`;
    if (index < columns.length - 1) {
      output += separator;
    }
  });

  return output;
}

export default Model;
