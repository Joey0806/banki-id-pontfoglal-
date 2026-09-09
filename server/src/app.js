const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const appointmentRoutes = require('./routes/appointmentRoutes');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/appointments', appointmentRoutes);

const clientPath = path.resolve(__dirname, '..', '..', 'client');

app.use(express.static(clientPath));

app.get('/', (req, res) => {
    res.redirect('/idopontfoglalas');
});

app.get('/idopontfoglalas', (req, res) => {
    res.sendFile(path.join(clientPath, 'index.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(clientPath, 'admin.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`A backend szerver fut a ${PORT}-es porton.`));