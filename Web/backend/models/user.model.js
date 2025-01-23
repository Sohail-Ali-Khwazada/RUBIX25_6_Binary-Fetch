import mongoose from "mongoose";

// Achievement Schema
const AchievementSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  progress: { type: Number, default: 0 },
  target: { type: Number, required: true },
  badge: { type: Boolean, default: false }, // Indicates whether the achievement is completed
  point: { type: Number, required: true },
});

// User Schema
const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    achievements: {
      type: [AchievementSchema], // Embedding the Achievement schema as an array
      default:[
        {
          id: 1,
          title: "Eco Explorer 🌱",
          description: "Log eco-friendly products with low CO2 emissions.",
          progress: 0,
          target: 10,
          badge: false,
          point: 100,
        },
        {
          id: 2,
          title: "Plastic-Free Hero ♻️",
          description: "Purchase products with recyclable or minimal plastic packaging.",
          progress: 0,
          target: 20,
          badge: false,
          point: 50,
        },
        {
          id: 3,
          title: "Sugar Buster 🍬❌",
          description: "Buy products with low sugar content.",
          progress: 0,
          target: 15,
          badge: false,
          point: 300,
        },
        {
          id: 4,
          title: "Health Guru 🥗",
          description: "Select products with a better Nutri-Score (above E).",
          progress: 0,
          target: 10,
          badge: false,
          point: 1000,
        },
        {
          id: 5,
          title: "Sodium Smasher 🧂🚫",
          description: "Track products with low sodium content.",
          progress: 0,
          target: 5,
          badge: false,
          point: 300,
        },
        {
          id: 6,
          title: "Organic Advocate 🌾",
          description: "Support organic products and farmers.",
          progress: 0,
          target: 10,
          badge: false,
          point: 100,
        },
        {
          id: 7,
          title: "Water Saver 💧",
          description: "Log purchases of water-efficient products.",
          progress: 0,
          target: 15,
          badge: false,
          point: 800,
        },
        {
          id: 8,
          title: "Local Supporter 🏠",
          description: "Buy local products and reduce your carbon footprint.",
          progress: 0,
          target: 20,
          badge: false,
          point: 2000,
        },
        {
          id: 9,
          title: "Vegan Visionary 🌱🌍",
          description: "Purchase vegan products for a sustainable future.",
          progress: 0,
          target: 10,
          badge: false,
          point: 600,
        },
        {
          id: 10,
          title: "Fair Trade Fighter 🤝",
          description: "Support products certified with fair trade practices.",
          progress: 0,
          target: 15,
          badge: false,
          point: 900,
        },
        {
          id: 11,
          title: "Zero Waste Champion 🗑️🚫",
          description: "Opt for zero-waste products to minimize landfill contribution.",
          progress: 0,
          target: 20,
          badge: false,
          point: 2000,
        },
        {
          id: 12,
          title: "Energy Saver ⚡",
          description: "Choose energy-efficient electronics and appliances.",
          progress: 0,
          target: 10,
          badge: false,
          point: 250,
        },
        {
          id: 13,
          title: "Reusable Revolutionary ♻️",
          description: "Switch to reusable bags, bottles, and containers.",
          progress: 0,
          target: 10,
          badge: false,
          point: 750,
        },
        {
          id: 14,
          title: "Compost Creator 🌿",
          description: "Compost biodegradable waste to support eco-systems.",
          progress: 0,
          target: 5,
          badge: false,
          point: 800,
        },
        {
          id: 15,
          title: "Climate Crusader 🌎",
          description: "Engage in activities and products that reduce greenhouse gases.",
          progress: 0,
          target: 15,
          badge: false,
          point: 1000,
        },
      ],     
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", UserSchema);
export default User;
