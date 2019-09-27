## Pre-requisites:

python3
pip3
node.js

## Starting the Django Server:

On command prompt  run the following commands.

pip3 install django djongo dnspython django-cors-headers restframework

python3 manage.py makemigrations travlendar_app

python3 manage.py migrate

Copy the file 'secretkey.txt' shared on google drive and paste it to the folder where manage.py resides
(In our project, it is inside ''/SER517-Group2-Fall2019/Travlendar/').

Goto the directory which has manage.py in cmd.

Run-> python3 manage.py runserver


Open [http://127.0.0.1:8000/](http://127.0.0.1:8000/) to view Django Server in the browser.


## Starting the React Server:
---------------------------------


npm install react-scripts

npm install axios --save

npm install --save react-router-dom

npm start

Open [http://localhost:3000](http://localhost:3000) to view React Server in the browser.
