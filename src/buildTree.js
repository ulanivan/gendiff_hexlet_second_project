import _ from 'lodash';

const buildNode = (type, keyName, oldVal = null, newVal = null, children) => ({
  type,
  keyName,
  oldVal,
  newVal,
  children,
});

const buildTree = (dataFirstFile, dataSecondFile) => {
  const dataKeys = _.union(Object.keys(dataFirstFile), Object.keys(dataSecondFile));

  return dataKeys.reduce((acc, key) => {
    const dataFirstValue = dataFirstFile[key];
    const dataSecondValue = dataSecondFile[key];

    if (dataFirstValue instanceof Object && dataSecondValue instanceof Object) {
      return [...acc, buildNode('passforchildren', key, null, null, buildTree(dataFirstValue, dataSecondValue))];
    }

    if (dataFirstValue === dataSecondValue) {
      return [...acc, buildNode('unchange', key, dataFirstValue, dataSecondValue)];
    }

    if (_.has(dataFirstFile, key) && _.has(dataSecondFile, key)) {
      return [...acc, buildNode('upgrade', key, dataFirstValue, dataSecondValue)];
    }

    if (!_.has(dataFirstFile, key) && _.has(dataSecondFile, key)) {
      return [...acc, buildNode('add', key, null, dataSecondValue)];
    }
    return [...acc, buildNode('delete', key, dataFirstValue, null)];
  }, []);
};

export default buildTree;
