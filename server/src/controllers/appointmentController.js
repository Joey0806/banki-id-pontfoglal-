const { MongoClient } = require('mongodb');


const url = process.env.MONGO_URI || 'mongodb://database:27017/bank-db';
const client = new MongoClient(url);
const dbName = 'bank-db';

class AppointmentController {
    async createAppointment(req, res) {
        try {
            const { customerName, customerEmail, branchName, serviceType, appointmentDate } = req.body;
            await client.connect();
            const collection = client.db(dbName).collection('appointments');

            const existing = await collection.findOne({ branchName, appointmentDate, status: 'aktív' });
            if (existing) {
                return res.status(400).json({ message: 'Ez az időpont ebben a bankfiókban már foglalt!' });
            }

            const newAppointment = { customerName, customerEmail, branchName, serviceType, appointmentDate, status: 'aktív' };
            await collection.insertOne(newAppointment);
            return res.status(201).json({ message: 'Sikeresen rögzítve!' });
        } catch (error) {
            return res.status(500).json({ message: 'Szerver hiba', error: error.message });
        }
    }

    async getAppointments(req, res) {
        try {
            await client.connect();
            const collection = client.db(dbName).collection('appointments');
            const data = await collection.find({ status: 'aktív' }).sort({ appointmentDate: 1 }).toArray();
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: 'Szerver hiba', error: error.message });
        }
    }
}

module.exports = new AppointmentController();