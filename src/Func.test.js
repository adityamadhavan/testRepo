import GetLoser from './Board.js';

// const Board = require('./Board');

// test('count = to count + 1', () => {
//     expect(Board.CountFun(1)).toBe(2);
//     expect(Board.CountFun("a")).toBe("TypeError");
//     expect(Board.CountFun(0.6)).toBe(1);
//     expect(Board.CountFun(true)).toBe("TypeError");
// });


test('Player X is the loser', () => {
    expect(GetLoser(1,2,3,"Game progresses")).toBe("Game progresses");
    expect(GetLoser(1,0,0,"Game progresses")).toBe("Player 1 is the loser!");
    expect(GetLoser(0,1,0,"Game progresses")).toBe("Player 2 is the loser!");
    expect(GetLoser(0,0,1,"Game progresses")).toBe("Player 3 is the loser!");
    expect(GetLoser(1,0,0,"Player 1 is the loser!")).toBe("Player 1 is the loser!");
    expect(GetLoser(0,1,0,"Player 2 is the loser!")).toBe("Player 2 is the loser!");
    expect(GetLoser(0,0,1,"Player 3 is the loser!")).toBe("Player 3 is the loser!");
});