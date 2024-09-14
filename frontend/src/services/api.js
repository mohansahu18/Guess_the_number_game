import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export async function loginUser(username, password) {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, {
            username,
            password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Login failed');
    }
}

export async function registerUser(username, password) {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, {
            username,
            password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Registration failed');
    }
}

export async function fetchUserData(token) {
    try {
        const response = await axios.get(`${API_URL}/auth/user`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch user data');
    }
}

export async function saveScore(token, score) {
    try {
        const response = await axios.post(`${API_URL}/scores`, {
            score
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to save score');
    }
}

export async function fetchHighScores() {
    try {
        const response = await axios.get(`${API_URL}/scores/leaderboard`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch high scores');
    }
}
