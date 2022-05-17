const { app } = require('./app');

const { Repair } = require('./models/repairs');
const { User } = require('./models/users');

const { db } = require('./utils/database');

db.authenticate()
    .then(() => {
        console.log('Connected');
    })
    .catch(err => console.log(err));

User.hasMany(Repair);
Repair.belongsTo(User);

db.sync()
    .then(() => console.log('DB Sync'))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Server running'));
