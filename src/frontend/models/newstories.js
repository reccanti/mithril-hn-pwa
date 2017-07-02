import List from './list'

/**
 * A model to store the Top Stories list
 */
const newstories = new List("http://localhost:8000/api/newstories");
export default newstories;