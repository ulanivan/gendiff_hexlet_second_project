import _ from 'lodash';

export default (ast) => {
  const getSpace = depth => '  '.repeat(depth);

  const stringify = (value, depth) => (
    value instanceof Object ? `{\n${Object.keys(value).map(key => `${getSpace(depth + 3)}${key}: ${value[key]}\n`)}${getSpace(depth + 1)}}` : value);

  const getStringTypeNode = (node, depth, render) => {
    const {
      type, keyName, oldVal, newVal, children,
    } = node;
    const dispatcher = {
      add: () => `+ ${keyName}: ${stringify(newVal, depth)}`,
      delete: () => `- ${keyName}: ${stringify(oldVal, depth)}`,
      unchange: () => `  ${keyName}: ${stringify(oldVal, depth)}`,
      upgrade: () => [`- ${keyName}: ${stringify(oldVal, depth)}`, `${getSpace(depth)}+ ${keyName}: ${stringify(newVal, depth)}`].join('\n'),
      passforchildren: () => `  ${keyName}: {\n${render(children, depth + 2).join('\n')}\n${getSpace(depth + 1)}}`,
    };
    return dispatcher[type]();
  };
  const render = (nodes, depth = 1) => nodes
    .map((node) => {
      const tab = getSpace(depth);
      const line = getStringTypeNode(node, depth, render);
      return `${tab}${line}`;
    });

  const result = _.flatten(render(ast)).join('\n');
  return `{\n${result}\n}`;
};
