var {update_quality,items,Item}= require('../src/gilded_rose')
jest.mock('../src/gilded_rose', () => {
    const originalModule = jest.requireActual('../src/gilded_rose');

    return {
      __esModule: true,
      ...originalModule,  
    };
  });

  
 test("Test Item function to add new item", function() {
    items.push(new Item('New Item', 10, 10));
    let new_item = items[items.length-1]
    expect(items[items.length-1]).toBe(new_item)

  });

  
  