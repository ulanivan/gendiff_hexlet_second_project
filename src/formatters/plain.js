import _ from 'lodash';

const getHeadKey = (heads, key) => [...heads, key].join('.');

const showValue = value => (
  value instanceof Object ? '[complex value]' : value);

const dispatcher = {
  add: (node, head) => `Property ${getHeadKey(head, node.keyName)} was added with value: ${showValue(node.newVal)}`,
  delete: (node, head) => `Property ${getHeadKey(head, node.keyName)} was removed`,
  unchange: () => null,
  upgrade: (node, head) => `Property ${getHeadKey(head, node.keyName)} was updated. From ${showValue(node.oldVal)} to ${showValue(node.newVal)}`,
  passforchildren: (node, head, render) => (
    _.flatten(render(node.children, [...head, node.keyName]))),
};

export default (ast) => {
  const iter = (nodes, head = []) => nodes.map(node => dispatcher[node.type](node, head, iter));

  return _.flatten(iter(ast))
    .filter(item => item !== null)
    .join('\n');
};
