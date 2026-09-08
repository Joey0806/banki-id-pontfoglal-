const API_URL = "http://localhost:5000/api/appointments";

async function loadAppointments() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const tbody = document.getElementById('appointmentsTableBody');
        tbody.innerHTML = '';

        if (data.length === 0) {
            tbody.innerHTML = `<tr><td colspan="3" class="text-center text-muted">Nincs aktív foglalás.</td></tr>`;
            return;
        }

        data.forEach(app => {
            const row = document.createElement('tr');
            const szepDatum = app.appointmentDate.replace('T', ' ').substring(0, 16);
            row.innerHTML = `
                <td><strong>${app.customerName}</strong><br><small class="text-muted">${app.customerEmail}</small></td>
                <td>${app.branchName}<br><span class="badge bg-secondary app-badge">${app.serviceType}</span></td>
                <td class="fw-bold">${szepDatum}</td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error("Hiba kiolvasáskor:", error);
    }
}

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

        msgDiv.classList.remove('d-none', 'alert-success', 'alert-danger');
        if (response.ok) {
            msgDiv.textContent = result.message;
            msgDiv.classList.add('alert-success');
            document.getElementById('bookingForm').reset();
            loadAppointments();
        } else {
            msgDiv.textContent = result.message;
            msgDiv.classList.add('alert-danger');
        }
    } catch (error) {
        msgDiv.textContent = "Szerver hiba.";
        msgDiv.classList.add('alert-danger');
    }
});

window.onload = loadAppointments;