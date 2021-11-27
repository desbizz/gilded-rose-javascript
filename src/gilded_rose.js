function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var items = []
const MAX_NUMBER=50
const MIN_NUMBER=0

items.push(new Item('+5 Dexterity Vest', 10, 20));
items.push(new Item('Aged Brie', 2, 0));
items.push(new Item('Elixir of the Mongoose', 5, 7));
items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
items.push(new Item('Conjured Mana Cake', 3, 6));

let is_Aged_Brie =(item)=>{
  return item.name === 'Aged Brie'
}
let is_concert =(item)=>{
  return item.name === 'Backstage passes to a TAFKAL80ETC concert'
}
let is_sulfuras =(item)=>{
  return item.name === 'Sulfuras, Hand of Ragnaros'
}
let increase_quality = (item)=>{
  if(item.quality < MAX_NUMBER){
    item.quality +=1
  }
  return item.quality
}
let decrease_quality = (item)=>{
  if(item.quality > MIN_NUMBER){
    item.quality -=1
  }
  return item.quality
  
}
let degrade_twice = (item)=>{
  return item.quality = item.quality - item.quality
}

function update_quality(items) {
  for (var i = 0; i < items.length; i++) {
    if (!is_Aged_Brie(items[i]) && !is_concert(items[i])) {
      if (items[i].quality > MIN_NUMBER) {
        if (!is_sulfuras(items[i])) {
          decrease_quality(items[i])
        }
      }
    } else {
      if (items[i].quality < MAX_NUMBER) {
        increase_quality(items[i])
        if (is_concert(items[i])) {
          if (items[i].sell_in < 11) {
            increase_quality(items[i])
          }
          if (items[i].sell_in < 6) {
            increase_quality(items[i])
          }
        }
      }
    }
    if (!is_sulfuras(items[i])) {
      items[i].sell_in = items[i].sell_in - 1;
    }
    if (items[i].sell_in < MIN_NUMBER) {
      if (!is_Aged_Brie(items[i])) {
        if (!is_concert(items[i])) {
          if (items[i].quality > MIN_NUMBER) {
            if (!is_sulfuras(items[i])) {
              decrease_quality(items[i])
            }
          }
        } else {
          degrade_twice(items[i])
        }
      } else {
        increase_quality(items[i])
      }
    }
  }
  return  items
}
//console.log(update_quality())
module.exports = {
  update_quality,
  Item,
  items,
  is_Aged_Brie,
  is_concert,
  is_sulfuras,
  increase_quality,
  decrease_quality,
  degrade_twice

}