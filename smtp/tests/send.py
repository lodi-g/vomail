#!/usr/bin/env python3

from argparse import ArgumentParser
import smtplib
import imghdr
from email.message import EmailMessage

lorem_ipsum = """Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc id cursus metus aliquam eleifend mi. Amet consectetur adipiscing elit duis tristique sollicitudin. Nunc sed augue lacus viverra vitae congue eu. Consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Nullam vehicula ipsum a arcu cursus vitae congue mauris. Vitae semper quis lectus nulla at volutpat. Sit amet venenatis urna cursus eget nunc. Ullamcorper velit sed ullamcorper morbi tincidunt ornare. Eu non diam phasellus vestibulum. Placerat vestibulum lectus mauris ultrices eros in cursus. Pulvinar pellentesque habitant morbi tristique. Risus in hendrerit gravida rutrum quisque. Nibh praesent tristique magna sit amet purus gravida quis blandit. Eget magna fermentum iaculis eu non diam. Ut sem nulla pharetra diam sit amet nisl suscipit. Metus aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices. Mattis enim ut tellus elementum sagittis vitae et leo duis.
Iaculis eu non diam phasellus vestibulum lorem sed risus.

Lorem ipsum."""


def main(args):
    recipients = args.to.split(",")

    msg = EmailMessage()
    msg["Subject"] = args.subject
    msg["From"] = f"{args.sender_name} <{args.sender}>"
    msg["To"] = recipients
    msg.set_content(args.body)

    if args.attachments:
        for file in args.attachments:
            with open(file, 'rb') as fp:
                img_data = fp.read()
            msg.add_attachment(img_data, maintype='image',
                               subtype=imghdr.what(None, img_data))

    with smtplib.SMTP(args.host, args.port) as s:
        s.send_message(msg)


if __name__ == "__main__":
    ap = ArgumentParser()
    ap.add_argument("-H", "--host", default="0.0.0.0", help="SMTP server host")
    ap.add_argument("-p", "--port", type=int,
                    default=2525, help="SMTP server port")
    ap.add_argument("-s", "--subject", default="Lorem Ipsum",
                    help="Mail's subject")
    ap.add_argument("-t", "--to", default="to@to.com",
                    help="Comma separated list of recipients' addresses")
    ap.add_argument("-f", "--from", dest="sender", default="from@from.com",
                    help="Sender's address")
    ap.add_argument("--sender-name", default="John Doe", help="Sender's name")
    ap.add_argument("-b", "--body", help="Mail's body", default=lorem_ipsum)
    ap.add_argument("-a", "--attachments",
                    help="Mail's attachments. Images only.", nargs="*")

    args = ap.parse_args()
    main(args)
