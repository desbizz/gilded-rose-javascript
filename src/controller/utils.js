const MAX_NUMBER = 50;
const MIN_NUMBER = 0;
const increase_quality = (item) => {
  try {
    if (item.quality < MAX_NUMBER) {
      item.quality += 1;
    }
    if (item.quality > MAX_NUMBER) {
      item.quality = MAX_NUMBER;
    }
    return item.quality;
  } catch (err) {
    throw new Error({ message: "Error While increasing", err: err });
  }
};
const decrease_sell_in = (item) => {
  return (item.sell_in = item.sell_in - 1);
};
const first_increase_concert = (item) => {
  item.quality += 2;
  if (item.quality > MAX_NUMBER) {
    item.quality = MAX_NUMBER;
  }
  return item.quality;
};
const second_increase_concert = (item) => {
  item.quality += 3;
  if (item.quality > MAX_NUMBER) {
    item.quality = MAX_NUMBER;
  }
  return item.quality;
};
const decrease_quality = (item) => {
  if (item.quality > MIN_NUMBER) {
    item.quality -= 1;
  }
  if (item.quality < MIN_NUMBER) {
    item.quality = MIN_NUMBER;
  }
  return item.quality;
};
const decrease_quality_twice = (item) => {
  if (item.quality > MIN_NUMBER) {
    item.quality -= 2;
  }
  if (item.quality < MIN_NUMBER) {
    item.quality = MIN_NUMBER;
  }
  return item.quality;
};
const degrade_twice = (item) => {
  return (item.quality = item.quality - item.quality);
};
const concert_expired = (item) => {
  if (item.sell_in < MIN_NUMBER) {
    return true;
  }
  return false;
};

module.exports = {
  increase_quality,
  decrease_sell_in: decrease_sell_in,
  first_increase_concert,
  second_increase_concert,
  decrease_quality,
  decrease_quality_twice,
  degrade_twice,
  concert_expired,
};
