const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const find = require('find-process');
const net = require('net');

dotenv.config();
const BASE_PORT = parseInt(process.env.PORT || '5000');

// Utility to find a free port if 5000 is blocked
const findAvailablePort = async (startPort) => {
  for (let port = startPort; port < startPort + 10; port++) {
    const inUse = await isPortInUse(port);
    if (!inUse) return port;
  }
  throw new Error('No available port found between 5000–5009');
};

const isPortInUse = (port) => {
  return new Promise((resolve) => {
    const tester = net
      .createServer()
      .once('error', () => resolve(true))
      .once('listening', function () {
        tester.close();
        resolve(false);
      })
      .listen(port);
  });
};

const startServer = async () => {
  try {
    const list = await find('port', BASE_PORT);
    if (list.length) {
      console.log(`⚠️ Killing process on port ${BASE_PORT} (PID ${list[0].pid})`);
      process.kill(list[0].pid, 'SIGKILL');
    }
  } catch (err) {
    console.warn(`⚠️ No process to kill on port ${BASE_PORT}`);
  }

  await new Promise((res) => setTimeout(res, 500));

  const PORT = await findAvailablePort(BASE_PORT);
  connectDB();

  const app = express();

  // ✅ Proper CORS config for Vite (frontend: 5173)
  const corsOptions = {
    origin: 'http://localhost:5174',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };

  app.use(cors(corsOptions));

  // ✅ Handle OPTIONS preflight requests
  app.options('*', cors(corsOptions));

  app.use(express.json());

  // ✅ Routes
  const authRoutes = require('./routes/authroutes');
  const projectRoutes = require('./routes/projectRoutes');
  const seoRoutes = require('./routes/seoRoutes');
  const automationRoutes = require('./routes/automationRoutes');
  app.use('/api/automation', automationRoutes);
  const toolRoutes = require('./routes/toolRoutes');
app.use('/api/tools', toolRoutes);

  app.use('/api/auth', authRoutes);
  app.use('/api/projects', projectRoutes);
  app.use('/api/tools', seoRoutes);
  const submissionRoutes = require('./routes/submissionRoutes');
  app.use('/api/submissions', submissionRoutes);
  
  app.get('/', (req, res) => res.send(`🚀 API running on port ${PORT}`));

  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
};

startServer();