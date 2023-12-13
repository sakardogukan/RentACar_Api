# Rent A Car Api Project

## Used technologies & Methods:
* Node.Js
* Express.Js
* Mongoose - MongoDB SQL
* Authorization And Permissions with Simple Token
* Password Crypto
* Documentation: Swagger / Redoc / Json
* Logging
-----


### Rent A Car Project 

- Customers:
  - can select start and end date and see the list of available cars on selected dates. It is not allowed to choose past dates.
  - can choose a car on the list and reserve that car, but can not reserve more than one car on a selected time period,
  - can not reserve cars which are reserved by other customers on selected time period.
  - can see the list of their reservations including past ones.
  - can list, create, read their reservations.
  - can not update, delete reservations.

- Admins:
  - can make CRUD operations on Car table,
  - can make CRUD operations on Customer (User) table,
  - can make CRUD operations on Reservation table,

- It can be createdId and updatedId in Car model.
- There will be searching, sorting and pagination capabilities on list views.

---

###  Araç Kiralama Projesi

* Müşteriler:
  * Tarih aralığı belirtip müsait araç listeleyebilir. Geçmiş tarihler listelenmez.
  * Seçilen tarih aralığında araç rezerve edilebilir, ancak aynı tarih aralığında ikinci bir araç kiralayamaz.
  * Rezerve edilmiş bir aracı, o tarihlerde rezerve edemez.
  * Rezervasyonlarını listeyebilir, ekleyebilir, okuyabilir.
  * Rezervasyonlarını güncelleyemez, silemez.
* Yöneticiler:
  * Araba tablosu CRUD işlemleri
  * Müşteri (User) tablosu CRUD işlemleri
  * Reservasyon tablosu CRUD işlemleri

* Araba tablosunda createdId ve updatedId olabilir.
* Listeleme ekranlarında arama, sıralama ve sayfalama imkanları olacaktır.

---

### ER (Entity Relationship Diagram) Diagram
<img src="./src/img/erdRentACarAPI.png" width="650" height="500" alt="ERD"></img> 

---

### Steps to be taken before running the project.

```
- The project is downloaded from the github repo.
- After the project is opened in VSCode, the following commands are run from the gitBash terminal.

$ npm init -y
$ npm i express dotenv express-async-errors
$ npm i mongoose
$ npm i morgan
$ npm i jsonwebtoken
$ npm i redoc-express swagger-autogen swagger-ui-express cors
$ npm i multer nodemailer
$ echo NODE_ENV=development > .env
$ echo PORT=8000 >> .env
$ echo MONGODB=mongodb://127.0.0.1:27017/rentacarApi >> .env
$ echo PAGE_SIZE=20 >> .env
$ echo SECRET_KEY=a7db7ashd7ashd7ahsd7ashd7ashd7hasd7g2367f4e219er >> .env
$ echo ACCESS_KEY=asıda87shd7ahsdh7as7dhas7dh7sadhas7dha7sdha7sdhas >> .env
$ echo REFRESH_KEY=ijasd8ahsd8jhas8dha8sd8asdh8ashd8ashd8ahsd*ds9d9f >> .env
$ mkdir logs
$ cp ./env-sample ./.env
$ nodemon // * Running *

- The synchronization function in line 68 of the index.js file should be run once and disabled again.
- Testing is done with the following URL queries via Thunder Client or Postman or Browser. If changes are made to the Swagger file, the "$ node swagger.js" command should be used in the terminal.
```

### Folder/File Structure:

```
    src/
        config/
            dbConnection.js
            swagger.json
        controllers/
            auth.js
            flight.js
            passenger.js
            reservation.js
            user.js
        helpers/
            dateToLocalString.js
            passwordEncrypt.js
            setToken.js
            sync.js
        img/
            erdFlightAPI.png
        middlewares/
            authentication.js
            errorHandler.js
            findSearchSortPage.js
            logger.js
            permissions.js
        models/
            flight.js
            passenger.js
            reservation.js
            user.js
        routes/
            auth.js
            document.js
            flight.js
            index.js
            passenger.js
            reservation.js
            user.js
    .env
    .gitignore
    env-sample
    index.js
    package-lock.json
    package.json    
    Readme.md
    swagger.js
```
### Resources used
* https://mongoosejs.com/docs/queries.html
* http://expressjs.com/en/resources/middleware/cookie-session.html
* https://www.npmjs.com/package/cookie-session
* https://nodejs.org/api/crypto.html#cryptopbkdf2syncpassword-salt-iterations-keylen-digest
* https://www.mongodb.com/docs/manual/reference/operator/query/regex/
* https://expressjs.com/en/resources/middleware/morgan.html
* https://swagger-autogen.github.io/docs/
* https://expressjs.com/en/resources/middleware/morgan.html
* https://regexr.com/
* https://www.w3schools.com/jsref/jsref_tolocalestring.asp
* https://ethereal.email/
* https://expressjs.com/en/resources/middleware/multer.html


> Designed By DOGUKAN © Nov 2023