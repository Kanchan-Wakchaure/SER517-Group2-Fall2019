* Pre-requisites:
-------------------
python
pip
node.js

* To run the server:
---------------------------

Go to command prompt and run the following command.

pip install django

pip install djongo

pip install dnspython

python manage.py makemigrations travlendar_app

python manage.py migrate

[p.s dont commit local migrations file to git.]

pip install django-cors-headers

pip install restframework

Copy the file 'secretkey.txt' shared on google drive and paste it to the folder where manage.py resides
(In our project, it is inside ''/SER517-Group2-Fall2019/Travlendar/').

Goto the directory which has manage.py in cmd.

Run-> python manage.py runserver

Goto http://127.0.0.1:8000/ to check if server running.


* To run frontend:
---------------------------------
Disable virtualenv if was enabled before.(command ->deactivate)

go to frontend folder.

npm install react-scripts

npm install axios --save

npm install --save react-router-dom

npm start

This will start react on localhost:3000


* P.S. => Install any other dependencies if server says so.
          Activate and Start django server if you are using virtual enviornment for django framework

