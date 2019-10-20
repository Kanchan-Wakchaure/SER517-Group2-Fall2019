import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

message = Mail(
    from_email='kdeolal@asu.edu',
    to_emails='kaustuv95@gmail.com',
    subject='kaja',
    html_content='<strong>kaja </strong>')

sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
response = sg.send(message)
print(response.status_code, response.body, response.headers)