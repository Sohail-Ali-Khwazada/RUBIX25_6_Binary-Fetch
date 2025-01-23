import React, { useState } from 'react';

const Badge = () => {
  const [userName, setUserName] = useState('Ashish Gupta');
  const [achievementName, setAchievementName] = useState('Eco Explorer 🌱');
  const [achievementEmoji, setAchievementEmoji] = useState('🌱');

  const generateBadgeUrl = () => {
    const baseTemplateUrl = 'https://res.cloudinary.com/de5xzvcqp/image/upload/v1737623381/Untitled_design_aitday.png';
  
    const userText = `Awarded to: ${userName}`.replace(/ /g, '%20'); // URL-encode spaces
    const achievementText = achievementName.replace(/ /g, '%20');
    const emojiText = achievementEmoji; // Emoji will be directly placed

    return `https://res.cloudinary.com/de5xzvcqp/image/upload/l_text:Arial_40_bold:${achievementText},g_south,y_50/l_text:Arial_30_bold:${userText},g_north,y_50/l_text:Arial_80_bold:${emojiText},g_center,y_0/${baseTemplateUrl}`;
  };

  const downloadBadge = (badgeUrl) => {
    const link = document.createElement('a');
    link.href = badgeUrl;
    link.download = 'achievement-badge.png';
    link.click();
  };

  const badgeUrl = generateBadgeUrl(userName, achievementName, achievementEmoji);

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-5 flex flex-col items-center">
      <button onClick={generateBadgeUrl}>create </button>
      {/* Badge Preview */}
      <div className="mb-6">
        <img src={badgeUrl} alt="Achievement Badge" className="max-w-sm rounded-lg shadow-lg" />
      </div>

      {/* Download Button */}
      {/* <button
        className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition duration-200"
        onClick={() => downloadBadge(badgeUrl)}
      >
        Download Badge
      </button> */}
    </div>
  );
};

export default Badge;
