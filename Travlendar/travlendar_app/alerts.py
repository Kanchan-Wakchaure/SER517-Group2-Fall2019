import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

SENDER = 'ser517group2@gmail.com'

def send_email(receiver, time, subject, content):

    message = Mail(
        from_email=SENDER,
        to_emails=receiver,
        subject=subject,
        html_content=content)
    try:

        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)

    except Exception as e:
        print(e.message)