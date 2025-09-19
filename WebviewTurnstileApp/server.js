require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Cloudflare Turnstile keys - set these in your environment variables
const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET || 'YOUR_SECRET_KEY_HERE';
const TURNSTILE_SITEKEY = process.env.TURNSTILE_SITEKEY || 'YOUR_SITE_KEY_HERE';

app.use(express.json());

app.get('/', (req, res) => {
  const fs = require('fs');
  const htmlPath = path.join(__dirname, 'public', 'index.html');

  fs.readFile(htmlPath, 'utf8', (err, html) => {
    if (err) {
      return res.status(500).send('Error loading page');
    }

    // Replace the placeholder with the actual site key
    const updatedHtml = html.replace('{{TURNSTILE_SITEKEY}}', TURNSTILE_SITEKEY);
    res.send(updatedHtml);
  });
});

// Turnstile verification endpoint
app.post('/verify-turnstile', async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({
      success: false,
      error: 'No token provided'
    });
  }

  try {
    // Verify token with Cloudflare
    const formData = new URLSearchParams();
    formData.append('secret', TURNSTILE_SECRET);
    formData.append('response', token);

    const verifyResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData
    });

    const result = await verifyResponse.json();

    console.log('Turnstile verification result:', result);

    if (result.success) {
      res.json({
        success: true,
        message: 'Turnstile verification successful',
        challenge_ts: result['challenge_ts'],
        hostname: result.hostname
      });
    } else {
      res.status(400).json({
        success: false,
        error: 'Turnstile verification failed',
        'error-codes': result['error-codes']
      });
    }

  } catch (error) {
    console.error('Turnstile verification error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error during verification'
    });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Turnstile test server running at http://localhost:${PORT}`);
  console.log(`Mobile access: http://YOUR_LOCAL_IP:${PORT}`);
  console.log(`Secret key configured: ${TURNSTILE_SECRET === 'YOUR_SECRET_KEY_HERE' ? 'NO - Set TURNSTILE_SECRET env var' : 'YES'}`);
  console.log(`Site key configured: ${TURNSTILE_SITEKEY === 'YOUR_SITE_KEY_HERE' ? 'NO - Set TURNSTILE_SITEKEY env var' : 'YES'}`);
});