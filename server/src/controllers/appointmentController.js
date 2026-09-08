const { MongoClient } = require('mongodb');

// Átírva a te egyedi 4000-es MongoDB portodra!
const url = 'mongodb://127.0.0.1:4000';
const client = new MongoClient(url);
const dbName = 'bank-db';

class AppointmentController {
    // 1. RÖGZÍTÉS: POST /api/appointments
    async createAppointment(req, res) {
        try {
            const { customerName, customerEmail, branchName, serviceType, appointmentDate } = req.body;
            
            await client.connect();
            const db = client.db(dbName);
            const collection = db.collection('appointments');

            // Üzleti logika validáció
            const existing = await collection.findOne({ branchName, appointmentDate, status: 'aktív' });
            if (existing) {
                return res.status(400).json({ message: 'Ez az időpont ebben a bankfiókban már foglalt!' });
            }

            const newAppointment = {
                customerName, customerEmail, branchName, serviceType, 
                appointmentDate: new Date(appointmentDate),
                status: 'aktív',
                createdAt: new Date()
            };
            
            await collection.insertOne(newAppointment);
            return res.status(201).json({ message: 'Sikeres banki időpontfoglalás!', data: newAppointment });
        } catch (error) {
            return res.status(500).json({ message: 'Szerver hiba történt az adatbázis elérésekor.', error: error.message });
        }
    }

    // 2. KIOLVASÁS: GET /api/appointments
    async getAppointments(req, res) {
        try {
            await client.connect();
            const db = client.db(dbName);
            const collection = db.collection('appointments');

            const appointments = await collection.find({ status: 'aktív' }).sort({ appointmentDate: 1 }).toArray();
            return res.status(200).json(appointments);
        } catch (error) {
            return res.status(500).json({ message: 'Szerver hiba történt az adatbázis elérésekor.', error: error.message });
        }
    }
}

module.exports = new AppointmentController();