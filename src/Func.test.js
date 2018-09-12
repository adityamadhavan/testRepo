
const f = require('./functions.js'); 



test('count = to count + 1', () => {
    expect(f.CountFun(1)).toBe(2);
    // expect(f.CountFun("a")).toBe("TypeError");
    // expect(f.CountFun(0.6)).toBe(1);
    // expect(f.CountFun(true)).toBe("TypeError");
});


test('Player X is the loser', () => {
    expect(f.GetLoser(1,2,3,"Game progresses")).toBe("Game progresses");
    // expect(f.GetLoser(1,0,0,"Game progresses")).toBe("Player 1 is the loser!");
    // expect(f.GetLoser(0,1,0,"Game progresses")).toBe("Player 2 is the loser!");
    // expect(f.GetLoser(0,0,1,"Game progresses")).toBe("Player 3 is the loser!");
    // expect(f.GetLoser(1,0,0,"Player 1 is the loser!")).toBe("Player 1 is the loser!");
    // expect(f.GetLoser(0,1,0,"Player 2 is the loser!")).toBe("Player 2 is the loser!");
    // expect(f.GetLoser(0,0,1,"Player 3 is the loser!")).toBe("Player 3 is the loser!");
});