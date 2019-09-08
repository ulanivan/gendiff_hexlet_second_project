import fs from 'fs';
import path from 'path';
import genDiff from '../src';

test('genDiffFlatFile', () => {
  const before = path.resolve(__dirname, '__fixtures__', 'flatBefore.json');
  const after = path.resolve(__dirname, '__fixtures__', 'flatAfter.json');
  const fixturePath = path.join(__dirname, '__fixtures__', 'resultFlat.txt');
  const expectedValue = fs.readFileSync(fixturePath, 'UTF-8').trimRight();
  const actualValue = genDiff(before, after);
  expect(actualValue).toBe(expectedValue);
});

test.each(['.json', '.yml', '.ini'])('genDiffPlain', (e) => {
  const before = path.resolve(__dirname, '__fixtures__', `before${e}`);
  const after = path.resolve(__dirname, '__fixtures__', `after${e}`);
  const fixturePath = path.resolve(__dirname, '__fixtures__', 'resultStringPlain.txt');
  const expectedValue = fs.readFileSync(fixturePath, 'UTF-8').trimRight();
  const actualValue = genDiff(before, after, 'plain');
  expect(actualValue).toEqual(expectedValue);
});

test.each(['.json', '.yml', '.ini'])('genDiffStandardFormat', (e) => {
  const before = path.resolve(__dirname, '__fixtures__', `before${e}`);
  const after = path.resolve(__dirname, '__fixtures__', `after${e}`);
  const fixturePath = path.resolve(__dirname, '__fixtures__', 'resultStringStandard.txt');
  const expectedValue = fs.readFileSync(fixturePath, 'UTF-8').trimRight();
  const actualValue = genDiff(before, after);
  expect(actualValue).toEqual(expectedValue);
});

test.each(['.json', '.yml', '.ini'])('genDiffJson', (e) => {
  const before = path.resolve(__dirname, '__fixtures__', `before${e}`);
  const after = path.resolve(__dirname, '__fixtures__', `after${e}`);
  const fixturePath = path.resolve(__dirname, '__fixtures__', 'result.json');
  const expectedValue = fs.readFileSync(fixturePath, 'UTF-8').trimRight();
  const actualValue = genDiff(before, after, 'json');
  expect(actualValue).toEqual(expectedValue);
});
