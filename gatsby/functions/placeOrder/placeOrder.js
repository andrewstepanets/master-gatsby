const nodemailer = require('nodemailer');

// create a transport for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  // Validate the data coming in is correct
  console.log(body);
  const requiredFields = ['email', 'name', 'order'];
  for (const field of requiredFields) {
    console.log(`Checking that ${field} is good`);
  }
  // send the email

  // Send the success or error message

  // Test send an email
  const info = await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: 'orders@example.com',
    subject: 'New Order',
    html: `<p>Your new pizza order is here!</p>`,
  });
  console.log(info);
  return {
    statusCode: 200,
    body: JSON.stringify(info),
  };
};
