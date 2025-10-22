import e from "express";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "maria.weimann@ethereal.email",
    pass: "9QKPuky5qaX5ChxTz2",
  },
});

const send = async (info) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await transporter.sendMail(info);
      console.log("Message sent: %s", result.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(result));
      resolve(result);
    } catch (error) {
      console.log("Error from sendMail", error);
      reject(error);
    }
  });
};

const sendMail = async (email, pin, type) => {
  switch (type) {
    case "request-password-reset":
      const resetInfo = {
        from: '"eden" <eden.casper41@ethereal.email>',
        to: `${email}`,
        subject: "Password Reset Pin",
        text: `Your password reset pin is ${pin},\n\nThis pin is valid for 1 day.`,
        html: `<p>Your password reset pin is <b>${pin}</b>
        </br></br><span>This pin is valid for 1 day.</span></p>`,
      };
      return send(resetInfo);
    case "reset-successful":
      const successInfo = {
        from: '"eden" <eden.casper41@ethereal.email>',
        to: `${email}`,
        subject: "Password Reset Successful",
        text: `Your password has been reset successfully.`,
        html: `<p>Your password has been reset successfully.</p>`,
      };
      return send(successInfo);
    default:
      throw new Error(`Unknown email type: ${type}`);
  }
};

export default sendMail;
