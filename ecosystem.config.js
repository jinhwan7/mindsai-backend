require('dotenv').config({ path: './.env' });

console.log(process.env.NODE_ENV);
module.exports = {
  apps: [
    {
      name: 'mindsai-server',
      cwd: './dist',
      script: './main.js',
      instances: 2,
      exec_mode: 'cluster',
      autorestart: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      max_memory_restart: '1G',
      watch: true,
    },
  ],
};
