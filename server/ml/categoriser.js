import natural from "natural";

const classifier = new natural.BayesClassifier();

// 🔹 Keyword rules (bootstrapping layer)
const keywordRules = {
  Entertainment: ["netflix", "spotify", "cinema", "movie"],
  Food: ["tesco", "aldi", "lidl", "pizza", "burger", "kfc"],
  Transport: ["uber", "bus", "train", "tube", "taxi"],
  Bills: ["rent", "electric", "gas", "water", "internet"],
};

/**
 * Train classifier using historical expenses
 */
export function trainClassifier(expenses) {
  // Reset classifier safely
  classifier.docs = [];
  classifier.features = {};
  classifier.classifications = {};

  expenses.forEach((expense) => {
    if (
      expense &&
      typeof expense.title === "string" &&
      typeof expense.category === "string"
    ) {
      classifier.addDocument(
        expense.title.toLowerCase(),
        expense.category.toLowerCase()
      );
    }
  });

  if (classifier.docs.length > 0) {
    classifier.train();
  }
}

/**
 * Categorise expense using:
 * 1) Keyword rules
 * 2) Trained classifier
 * 3) Fallback category
 */
export function categoriseExpense(title) {
  if (!title || typeof title !== "string") {
    return "other";
  }

  const text = title.toLowerCase();

  // 🔹 Step 1: Keyword matching (high confidence)
  for (const category in keywordRules) {
    for (const keyword of keywordRules[category]) {
      if (text.includes(keyword)) {
        return category;
      }
    }
  }

  // 🔹 Step 2: ML classification (if trained)
  if (classifier.docs.length > 0) {
    return classifier.classify(text);
  }

  // 🔹 Step 3: Safe fallback
  return "other";
}
