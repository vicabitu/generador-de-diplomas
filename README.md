## Diploma Generator

Steps to run the project

#### Backend

---

##### Step 1: Clone the repository:
    $ git clone https://github.com/vicabitu/generador-de-diplomas.git
    $ cd generador-de-diplomas

##### Step 2: Build the image:
    $ cd backend
    $ docker-compose build

##### Step 3: Once the image is built, run the containers:
    $ docker-compose up

##### Step 4: Run the migrations:
    $ docker-compose exec web python manage.py migrate --noinput


#### Frontend

---

##### Step 1: Install dependencies:
    $ cd frontend/generador_de_diplomas/
    $ npm install

##### Step 2: Start the project:
    $ npm start


How to
---

##### Create super user:
    $ docker-compose exec web python manage.py createsuperuser

##### Stop containers:
    $ docker-compose stop