const express = require('express');

// Routes
const { userRoutes } = require('./routes/users.routes');
const { repairRoutes } = require('./routes/repair.routes');

// Controller
const { globalErrorHandler } = require('./controllers/error.controller');

const app = express();

app.use(express.json());

// endpoints
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/repairs', repairRoutes);
app.use('*', globalErrorHandler);

module.exports = { app };
