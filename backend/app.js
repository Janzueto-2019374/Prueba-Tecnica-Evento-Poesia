const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const formRoutes = require('./routes/formRoutes');
const reportRoutes = require('./routes/reportRoutes');

app.use('/submit', formRoutes);
app.use(reportRoutes);

// Resto del código del servidor

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
