import _ from 'lodash';
import path from 'path';
import genDiff from '../src';

test.each(['.json', '.yml', '.ini'])('genDiffTest', (e) => {
  const before = path.resolve(__dirname, '__fixtures__', `before${e}`);
  const after = path.resolve(__dirname, '__fixtures__', `after${e}`);
  const stringResult = 'host: hexlet.io\n + timeout: 20\n - timeout: 50\n - proxy: 123.234.53.22\n - follow: false\n + verbose: true';
  const expected = _.values({ stringResult }).join('');
  expect(genDiff(before, after)).toEqual(expected);
});
