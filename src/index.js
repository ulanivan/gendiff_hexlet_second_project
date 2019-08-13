import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import getParser from './parsers';

const takeDataFile = (pathToData) => {
  const formatFile = path.extname(pathToData);
  const parseData = getParser(formatFile);
  return parseData(fs.readFileSync(pathToData, 'utf-8'));
};


const genDiff = (pathToFile1, pathToFile2) => {
  const dataFirstFile = takeDataFile(pathToFile1);
  const dataSecondFile = takeDataFile(pathToFile2);

  const dataKeys = _.union(Object.keys(dataFirstFile), Object.keys(dataSecondFile));

  return dataKeys.reduce((acc, key) => {
    const dataFirstValue = dataFirstFile[key];
    const dataSecondValue = dataSecondFile[key];

    if (dataFirstValue === dataSecondValue) {
      return acc.concat(key, ': ', dataFirstValue);
    }

    if (_.has(dataFirstFile, key) && _.has(dataSecondFile, key)) {
      return acc.concat('\n + ', key, ': ', dataSecondValue, '\n - ', key, ': ', dataFirstValue);
    }

    if (!_.has(dataFirstFile, key) && _.has(dataSecondFile, key)) {
      return acc.concat('\n + ', key, ': ', dataSecondValue);
    }

    return acc.concat('\n - ', key, ': ', dataFirstValue);
  }, '');
};

export default genDiff;
