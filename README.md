# Kripto Bázis hivatalos repository 2024 Müller Ottó 5/13 SZFT.

Telepítési útmutató

1. metódus
Kattintsunk a zöld <> Code gombra majd töltsük le ZIP-ként az egész projektet.
Bontsuk ki a zip fájlt lehetőleg a C: meghajtón és nyissuk meg a mappát Visual Studio Codeban.
Ha még nincs XAMPP telepítve a gépen telepíteni kell, majd elindítani az Apache és MySQL modulokat.
Visual Studio Codeban jobb klikkeljünk az API mappára és válasszu ki az "Open in integrated terminal" opciót
írjuk be a terminálba a következőket:
C:\KriptoBazisWEB\API> npm install
C:\KriptoBazisWEB\API> npm run dev

az npm installal letölti a szükséges node modulokat
az npm run dev pedig elindítja a Szervert.

Visual Studio Codeban még telepítsük a Live Server Extension-t az extensions fülben.
Ha ez megvan jobbklikk az index.html fájlra és nyomjunk az "Open with Live Server"
Legyen a legújabb verziójú böngészőnk Pl: Brave, Google Chrome, Firefox

2. metódus
másoljuk ki a github repo linkjét majd visual studio codeban ha van gitünk, klónozzuk a repo-t.
Sikeres klónozás után tegyük meg ugyanazokat mint az 1. metódusban: 
XAMPP elindítása, npm modulok telepítése majd szerver futtatása és Live server megnyitása.