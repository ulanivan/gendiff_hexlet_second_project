import _ from 'lodash';

const getHeadKey = (heads, key) => [...heads, key].join('.');

const checkComplexValue = value => (
  value instanceof Object ? '[complex value]' : value);

const dispatcher = {
  add: (node, head) => `Property ${getHeadKey(head, node.keyName)} was added with value: ${checkComplexValue(node.newVal)}`,
  delete: (node, head) => `Property ${getHeadKey(head, node.keyName)} was removed`,
  unchange: () => null,
  upgrade: (node, head) => `Property ${getHeadKey(head, node.keyName)} was updated. From ${checkComplexValue(node.oldVal)} to ${checkComplexValue(node.newVal)}`,
  passforchildren: (node, head, render) => (
    render(node.children, [...head, node.keyName])),
};

export default (ast) => {
  const iter = (nodes, head = []) => nodes.map(node => dispatcher[node.type](node, head, iter));

  return _.flattenDeep(iter(ast))
    .filter(item => item !== null)
    .join('\n');
};
