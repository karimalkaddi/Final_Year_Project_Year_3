const categories = {
  Food: ["food", "pizza", "burger", "restaurant", "cafe"],
  Transport: ["bus", "train", "uber", "taxi"],
  Shopping: ["amazon", "clothes", "shoes", "shopping"],
  Entertainment: ["netflix", "cinema", "spotify", "games"],
  Bills: ["rent", "electric", "water", "internet"]
};

function categoriseExpense(title) {
  const lowerTitle = title.toLowerCase();

  for (const category in categories) {
    if (categories[category].some(keyword => lowerTitle.includes(keyword))) {
      return category;
    }
  }

  return "Other";
}

module.exports = categoriseExpense;
