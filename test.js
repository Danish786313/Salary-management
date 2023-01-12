var cron = require('node-cron');

cron.schedule('0 0 1 * *', () => {
  console.log('running a task every minute');
});