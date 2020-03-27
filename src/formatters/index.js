import plain from './plain';
import standard from './tree';
import json from './json';

const rendererDispatcher = {
  plain,
  standard,
  json,
};

export default (format = 'standard') => rendererDispatcher[format];
