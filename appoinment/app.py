from flask import Flask, render_template, request, redirect, url_for, flash
from flask_mail import Mail, Message
import smtplib

app = Flask(__name__)
app.secret_key = 'your_secret_key'

# Configure Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'  # Use your email provider's SMTP server
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'itmbu.harsh@gmail.com'  # Your email address
app.config['MAIL_PASSWORD'] = 'Harsh@2042'  # Your email password
app.config['MAIL_DEFAULT_SENDER'] = 'harshpmvd@gmail.com'

mail = Mail(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/schedule', methods=['POST'])
def schedule():
    name = request.form['name']
    email = request.form['email']
    appointment_time = request.form['appointment_time']

    # Send confirmation email
    try:
        msg = Message("Appointment Confirmation", recipients=[email])
        msg.body = f"Hello {name},\n\nYour appointment is scheduled for {appointment_time}.\n\nThank you!"
        mail.send(msg)
        flash('Appointment scheduled and email sent!')
    except Exception as e:
        flash(f'Error: {str(e)}')
    return redirect(url_for('index'))

@app.route('/success')
def success():
    return "Your appointment has been scheduled successfully! A confirmation email has been sent."

if __name__ == '__main__':
    app.run(debug=True)
