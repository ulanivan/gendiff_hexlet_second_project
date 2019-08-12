import path from 'path';
import genDiff from '../src';

test('genDiff', () => {
  const before = path.resolve(__dirname, '__fixtures__', 'before.json');
  const after = path.resolve(__dirname, '__fixtures__', 'after.json');
  const result = ['host hexlet.io  ', '- timeout 50 ', '+ timeout 20 ', '- proxy 123.234.53.22 ', '- follow false ', '+ verbose true '];
  expect(genDiff(before, after)).toEqual(result);
});
