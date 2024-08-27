const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");
const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const PORT = 3000;
const mailerSend = new MailerSend({
  apiKey:
    "mlsn.2a99649c03cdf20c43d5287bb9dee80cfa1f908a7f94838cb11056fd3723b721",
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML file from the 'views' directory
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Serve static files (images, CSS, etc.) from the 'assets' directory
app.use("/assets", express.static(path.join(__dirname, "assets")));

// Handle the form submission
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const sentFrom = new Sender("info@domain.com", "piyush patel");
    const recipients = [new Recipient("7557rr@gmail.com", "Piyush Patel")];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      //   .setReplyTo(sentFrom)
      .setSubject("This is a Subject")
      .setHtml(`<strong>${message}</strong> <p>by->${email}</p>`)
      .setText(message);

    const response = await mailerSend.email.send(emailParams);
    console.log(response);

    res.status(200).send("Message sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending message");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
