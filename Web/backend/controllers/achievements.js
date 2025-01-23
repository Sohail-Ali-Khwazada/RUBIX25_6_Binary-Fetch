
// Calculate achievements progress
const calculateAchievements = (product) => {
  const achievements = {
    // Existing achievements
    "Eco Explorer 🌱":1,
    "Plastic-Free Hero ♻️":1,
    "Sugar Buster 🍬❌": 1,
    "Nut-Free Champion 🚫🥜":1,
    "Protein Power 💪": 1,
    "Sodium Smasher 🧂🚫":1,
    "Sustainability Warrior 🌎": 1,
    "Health Guru 🥗":1,
    "Chocolate Aficionado 🍫":1,
    "Green Consumer 🌱":1,
    "Organic Advocate 🌾":1,
    "Water Saver 💧":1, // Example condition, replace with your data field
    "Local Supporter 🏠":1, // Example, adjust based on your data
    "Vegan Visionary 🌱🌍":1,
    "Fair Trade Fighter 🤝":1,
  };
  // const achievements = {
  //   // Existing achievements
  //   "Eco Explorer 🌱": product.agribalyse?.co2_total < 5 ? 1 : 0,
  //   "Plastic-Free Hero ♻️": product.packaging_materials_tags?.includes("en:glass") ? 1 : 0,
  //   "Sugar Buster 🍬❌": product.nutriscore_data?.sugars_value < 10 ? 1 : 0,
  //   "Nut-Free Champion 🚫🥜": product.allergens_tags?.includes("en:nuts") ? 0 : 1,
  //   "Protein Power 💪": product.nutriscore_data?.proteins_value > 5 ? 1 : 0,
  //   "Sodium Smasher 🧂🚫": product.nutriscore_data?.sodium_value < 50 ? 1 : 0,
  //   "Sustainability Warrior 🌎": product.agribalyse?.co2_total < 7 && product.packaging_materials_tags?.includes("en:glass") ? 1 : 0,
  //   "Health Guru 🥗": product.nutriscore_grade && ["a", "b", "c"].includes(product.nutriscore_grade.toLowerCase()) ? 1 : 0,
  //   "Chocolate Aficionado 🍫": product.categories?.includes("en:chocolate-spreads") ? 1 : 0,
  //   "Green Consumer 🌱": product.agribalyse?.co2_consumption < 2 ? 1 : 0,

  //   // New achievements
  //   "Organic Advocate 🌾": product.packaging_materials_tags?.includes("en:organic") ? 1 : 0,
  //   "Water Saver 💧": product.agribalyse?.water_usage < 100 ? 1 : 0, // Example condition, replace with your data field
  //   "Local Supporter 🏠": product.origin_country && product.origin_country === "India" ? 1 : 0, // Example, adjust based on your data
  //   "Vegan Visionary 🌱🌍": product.allergens_tags?.includes("en:vegan") ? 1 : 0,
  //   "Fair Trade Fighter 🤝": product.certifications?.includes("fair_trade") ? 1 : 0,
  // };

  return achievements;
};

// Function to update user's achievements based on product data
export const updateUserAchievements = async (req,res) => {
  const data = req.body
  console.log(data)
  const calculatedAchievements = calculateAchievements(data);
  console.log(calculatedAchievements)
  res.send("calculateAchievements")
  try {
    // Fetch user's achievements from the database
    // const achievements = await Achievement.find({ userId });

    // Calculate achievements progress based on the product data

    // // Loop through each achievement and update progress if conditions are met
    // const updatedAchievements = achievements.map((achievement) => {
    //   let updated = false;

    //   // Check if the calculated progress is greater than the current progress
    //   if (calculatedAchievements[achievement.name] > achievement.progress) {
    //     achievement.progress = calculatedAchievements[achievement.name];
    //     updated = true;
    //   }

    //   // Ensure the progress doesn't exceed the maximum value
    //   if (achievement.progress > achievement.maxProgress) {
    //     achievement.progress = achievement.maxProgress;
    //   }

    //   // Return the updated achievement
    //   return updated ? achievement : null;
    // }).filter(Boolean); // Filter out achievements that weren't updated

    // if (updatedAchievements.length > 0) {
    //   // Save all updated achievements to the database
    //   await Promise.all(updatedAchievements.map((achievement) => achievement.save()));
    // }

  } catch (error) {
    
  }
};

