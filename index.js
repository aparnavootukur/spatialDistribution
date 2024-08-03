
const PORT = process.env.PORT || 5000;
const express = require('express');
const sequelize = require('./config/db');



const app = express();

app.use(express.json());

const cityRoutes = require('./routes/city');
const stateRoutes = require('./routes/state');


app.use('/api/states', cityRoutes);
app.use('/api/', stateRoutes);

sequelize.sync().then(() => {
  console.log('Database connected and synced');
}).
catch(err => {
  console.log('Error connecting to the database', err);
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
