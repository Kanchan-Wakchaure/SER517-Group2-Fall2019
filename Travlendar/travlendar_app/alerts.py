import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

SENDER = 'ser517group2@gmail.com'



TWILIO_NUMBER = '+19139560188'

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


with open(os.path.join(BASE_DIR, "sendgrid.txt")) as f:
    print(BASE_DIR)
    SENDGRID_API_KEY = f.read().strip()

def send_email(receiver, subject, content):

    message = Mail(
        from_email=SENDER,
        to_emails=receiver,
        subject=subject,
        html_content=content)
    print(message)
    try:

        sg = SendGridAPIClient(SENDGRID_API_KEY)

        print(SENDGRID_API_KEY)

        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)

    except Exception as e:
        print("KAJA")
        print(e)

def send_text(phn, content):

    client = Client(ACC_SID, AUTH)
    client.messages.create(to=phn, from_= TWILIO_NUMBER, body= content)
