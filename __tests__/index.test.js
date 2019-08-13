import _ from 'lodash';
import path from 'path';
import genDiff from '../src';

test('genDiffJson', () => {
  const before = path.resolve(__dirname, '__fixtures__', 'before.json');
  const after = path.resolve(__dirname, '__fixtures__', 'after.json');
  const stringResult = 'host: hexlet.io\n + timeout: 20\n - timeout: 50\n - proxy: 123.234.53.22\n - follow: false\n + verbose: true';
  const expected = _.values({ stringResult }).join('');
  expect(genDiff(before, after)).toEqual(expected);
});

test('genDiffYaml', () => {
  const before = path.resolve(__dirname, '__fixtures__', 'before.yml');
  const after = path.resolve(__dirname, '__fixtures__', 'after.yml');
  const stringResult = 'host: hexlet.io\n + timeout: 40\n - timeout: 50\n + proxy: 123.234.44.55\n - proxy: 123.234.53.22\n - follow: false\n + verbose: false';
  const expected = _.values({ stringResult }).join();
  expect(genDiff(before, after)).toEqual(expected);
});
