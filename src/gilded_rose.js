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
let is_conjured =(item)=>{
  return;
}
let is_normal=(item)=>{
  if(!is_Aged_Brie(item) && !is_concert(item) && !is_sulfuras(item) && !is_conjured(item) ){
    return true
  }else return false
}
let increase_quality = (item)=>{
  if(item.quality < MAX_NUMBER){
    item.quality +=1
  }
  return item.quality
}
let descrease_sell_in =(item)=>{
   return item.sell_in = item.sell_in - 1 
}
let first_increase_concert = (item)=>{
  return item.quality +=2 
}
let second_increase_concert = (item)=>{
  item.quality +=3
  return item.quality <= MAX_NUMBER ? item.quality : MAX_NUMBER
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
let concert_expired = (item)=>{
  if(item.sell_in < MIN_NUMBER){
    return true
  }
  return false
}
let update_concert_pass =(item)=>{
  let {sell_in} = item
   if (sell_in <=5  && sell_in >= 0){
      item.quality= second_increase_concert(item)
    }
    else if (sell_in <=10  && sell_in > 5){
      item.quality= first_increase_concert(item)
    }else if (concert_expired(item)){
      item.quality= degrade_twice(item)
    }else {
      item.quality= increase_quality(item)
    }
        
     return item.quality
}
let is_legendary =(item)=>{
  if (item.name.includes('Sulfuras')){
    return item.quality= 80
  }
}
let update_aged_brie=(item)=>{
  let {sell_in} =item
  if(sell_in <50){
    return increase_quality(item)
  }
}
let update_normal_item=(item)=>{
  let {sell_in,quality} =item
  if(sell_in <MAX_NUMBER && quality > MIN_NUMBER){
    return decrease_quality(item)
  }
  return item.quality ;
}


function update_quality(items) {
  for (var i = 0; i < items.length; i++) {
    if (is_sulfuras(items[i])) {
       is_legendary(items[i])
    }
    if(is_Aged_Brie(items[i])){
      update_aged_brie(items[i])
    }
    if(is_concert(items[i])){
      update_concert_pass(items[i])
     }
    if (is_normal(items[i])) {
      if (items[i].quality > MIN_NUMBER) {
        if (!is_sulfuras(items[i])) {
          decrease_quality(items[i])
        }
      }
    } 
    if (!is_sulfuras(items[i])) {
      descrease_sell_in(items[i])
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
  degrade_twice,
  concert_expired,
  update_concert_pass,
  first_increase_concert,
  second_increase_concert,
  is_legendary,
  descrease_sell_in,
  update_aged_brie,
  update_normal_item,
  is_normal,
  is_conjured

}