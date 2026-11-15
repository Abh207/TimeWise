import { app } from './app.js';
import { startMissedActivityWatcher } from './cron/missedActivityWatcher.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🚀 TimeWise Express REST API running on port ${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`===============================================`);
  
  // Start background cron jobs
  startMissedActivityWatcher();
});

