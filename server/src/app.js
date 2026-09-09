const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// TŰPONTOS ELÉRÉSI ÚT A TE ROUTEREDHEZ A NAGY 'R' BETŰVEL!
const appointmentRoutes = require('./routes/appointmentRoutes');
const app = express();

app.use(cors());
app.use(express.json());

// API végpontok átadása a Routernek
app.use('/api/appointments', appointmentRoutes);

// --- FRONTEND KISZOLGÁLÁSA FIXEN A 5000-ES PORTON ---
// Mivel az app.js az src-ben van, a kinti client mappát két szinttel feljebb érjük el:
const clientPath = path.join(__dirname, '..', '..', 'client');
app.use(express.static(clientPath));

// Ha a felhasználó megnyitja a http://localhost:5000/ címet
app.get('/', (req, res) => {
    res.sendFile(path.join(clientPath, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`A backend szerver fut a ${PORT}-es porton.`));