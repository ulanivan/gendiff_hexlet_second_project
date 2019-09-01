import path from 'path';
import fs from 'fs';
import getParser from './parsers';
import buildTree from './buildTree';
import render from './render';

const takeDataFile = (pathToData) => {
  const formatFile = path.extname(pathToData);
  const parseData = getParser(formatFile);
  return parseData(fs.readFileSync(pathToData, 'utf-8'));
};

const genDiff = (pathToFile1, pathToFile2) => {
  const dataFirstFile = takeDataFile(pathToFile1);
  const dataSecondFile = takeDataFile(pathToFile2);
  const ast = buildTree(dataFirstFile, dataSecondFile);

  return render(ast);
};

export default genDiff;
