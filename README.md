## Pre-requisites:

* python3
* pip3
* node.js

## Starting the Django Server:

On command prompt  run the following commands.

```pip3 install django djongo dnspython django-cors-headers djangorestframework django-rest-auth django-allauth coverage==4.5.4```

Copy the file 'secretkey.txt' shared on google drive (https://drive.google.com/open?id=1RG2Dp6hjG7hmSEQNCeJuuRp6v9-0DKX2)
and paste it to the folder where manage.py resides (/SER517-Group2-Fall2019/Travlendar/).
Copy the file '.env.local' shared on google drive (https://drive.google.com/open?id=1RG2Dp6hjG7hmSEQNCeJuuRp6v9-0DKX2)
and paste it to the folder Travlendar/frontend/.

Goto the directory which has manage.py in cmd.

```cd Travlendar```

```python3 manage.py migrate```

```python3 manage.py runserver```

For testing run the below: 
coverage run manage.py test users -v 2

coverage html (This command will create a folder which conatins the report)


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
