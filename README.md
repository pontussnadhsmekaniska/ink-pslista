# Veckohandling

En liten webbapp för veckans matplanering och inköpslista. Ren HTML/CSS/JS utan beroenden – fungerar offline och kan läggas till på hemskärmen på iPhone så att den beter sig som en vanlig app.

## Funktioner

- **Inköpslista** sorterad efter butikens avdelningar (kategori gissas automatiskt och lär sig när du ändrar den)
- Skriv flera varor på en gång: `2 l mjölk, ägg, bröd`
- Snabbknappar för det du köper oftast
- **Veckomeny** – välj en middag per dag och lägg alla ingredienser i listan med ett tryck
- **Recept** – spara dina rätter med ingredienser
- Dela listan (via iOS delningsmeny), ångra borttagning, mörkt läge
- Exportera/importera all data som säkerhetskopia

Data sparas lokalt i webbläsaren på telefonen.

## Publicera med GitHub Pages

1. Gå till repots **Settings → Pages**.
2. Under *Build and deployment* välj **Deploy from a branch**, branch `main` och mapp `/ (root)`.
3. Efter någon minut finns sidan på `https://<användarnamn>.github.io/ink-pslista/`.

(GitHub Pages kräver ett publikt repo om du har gratiskontot.)

## Lägg till på iPhone

1. Öppna adressen i **Safari**.
2. Tryck på dela-knappen → **Lägg till på hemskärmen**.
3. Appen "Handla" hamnar på hemskärmen och i appbiblioteket och öppnas i helskärm.
