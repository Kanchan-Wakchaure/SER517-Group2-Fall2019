import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import *
from twilio.rest import Client
import datetime
from .getdate import DATE , TIME


TWILIO_NUMBER = '+19139560188'
SENDER = 'ser517group2@gmail.com'

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


with open(os.path.join(BASE_DIR, "sendgrid.txt")) as f:
    
    SENDGRID_API_KEY = f.read().strip()

with open(os.path.join(BASE_DIR, "twilio.txt")) as f:
    
    creds= f.readlines()
    ACC_SID = creds[0]
    AUTH = creds[1]


def send_email(receiver, subject, content, email_list, dt_time):

    sg = SendGridAPIClient(SENDGRID_API_KEY)

    date_time_obj = datetime.datetime.strptime(dt_time, '%Y-%m-%d %H:%M:%S')
    date_time_obj = date_time_obj - datetime.timedelta(hours = 0 , minutes = 1)
    time_stamp = int(date_time_obj.strftime("%S"))

    print(dt_time)
    
    current_dt = datetime.datetime.strptime(DATE + " " + TIME, '%Y-%m-%d %H:%M:%S')
    current_timestamp = int(current_dt.strftime("%S"))

    print(current_dt)

    print(receiver)
    print(email_list)

    if email_list == []:

        
        print("in email_list")
        message = Mail(
            from_email=SENDER,
            to_emails=receiver,
            subject=subject,
            html_content=content)


        message.send_at = SendAt(time_stamp, p=0)
        print(message)
        print("activated")
        
        try:

            #if time_stamp > current_timestamp:
            print(" in time_stamp")

            response = sg.send(message)
            print(response.status_code)
            print(response.body)
            print(response.headers)

        except Exception as e:
            
            print(e)
    else:


        
        email_list.append(receiver)

        for rcv in email_list:


            message = Mail(
            from_email=SENDER,
            to_emails=rcv,
            subject=subject,
            html_content=content)

            message.send_at = SendAt(time_stamp, p=0)
            
            print(message)
        
            try:

                #if time_stamp > current_timestamp:

                response = sg.send(message)
                print(response.status_code)
                print(response.body)
                print(response.headers)

            except Exception as e:
                
                print(e)

def send_text(phn, content):

    client = Client(ACC_SID, AUTH)

    print(phn)

    phn = phn[0]

    client.messages.create(to=phn, from_= TWILIO_NUMBER, body= content)




