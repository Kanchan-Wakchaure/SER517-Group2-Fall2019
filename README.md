## Pre-requisites:

* python3
* pip3
* node.js

## Starting the Django Server:

On command prompt  run the following commands.

```pip3 install django djongo dnspython django-cors-headers djangorestframework```

Copy the file 'secretkey.txt' shared on google drive (https://drive.google.com/open?id=1RG2Dp6hjG7hmSEQNCeJuuRp6v9-0DKX2)
and paste it to the folder where manage.py resides (/SER517-Group2-Fall2019/Travlendar/).

Goto the directory which has manage.py in cmd.

```cd Travlendar```

```python3 manage.py makemigrations travlendar_app```

```python3 manage.py migrate```

```python3 manage.py runserver```


Open [http://127.0.0.1:8000/](http://127.0.0.1:8000/) to start Django Server.


## Starting the React Server:
---------------------------------
Go to the directory Travlendar/frontend:

```npm install```

```npm start```

Open [http://localhost:3000](http://localhost:3000) to view React Server in the browser.

## Deliverable for Sprint-1 features added:
------------------------------------------------
1. Homepage
2. Login page
3. Signup page
4. Create event - Submit simple form data to see event creation.
