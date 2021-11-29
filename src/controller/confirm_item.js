const is_Aged_Brie = ({ name }) => {
  return name === "Aged Brie";
};
const is_concert = ({ name }) => {
  return name === "Backstage passes to a TAFKAL80ETC concert";
};
const is_sulfuras = ({ name }) => {
  return name === "Sulfuras, Hand of Ragnaros";
};
const is_conjured = ({ name }) => {
  if (!name) {
    return;
  } else return name.includes("Conjured");
};
const is_normal = ({ name }) => {
  if (
    !is_Aged_Brie({ name }) &&
    !is_concert({ name }) &&
    !is_sulfuras({ name }) &&
    !is_conjured({ name })
  ) {
    return true;
  } else return false;
};
const is_legendary = (item) => {
  if (item.name.includes("Sulfuras")) {
    return (item.quality = 80);
  }
};
module.exports = {
  is_Aged_Brie,
  is_concert,
  is_sulfuras,
  is_conjured,
  is_normal,
  is_legendary,
};
