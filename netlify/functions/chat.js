// /netlify/functions/chat.js
const { GoogleAuth } = require('google-auth-library');
const axios = require('axios');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const body = JSON.parse(event.body);

    // 1. Authenticate using the Service Account JSON stored in Netlify Env Variables
    const auth = new GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON),
      scopes: 'https://www.googleapis.com/auth/cloud-platform'
    });

    const client = await auth.getClient();
    const tokenResponse = await client.getAccessToken();
    const token = tokenResponse.token;

    const API_URL = "https://discoveryengine.googleapis.com/v1alpha/projects/310182215564/locations/global/collections/default_collection/engines/sargent-tech-support_1766204715994/servingConfigs/default_search:answer";

    // 2. Forward the prompt and session data to Google
    const response = await axios.post(API_URL, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    console.error('Chat Function Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};