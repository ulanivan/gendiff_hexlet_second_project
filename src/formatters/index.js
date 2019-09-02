import plain from './plain';
import standard from './standard';
import json from './renderJson';

const rendererDispatcher = {
  plain,
  standard,
  json,
};

export default (format = 'standard') => rendererDispatcher[format];
