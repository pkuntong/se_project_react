// Script to add hot weather clothing items to the backend
// Usage: node add-hot-items.js <email> <password>

const BASE_URL = 'http://localhost:3001';

const hotWeatherItems = [
  {
    name: "Tank Top",
    imageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400",
    weather: "hot"
  },
  {
    name: "Shorts",
    imageUrl: "https://images.unsplash.com/photo-1506629905607-7500b0f969f8?w=400",
    weather: "hot"
  },
  {
    name: "Sunglasses",
    imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
    weather: "hot"
  },
  {
    name: "Sandals",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    weather: "hot"
  },
  {
    name: "Summer Dress",
    imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400",
    weather: "hot"
  },
  {
    name: "Cap",
    imageUrl: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400",
    weather: "hot"
  }
];

async function addItems() {
  const email = process.argv[2] || 'test@example.com';
  const password = process.argv[3] || 'password123';

  try {
    // Step 1: Login to get token
    console.log('Logging in...');
    const loginResponse = await fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!loginResponse.ok) {
      throw new Error(`Login failed: ${loginResponse.status} ${loginResponse.statusText}`);
    }

    const loginData = await loginResponse.json();
    const token = loginData.token;

    if (!token) {
      throw new Error('No token received from login');
    }

    console.log('Login successful!');

    // Step 2: Add items
    console.log(`\nAdding ${hotWeatherItems.length} hot weather items...`);
    
    for (const item of hotWeatherItems) {
      try {
        const response = await fetch(`${BASE_URL}/items`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(item),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(`✓ Added: ${item.name}`);
        } else {
          const errorText = await response.text();
          console.log(`✗ Failed to add ${item.name}: ${response.status} - ${errorText}`);
        }
      } catch (err) {
        console.log(`✗ Error adding ${item.name}:`, err.message);
      }
    }

    console.log('\nDone!');
  } catch (error) {
    console.error('Error:', error.message);
    console.log('\nUsage: node add-hot-items.js <email> <password>');
    console.log('Example: node add-hot-items.js test@example.com password123');
  }
}

addItems();

