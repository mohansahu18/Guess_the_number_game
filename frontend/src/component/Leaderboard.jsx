import React from "react";
const generateRandomAvatarUrl = (username) => {
  const avatarUrl = `https://api.dicebear.com/9.x/pixel-art/svg?seed=${username}`;
  return avatarUrl;
};

const Avatar = ({ src, alt }) => (
  <img
    src={src}
    alt={alt}
    className="w-12 h-12 rounded-full border-2 border-gray-300"
    onError={(e) => {
      e.target.src = "https://api.dicebear.com/9.x/pixel-art/svg?seed=sample";
    }}
  />
);

const Leaderboard = ({ leaderboard }) => {
  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Leaderboard</h2>
      <ul className="space-y-4">
        {leaderboard.map((entry, index) => (
          <li
            key={index}
            className="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm"
          >
            <Avatar
              src={generateRandomAvatarUrl(entry.username)}
              alt={entry.username}
            />
            <div className="ml-4 flex-1">
              <p className="text-lg font-semibold">{entry.username}</p>
              <p className="text-sm text-gray-600">
                High Score: {entry.highScore}
              </p>
            </div>
            <span className="text-lg font-bold text-gray-800">{index + 1}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
