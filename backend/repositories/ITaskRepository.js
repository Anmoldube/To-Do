/**
 * ITaskRepository — contract that every storage adapter must implement.
 *
 * All methods are async and must resolve with the shapes described below.
 * Throw an Error (or a subclass) when an operation fails; the controller
 * will forward it to Express's error handler via next(err).
 */
export class ITaskRepository {
  /**
   * Return an array of tasks matching the given filter.
   * Results must be sorted by `date` ascending.
   *
   * @param {{ q?: string, status?: string, priority?: string }} filter
   * @returns {Promise<Array>}
   */
  // eslint-disable-next-line no-unused-vars
  async list(filter) {
    throw new Error('ITaskRepository.list() not implemented');
  }

  /**
   * Return a single task by its ID, or null if not found.
   *
   * @param {string} id
   * @returns {Promise<object|null>}
   */
  // eslint-disable-next-line no-unused-vars
  async findById(id) {
    throw new Error('ITaskRepository.findById() not implemented');
  }

  /**
   * Create and persist a new task.
   *
   * @param {{ title: string, description?: string, date: string, priority?: string, status?: string }} payload
   * @returns {Promise<object>} the created task document
   */
  // eslint-disable-next-line no-unused-vars
  async create(payload) {
    throw new Error('ITaskRepository.create() not implemented');
  }

  /**
   * Apply partial updates to an existing task.
   * Returns the updated document, or null if the task was not found.
   *
   * @param {string} id
   * @param {object} data  partial task fields
   * @returns {Promise<object|null>}
   */
  // eslint-disable-next-line no-unused-vars
  async update(id, data) {
    throw new Error('ITaskRepository.update() not implemented');
  }

  /**
   * Delete a task by ID.
   * Returns the deleted document, or null if not found.
   *
   * @param {string} id
   * @returns {Promise<object|null>}
   */
  // eslint-disable-next-line no-unused-vars
  async delete(id) {
    throw new Error('ITaskRepository.delete() not implemented');
  }
}
