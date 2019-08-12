import _ from 'lodash';
import fs from 'fs';

const buildNode = (typeOperation, keyName, oldValue, newValue) => ([
  typeOperation,
  keyName,
  oldValue,
  newValue,
]);

const genDiff = (pathToFile1, pathToFile2) => {
  const dataFirstFile = JSON.parse(fs.readFileSync(pathToFile1, 'utf-8'));
  const dataSecondFile = JSON.parse(fs.readFileSync(pathToFile2, 'utf-8'));

  const dataKeys = _.union(Object.keys(dataFirstFile), Object.keys(dataSecondFile));

  const conversion = dataKeys.reduce((acc, key) => {
    const dataFirstValue = dataFirstFile[key];
    const dataSecondValue = dataSecondFile[key];

    if (dataFirstValue === dataSecondValue) {
      return [...acc, buildNode(key, dataFirstValue)];
    }

    if (_.has(dataFirstFile, key) && _.has(dataSecondFile, key)) {
      return [...acc, buildNode('-', key, dataFirstValue), buildNode('+', key, dataSecondValue)];
    }

    if (!_.has(dataFirstFile, key) && _.has(dataSecondFile, key)) {
      return [...acc, buildNode('+', key, dataSecondValue)];
    }

    return [...acc, buildNode('-', key, dataFirstValue)];
  }, []);

  const result = conversion.map(el => el.join(' '));
  console.log(result);
  return result;
};

export default genDiff;
