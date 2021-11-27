const { expect, test } = require('@jest/globals');
var {update_quality,Item,is_Aged_Brie,is_concert}= require('../src/gilded_rose')
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
  
  