const redis = require('redis');
redis.createClient({ prefix: 'blacklist:' });