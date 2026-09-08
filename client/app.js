const API_URL = "/api/appointments";

// 1. DINAMIKUS KIOLVASÁS a MongoDB-ből
async function loadAppointments() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const tbody = document.getElementById('appointmentsTableBody');
        tbody.innerHTML = '';

        if (data.length === 0) {
            tbody.innerHTML = `<tr><td colspan="3" class="text-center text-muted">Nincs aktív foglalás a NoSQL adatbázisban.</td></tr>`;
            return;
        }

        data.forEach(app => {
            const row = document.createElement('tr');
            const szepDatum = app.appointmentDate.replace('T', ' ');
            row.innerHTML = `
                <td><strong>${app.customerName}</strong><br><small class="text-muted">${app.customerEmail}</small></td>
                <td>${app.branchName}<br><span class="badge bg-secondary" style="font-size: 0.8rem;">${app.serviceType}</span></td>
                <td class="fw-bold">${szepDatum}</td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error("Hiba kiolvasáskor:", error);
    }
}

// 2. RÖGZÍTÉS az adatbázisba
document.getElementById('bookingForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const msgDiv = document.getElementById('formMessage');
    
    const payload = {
        customerName: document.getElementById('customerName').value,
        customerEmail: document.getElementById('customerEmail').value,
        branchName: document.getElementById('branchName').value,
        serviceType: document.getElementById('serviceType').value,
        appointmentDate: document.getElementById('appointmentDate').value
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const result = await response.json();

        msgDiv.classList.add('d-none'); // Elrejtjük az esetleges korábbi hibaüzenetet

        if (response.ok) {
            // FIX ÉS TISZTA NATÍV FELUGRÓ ÜZENET
            alert("Sikeresen rögzítve a NoSQL adatbázisba!");
            
            document.getElementById('bookingForm').reset();
            loadAppointments(); // DINAMIKUSAN, azonnal frissítjük a táblázatot az oldal tetejére ugrás nélkül
        } else {
            msgDiv.textContent = result.message;
            msgDiv.className = "alert mt-3 alert-danger d-block";
        }
    } catch (error) {
        msgDiv.textContent = "Szerver kapcsolódási hiba.";
        msgDiv.className = "alert mt-3 alert-danger d-block";
    }
});

// Első betöltés az oldal megnyitásakor
window.onload = loadAppointments;