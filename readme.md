A vizsgafeladatról

Banki időpontfoglaló rendszer
Egy konténerizált webalkalmazás, amely a három rétegű elveit követve készült. Az alkalmazás modern, reszponzív felületet biztosít a lakossági ügyfelek időpontfoglalásához, és egy jelszóval védett, dedikált adminisztrációs felületet a banki munkatársak számára a rekordok adatbázisból történő kiolvasásához.


Felhasznált technológiák
 Kliens oldal:  HTML, JavaScript (Fetch API), CSS, Bootstrap v5.3.
Szerver oldal: Node.js, Express.js keretrendszer (REST API mintára építve).
Adatbázis: MongoDB (adatbázis-kezelő), mongodb Node.js driver használatával.
Működési környezet: Docker és Docker Compose 

 Elérési út: `http://localhost:5000/idopontfoglalas`
Admin oldal:  `http://localhost:5000/admin`
Admin bejelentkezési adatok: 
                            Felhasználónév: BankAdmin
                            Jelszó: Bank789

Végpontok Leírása:

A backend kiszolgáló az alábbi végpontokon keresztül biztosítja az adatokat:

-Új időpont rögzítése
-URL: `/api/appointments`
-A folyamat: `POST`
Validálja és elmenti az új foglalást. Ellenőrzi az időpont-ütközéseket (egy bankfiókban egy időpontra csak egy ügyfél foglalhat).
-A kérés jsonnal működik
  
  {
    "customerName": "Kovács János",
    "customerEmail": "janos@email.com",
    "branchName": "Debreceni Fiók",
    "serviceType": "Személyi Bankár",
    "appointmentDate": "2026-10-15T10:30"
  }

-Sikeres válasz esetén: `201 Created` - `{"message": "Sikeresen rögzítve!"}`
-Hibaüzenet ha valami ütközés van:  `400 Bad Request` - `{"message": "Ez az időpont ebben a bankfiókban már foglalt!"}`

időpontok kiolvasása:
-URL `/api/appointments`
A folyamat: `GET`
-Lekéri az adatbázisból az összes aktív foglalást dátum szerint növekvő sorrendbe rendezve.
-Sikeres válasz esetén:`200 OK` - JSON tömb a foglalásokkal.


Futtatás:

Az alkalmazás futtatásához Docker Desktop alkalmazásra és Visual Studio Code-ra van szükség. Semmilyen adatbázis vagy Node.js telepítést nem igényel a gépen.

1. Indítsda el a Docker Desktop alkalmazást a számítógépeden.
2. Nyissa meg a VS Code-ot majd húzza be a banki-időpontfoglaló mappát VS Code ba, ott nyisson egy cmd terminalt.
3. Addja ki az alábbi parancsot a teljes rendszer automatikus felépítéséhez és indításához:
    
    cd . -> docker compose up --build

4. A sikeres elindulás után nyissa meg a böngészőben a `http://localhost:5000/` címet.


Adatbiztonság és Perzisztencia (Adatmegőrzés)
Az adatbázis adatai a Docker leállítása vagy újraépítése (docker compose down) esetén sem vesznek el. A `docker-compose.yml` fájlban lévő kötet (`bank_mongo_data`) gondoskodik arról, hogy a MongoDB a fizikai merevlemezre mentse el a rekordokat.