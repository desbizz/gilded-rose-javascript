const { expect, test } = require('@jest/globals');
var {update_quality,Item,is_Aged_Brie,is_concert,
    is_sulfuras,increase_quality,decrease_quality}= require('../src/gilded_rose')
jest.mock('../src/gilded_rose', () => {
    const originalModule = jest.requireActual('../src/gilded_rose');
    return {
      __esModule: true,
      ...originalModule,  
    };
  });
 var items = []
 
  
 test("Test Item function to add new item", function() {
    items.push(new Item('+5 Dexterity Vest', 10, 20));
    items.push(new Item('Aged Brie', 2, 0));
    items.push(new Item('Elixir of the Mongoose', 5, 7));
    items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
    items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
    items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 8, 30));
    items.push(new Item('Conjured Mana Cake', 3, 6));
    items.push(new Item('Conjured Mana Cake', 6, 9));
    items.push(new Item ('New Item',3,10,))
    expect(items.length).toBe(9)

  });

  test('Test result after updating all items Quality', async() => {
    let days =10
    let result ={}

    for  (let i = 0; i < days; i++){
       result[i]=update_quality(items) 
       expect(result[i]).toMatchSnapshot();     
    }
  });
  test('Test if item is Aged Brie', ()=>{
      let item = {name:'Aged Brie'}
      let result = is_Aged_Brie(item)
      expect(result).toBe(true)
  })
  test('Test if item is Backstage passes to a TAFKAL80ETC concert', ()=>{
    let item = {name:'Backstage passes to a TAFKAL80ETC concert'}
    let result = is_concert(item)
    expect(result).toBe(true)
})
test('Test if item is Sulfuras, Hand of Ragnaros', ()=>{
    let item = {name:'Sulfuras, Hand of Ragnaros'}
    let result = is_sulfuras(item)
    expect(result).toBe(true)
})
test('Test if item quality increase and not greater than 50', ()=>{
    let item1 = {quality:30}
    let item2 = {quality:50}
    let result1 = increase_quality(item1)
    let result2 = increase_quality(item2)
    expect(result1).toBe(31)
    expect(result2).toBe(50)
})
test('Test if item quality decreases and not less than zero', ()=>{
    let item1 = {quality:30}
    let item2 = {quality:0}
    let result1 = decrease_quality(item1)
    let result2 = decrease_quality(item2)
    expect(result1).toBe(29)
    expect(result2).toBe(0)
})
  