const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

// Routes
const { userRoutes } = require('./routes/users.routes');
const { repairRoutes } = require('./routes/repair.routes');

// Controller
const { globalErrorHandler } = require('./controllers/error.controller');

const app = express();

app.use(cors());
app.use(express.json());

const limiter = rateLimit({
    max: 10000,
    windowMS: 1 * 60 * 60 * 1000,
    message: 'too many request from this IP',
});

app.use(limiter);
// endpoints
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/repairs', repairRoutes);
app.use('*', globalErrorHandler);

module.exports = { app };
