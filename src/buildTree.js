import _ from 'lodash';

const buildNode = (type, keyName, oldVal = null, newVal = null, children) => ({
  type,
  keyName,
  oldVal,
  newVal,
  children,
});

const typeDispatcher = [
  {
    check: (data1, data2, key) => (
      data1[key] instanceof Object && data2[key] instanceof Object),
    buildNode: (data1, data2, key, fn) => {
      const children = fn(data1[key], data2[key]);
      return buildNode('passforchildren', key, null, null, children);
    },
  },
  {
    check: (data1, data2, key) => data1[key] === data2[key],
    buildNode: (data1, data2, key) => buildNode('unchange', key, data1[key], data2[key]),
  },
  {
    check: (data1, data2, key) => (_.has(data1, key) && _.has(data2, key)),
    buildNode: (data1, data2, key) => buildNode('upgrade', key, data1[key], data2[key]),
  },
  {
    check: (data1, data2, key) => (!_.has(data1, key) && _.has(data2, key)),
    buildNode: (data1, data2, key) => buildNode('add', key, null, data2[key]),
  },
  {
    check: (data1, data2, key) => (_.has(data1, key) && !_.has(data2, key)),
    buildNode: (data1, data2, key) => buildNode('delete', key, data1[key], null),
  },
];

const buildTree = (dataFirstFile, dataSecondFile) => {
  const dataKeys = _.union(Object.keys(dataFirstFile), Object.keys(dataSecondFile));

  return dataKeys.map((key) => {
    const findBuild = typeDispatcher.find(({ check }) => check(dataFirstFile, dataSecondFile, key));
    return findBuild.buildNode(dataFirstFile, dataSecondFile, key, buildTree);
  });
};

export default buildTree;
