const dotenv = require('dotenv');
const config = require('../src/config');

dotenv.config({ path: '.env.test' });

global.apiKey = config.api.apiKey;