# Library Management System

Ovaj projekat predstavlja **administraciju biblioteke** razvijenu kao **monorepo** aplikaciju.  
Sistem se sastoji iz dva dela:  
- **Backend (Laravel API)** – zadužen za upravljanje podacima o knjigama, korisnicima, iznajmljivanjem i vraćanjem knjiga.  
- **Frontend (React aplikacija)** – korisnički interfejs za rad sa sistemom.  

### Glavne funkcionalnosti
- Pregled dostupnih knjiga i njihovih kopija  
- Registracija i prijava korisnika  
- Iznajmljivanje i vraćanje knjiga  
- Pregled korisničkog profila sa istorijom iznajmljenih knjiga  
- Administratorski panel za upravljanje knjigama, korisnicima i procesima

Za instalaciju i pokretanje projekta na lokalnoj mašini potrebno je klonirati repozitorijum, instalirati zavisnosti za backend i frontend, podesiti .env fajlove i pokrenuti migracije baze podataka. 

**Backend** će biti dostupan na http://localhost:8000, dok **frontend** radi na http://localhost:3000.