import sum from './testDemo/demo';

console.log(sum(2, 2));
test('sum(2 + 2) 等于 4', () => {
  expect(sum(2, 2)).toBe(4);
});
