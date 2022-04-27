const express = require('express');
const { db } = require('./utils/database');

// Routes
const { userRoutes } = require('./routes/users.routes');
const { repairRoutes } = require('./routes/repair.routes');

const app = express();

app.use(express.json());

// endpoints
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/repairs', repairRoutes);

// db
db.authenticate()
    .then(() => {
        console.log('Connected');
    })
    .catch(err => console.log(err));

db.sync({ force: true })
    .then(() => console.log('DB Sync'))
    .catch(err => console.log(err));

const PORT = 4000;
app.listen(PORT, () => console.log('Server running'));
