import Model from './model';

const TABLE_NAME = 'comments';
const COLUMN_TYPES = {
  id: 'number',
  text: 'string',
  commenter_id: 'number',
  task_id: 'number',
  created_at: 'string',
  updated_at: 'string'
};

/**
 * Comment model.
 */
class Comment extends Model {
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

export default Comment;
