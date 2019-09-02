import plain from './plain';
import standard from './standard';

const rendererDispatcher = {
  plain,
  standard,
};

export default (format = 'standard') => rendererDispatcher[format];
