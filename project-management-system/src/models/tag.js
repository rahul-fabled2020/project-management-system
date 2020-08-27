import Model from './model';

import {TABLE} from '../constants';

const TABLE_NAME = TABLE.tags;
const COLUMN_TYPES = {
  id: 'number',
  tagged_user_id: 'number',
  tagged_by_id: 'number',
  task_id: 'number',
  created_at: 'string',
  updated_at: 'string'
};

/**
 * tag model.
 */
class Tag extends Model {
  constructor() {
    super(TABLE_NAME, COLUMN_TYPES);
  }

  /**
   * Get table name.
   */
  get tableName() {
    return TABLE_NAME;
  }
}

export default Tag;
