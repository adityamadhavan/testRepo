const CountFun = require('./CountFun');

test('count = to count + 1', () => {
    expect(CountFun(1)).toBe(2);
    expect(CountFun("a")).toBe("TypeError");
    expect(CountFun(0.6)).toBe(1);
    expect(CountFun(true)).toBe("TypeError");
});

const GetLoser = require('./GetLoser');

test('Player X is the loser', () => {
    expect(GetLoser(1,2,3,"Game progresses")).toBe("Game progresses");
    expect(GetLoser(1,0,0,"Game progresses")).toBe("Player 1 is the loser!");
    expect(GetLoser(0,1,0,"Game progresses")).toBe("Player 2 is the loser!");
    expect(GetLoser(0,0,1,"Game progresses")).toBe("Player 3 is the loser!");
    expect(GetLoser(1,0,0,"Player 1 is the loser!")).toBe("Player 1 is the loser!");
    expect(GetLoser(0,1,0,"Player 2 is the loser!")).toBe("Player 2 is the loser!");
    expect(GetLoser(0,0,1,"Player 3 is the loser!")).toBe("Player 3 is the loser!");
});