import React, { useState } from "react";
import { motion } from "framer-motion";
import "./../index.css";
import achievements from "../store/achievements"; // Contains pre-calculated progress
import Badge from "./Badge";
import badge from "./../assets/badge.png";

const Achievements = () => {
  const [achievementsData] = useState(achievements);
  const userName = "Ashish Gupta"; // Replace with dynamic user name if needed

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-5">
      <h1 className="text-4xl font-bold text-center text-green-500 mb-10">
        Sustainability Achievements
      </h1>

      {/* Grid layout for two achievements per row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {achievementsData.map((ach) => (
          <motion.div
            key={ach.id}
            className="bg-gray-800 p-6 rounded-lg shadow-lg relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-xl font-semibold text-green-400 flex justify-between">
              <div className="text-xl font-semibold text-green-400">
                {ach.title}<h2 className="inline text-gray-300">{`(+${ach.point} Green Score)`}</h2>
              </div>
              {/* Badge Section at Top Right */}
              <div className="right-2 w-10 h-10 rounded-full flex items-center justify-center shadow-md">
                {ach.badge ? (
                  <p>✅</p>
                ) : (
                  <span className="text-lg">🔒</span> // Locked icon
                )}
              </div>
            </div>
            <p className="text-gray-300 mt-2">{ach.description}</p>

            <div className="mt-4">
              {/* Progress Bar */}
              <div className="bg-gray-600 rounded-full h-5 relative overflow-hidden">
                <motion.div
                  className="bg-green-500 h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${ach.progress}%` }}
                  transition={{ duration: 1 }}
                />
                <div className="absolute inset-0 flex justify-center items-center text-white text-sm font-bold">
                  {Math.round(ach.progress)}%
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
