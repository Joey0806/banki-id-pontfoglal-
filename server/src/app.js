const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const appointmentRoutes = require('./routes/appointmentRoutes');
const app = express();

app.use(cors());
app.use(express.json());

// API végpontok átadása a Routernek
app.use('/api/appointments', appointmentRoutes);

// --- ATOMBIZTOS ABSZOLÚT ELÉRÉSI ÚT A CLIENT MAPPÁHOZ ---
// Ez a módszer garantálja, hogy a Docker Linux konténerében is tökéletesen betöltsön minden fájl
const clientPath = path.resolve(__dirname, '..', '..', 'client');

// A képeket, CSS fájlokat (style.css, admin.css) elérhetővé tesszük a háttérben
app.use(express.static(clientPath));

// 1. Ha a felhasználó a sima főoldalra lép, átdobjuk az /idopontfoglalas szép címre
app.get('/', (req, res) => {
    res.redirect('/idopontfoglalas');
});

// 2. SZÉP CÍMSOR ÜGYFÉLKAPU: http://localhost:5000/idopontfoglalas
app.get('/idopontfoglalas', (req, res) => {
    res.sendFile(path.join(clientPath, 'index.html'));
});

// 3. SZÉP CÍMSOR ADMIN: http://localhost:5000/admin
app.get('/admin', (req, res) => {
    res.sendFile(path.join(clientPath, 'admin.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`A backend szerver fut a ${PORT}-es porton.`));