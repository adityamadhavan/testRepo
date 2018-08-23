const CountFun = require('./CountFun');

test('count = to count + 1', () => {
    expect(CountFun(1)).toBe(2);
    expect(CountFun("a")).toBe("TypeError");
    expect(CountFun(0.6)).toBe(1);
});