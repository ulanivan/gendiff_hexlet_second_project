import path from 'path';
import genDiff from '../src';

const resultString = '{\n    common: {\n        setting1: Value 1\n      - setting2: 200\n      - setting3: true\n      + setting3: {\n            key: value\n        }\n        setting6: {\n            key: value\n          + ops: vops\n        }\n      + follow: false\n      + setting4: blah blah\n      + setting5: {\n            key5: value5\n        }\n    }\n    group1: {\n      - baz: bas\n      + baz: bars\n        foo: bar\n      - nest: {\n            key: value\n        }\n      + nest: str\n    }\n  - group2: {\n        abc: 12345\n    }\n  + group3: {\n        fee: 100500\n    }\n}';

test.each(['.json', '.yml', '.ini'])('genDiffTest', (e) => {
  const before = path.resolve(__dirname, '__fixtures__', `before${e}`);
  const after = path.resolve(__dirname, '__fixtures__', `after${e}`);
  const expected = resultString;
  expect(genDiff(before, after)).toEqual(expected);
});
