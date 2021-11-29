const MAX_NUMBER = 50;
const MIN_NUMBER = 0;
const {
  is_Aged_Brie,
  is_concert,
  is_sulfuras,
  is_conjured,
  is_normal,
  is_legendary,
} = require("./confirm_item");
const {
  increase_quality,
  decrease_sell_in: decrease_sell_in,
  first_increase_concert,
  second_increase_concert,
  decrease_quality,
  decrease_quality_twice,
  degrade_twice,
  concert_expired,
} = require("./utils");

const update_concert_pass = (item) => {
  try {
    let { sell_in } = item;
    decrease_sell_in(item);
    if (sell_in <= 5 && sell_in >= 0) {
      item.quality = second_increase_concert(item);
    } else if (sell_in <= 10 && sell_in > 5) {
      item.quality = first_increase_concert(item);
    } else if (sell_in > 10) {
      item.quality = increase_quality(item);
    }
    if (concert_expired(item)) {
      item.quality = degrade_twice(item);
    }
    return item.quality;
  } catch (err) {
    throw new Error({ message: "Error updating concert pass", err: err });
  }
};

const update_aged_brie = (item) => {
  try {
    let { sell_in, quality } = item;
    if (sell_in > 0 && quality <= MAX_NUMBER && quality >= MIN_NUMBER) {
      increase_quality(item);
    } else if (sell_in <= 0 && quality <= MAX_NUMBER && quality >= MIN_NUMBER) {
      first_increase_concert(item);
    }
    decrease_sell_in(item);
    return item.quality >= 0 ? item.quality : 0;
  } catch (err) {
    throw new Error({ message: "Error updating Aged Brie", err: err });
  }
};
const update_conjured = (item) => {
  try {
    let { sell_in, quality } = item;
    if (sell_in > 0 && quality <= MAX_NUMBER && quality > MIN_NUMBER) {
      decrease_quality(item);
    } else if (sell_in <= 0 && quality <= MAX_NUMBER && quality > MIN_NUMBER) {
      decrease_quality_twice(item);
    }

    decrease_sell_in(item);
    return item.quality;
  } catch (err) {
    throw new Error({ message: "Error updating Conjured", err: err });
  }
};

const update_normal_item = (item) => {
  let { sell_in, quality, name } = item;
  if (sell_in > 0 && quality <= MAX_NUMBER && quality >= MIN_NUMBER) {
    decrease_quality(item);
  } else if (sell_in <= 0 && quality <= MAX_NUMBER && quality >= MIN_NUMBER) {
    decrease_quality_twice(item);
  }
  decrease_sell_in(item);
  return item.quality;
};
const update_item_quality = (item) => {
  try {
    item.forEach((ite) => {
      if (is_sulfuras(ite)) {
        is_legendary(ite);
      }
      if (is_normal(ite)) {
        update_normal_item(ite);
      }
      if (is_Aged_Brie(ite)) {
        update_aged_brie(ite);
      }
      if (is_concert(ite)) {
        update_concert_pass(ite);
      }
      if (is_conjured(ite)) {
        update_conjured(ite);
      }
    });
    return item;
  } catch (err) {
    throw new Error({ message: "Error has occurred", err: err });
  }
};
module.exports = {
  update_concert_pass,
  update_aged_brie,
  update_conjured,
  update_normal_item,
  update_item_quality,
};
