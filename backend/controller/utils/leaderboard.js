// leaderboard.js
const { getDB } = require('../../model/dbUtils');

/**
 * Retrieve the top users from the database
 * @param {number} limit - The maximum number of users to retrieve
 * @returns {Promise<Array>} An array of top users
 */
const getTopUsers = async (limit = 10) => {
  try {
    const db = await getDB();
    const topUsers = await db.collection('users').find().sort({ score: -1 }).limit(limit).toArray();
    return topUsers;
  } catch (error) {
    console.error('Error fetching top users:', error);
    throw error;
  }
};

module.exports = { getTopUsers };
