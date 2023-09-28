import { add } from "../add";

test("test dodawania dwoch liczb", () => {
  expect(add(1, 2)).toBe(3);
  expect(add(35, -5)).toBe(30);
  expect(add(10, 6)).toBe(16);
});
