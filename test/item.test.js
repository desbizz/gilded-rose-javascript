const { expect, test } = require("@jest/globals");
const {
  is_Aged_Brie,
  is_concert,
  is_sulfuras,
  is_conjured,
  is_normal,
  is_legendary,
} = require("../src/controller/confirm_item");

const {
  update_concert_pass,
  update_aged_brie,
  update_conjured,
  update_normal_item,
  update_item_quality,
} = require("../src/controller/update_item");
const {
  increase_quality,
  decrease_sell_in,
  first_increase_concert,
  second_increase_concert,
  decrease_quality,
  degrade_twice,
  concert_expired,
} = require("../src/controller/utils");
const { update_quality, Item } = require("../src/gilded_rose");
jest.mock("../src/gilded_rose", () => {
  const originalModule = jest.requireActual("../src/gilded_rose");
  return {
    __esModule: true,
    ...originalModule,
  };
});
var items = [];

test("Test Item function to add new item", function () {
  items.push(new Item("+5 Dexterity Vest", 10, 20));
  items.push(new Item("Aged Brie", 2, 0));
  items.push(new Item("Elixir of the Mongoose", 5, 7));
  items.push(new Item("Sulfuras, Hand of Ragnaros", 0, 80));
  items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20));
  items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 8, 30));
  items.push(new Item("Conjured Mana Cake", 3, 6));
  items.push(new Item("Conjured Mana Cake", 6, 9));
  items.push(new Item("New Item", 3, 10));
  expect(items.length).toBe(9);
});

test("Test result after updating all items Quality", async () => {
  let days = 10;
  let result = {};

  for (let i = 0; i < days; i++) {
    result[i] = update_quality(items);
    expect(result[i]).toMatchSnapshot();
  }
});
test("Test if item is Aged Brie", () => {
  let item = { name: "Aged Brie" };
  let result = is_Aged_Brie(item);
  expect(result).toBe(true);
});
test("Test if item is Backstage passes to a TAFKAL80ETC concert", () => {
  let item = { name: "Backstage passes to a TAFKAL80ETC concert" };
  let result = is_concert(item);
  expect(result).toBe(true);
});
test("Test if item is Sulfuras, Hand of Ragnaros", () => {
  let item = { name: "Sulfuras, Hand of Ragnaros" };
  let result = is_sulfuras(item);
  expect(result).toBe(true);
});
test("Test if item quality increase and not greater than 50", () => {
  let item1 = { quality: 30 };
  let item2 = { quality: 50 };
  let result1 = increase_quality(item1);
  let result2 = increase_quality(item2);
  expect(result1).toBe(31);
  expect(result2).toBe(50);
});
test("Test if item quality decreases and not less than zero", () => {
  let item1 = { quality: 30 };
  let item2 = { quality: 0 };
  let result1 = decrease_quality(item1);
  let result2 = decrease_quality(item2);
  expect(result1).toBe(29);
  expect(result2).toBe(0);
});
test("Test degrading of item quality when selling days is less than zero", () => {
  let item = { sell_in: -2, quality: 9 };
  let result2 = degrade_twice(item);
  expect(result2).toBe(0);
});
test("Test expired concert is equal to zero", () => {
  let item = { sell_in: -2, quality: 9 };
  let result2 = concert_expired(item);
  expect(result2).toBe(true);
});
test("Test Update Concert Quality", () => {
  let item = { sell_in: -2, quality: 9 };
  let result = update_concert_pass(item);
  expect(result).toBe(0);
});
test("Test update concert pass between 6 to 10 days", () => {
  let item = { sell_in: 7, quality: 9 };
  let result = first_increase_concert(item);
  expect(result).toBe(11);
});
test("Test update concert pass between 0 to 5 days", () => {
  let item = { sell_in: 4, quality: 9 };
  let result = second_increase_concert(item);
  expect(result).toBe(12);
});
test("Test update concert pass over 10 days", () => {
  let item = { sell_in: 11, quality: 9 };
  let result = update_concert_pass(item);
  expect(result).toBe(10);
});
test("Test update concert pass function between 6 to 10 days", () => {
  let item = { sell_in: 8, quality: 9 };
  let result = update_concert_pass(item);
  expect(result).toBe(11);
});
test("Test update concert pass function between 0 to 5 days", () => {
  let item = { sell_in: 4, quality: 9 };
  let result = update_concert_pass(item);
  expect(result).toBe(12);
});
test("Test update concert pass function that is expired", () => {
  let item = { sell_in: -3, quality: 9 };
  let result = update_concert_pass(item);
  expect(result).toBe(0);
});
test("Test legendary Items", () => {
  let item = { name: "Sulfuras, Hand of Ragnaros", sell_in: 5, quality: 9 };
  let result = is_legendary(item);
  expect(result).toBe(80);
});
test("Test Decrease Sell Days", () => {
  let item = { name: "Aged Brie", sell_in: 6, quality: 9 };
  let result = decrease_sell_in(item);
  expect(result).toBe(5);
});
test("Test update Aged Brie", () => {
  let item = { name: "Aged Brie", sell_in: 6, quality: 9 };
  let result = update_aged_brie(item);
  expect(result).toBe(10);
});
test("Test update Aged Brie quality not more than 50", () => {
  let item = { name: "Aged Brie", sell_in: 6, quality: 50 };
  let result = update_aged_brie(item);
  expect(result).toBe(50);
});
test("Test update Normal Item", () => {
  let item = { name: "Elixir of the Mongoose", sell_in: -1, quality: 1 };
  let result = update_normal_item(item);
  expect(result).toBe(0);
});
test("Test update Normal item quality not more than 50", () => {
  let item = { name: "Elixir of the Mongoose", sell_in: 6, quality: 50 };
  let result = update_normal_item(item);
  expect(result).toBe(49);
});
test("Test normal return false for Concert", () => {
  let item = {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sell_in: 6,
    quality: 50,
  };
  let result = is_normal(item);
  expect(result).toBe(false);
});
test("Test normal return false for Aged Brie", () => {
  let item = { name: "Aged Brie", sell_in: 6, quality: 50 };
  let result = is_normal(item);
  expect(result).toBe(false);
});
test("Test normal return false for Sulfuras", () => {
  let item = { name: "Sulfuras, Hand of Ragnaros", sell_in: 6, quality: 50 };
  let result = is_normal(item);
  expect(result).toBe(false);
});
test("Test normal return false for Conjured", () => {
  let item = { name: "Conjured Mana Cake", sell_in: 6, quality: 50 };
  let result = is_normal(item);
  expect(result).toBe(false);
});
test("Test normal return true for other Items", () => {
  let item = { name: "Elixir of the Mongoose", sell_in: 6, quality: 50 };
  let result = is_normal(item);
  expect(result).toBe(true);
});
test("Test item is Conjured", () => {
  let item = { name: "Conjured Mana Cake", sell_in: 6, quality: 50 };
  let result = is_conjured(item);
  expect(result).toBe(true);
});
test("Test update Conjured item", () => {
  let item = { name: "Conjured Mana Cake", sell_in: -1, quality: 1 };
  let result = update_conjured(item);
  expect(result).toBe(0);
});
test("Test update Conjured item not less than zero", () => {
  let item = { name: "Conjured Mana Cake", sell_in: -3, quality: 8 };
  let result = update_conjured(item);
  expect(result).toBe(6);
});
test("Test normal items degrades twice when sell_days less than zero", () => {
  let item = { name: "Elixir of the Mongoose", sell_in: -3, quality: 50 };
  let result = update_normal_item(item);
  expect(result).toBe(48);
});
test("Test normal items degrades once when sell_days greater than zero", () => {
  let item = { name: "Elixir of the Mongoose", sell_in: 3, quality: 50 };
  let result = update_normal_item(item);
  expect(result).toBe(49);
});
test("Test update Aged Brie increases quality when sell_days less than zero", () => {
  let item = { name: "Aged Brie", sell_in: -3, quality: 8 };
  let result = update_aged_brie(item);
  expect(result).toBe(10);
});
test("Test update Quality does is not negative ", () => {
  let item = { name: "Elixir of the Mongoose", sell_in: -1, quality: 1 };
  let result = update_normal_item(item);
  expect(result).toBe(0);
});
test("Test result after refactoring update_quality failed", async () => {
  let days = 10;
  let result = {};

  for (let i = 0; i < days; i++) {
    result[i] = update_item_quality(items);
    expect(result[i]).toMatchSnapshot();
  }
});
