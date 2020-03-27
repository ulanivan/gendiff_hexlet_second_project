export default (ast) => {
  const getSpace = depth => '  '.repeat(depth);

  const stringify = (value, depth) => {
    if (value instanceof Object) {
      const valueKeys = Object.keys(value);
      const stringWithNormalizedValuesSpaces = valueKeys.map(key => `${getSpace(depth + 3)}${key}: ${value[key]}\n`);
      return `{\n${stringWithNormalizedValuesSpaces}${getSpace(depth + 1)}}`;
    }
    return value;
  };
  const getStringTypeNode = (node, depth, render) => {
    const {
      type, keyName, oldVal, newVal, children,
    } = node;
    const stringifyNewVal = stringify(newVal, depth);
    const stringifyOldVal = stringify(oldVal, depth);
    const dispatcher = {
      add: () => `+ ${keyName}: ${stringifyNewVal}`,
      delete: () => `- ${keyName}: ${stringifyOldVal}`,
      unchange: () => `  ${keyName}: ${stringifyOldVal}`,
      upgrade: () => [`- ${keyName}: ${stringifyOldVal}`, `${getSpace(depth)}+ ${keyName}: ${stringifyNewVal}`].join('\n'),
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

  const result = render(ast).join('\n');
  return `{\n${result}\n}`;
};
