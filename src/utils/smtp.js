import nodemailer from "nodemailer";
import { loadTemplate, replacePlaceHolders } from "./templateUtils";

const createTransporter = async (from, appPassword) => {
  return {
    transporter: nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: from,
        pass: appPassword,
      },
    }),
    senderEmail: from,
  };
};

export const sendEmail = async ({ from, to, templateName, placeHolders, appPassword }) => {
  const { transporter, senderEmail } = await createTransporter(from, appPassword);
  const template = loadTemplate(templateName);

  for (const userPlaceholders of placeHolders) {
    const mailBody = replacePlaceHolders(template, userPlaceholders);

    const mailOpts = {
      from: `"Hackerz" <${senderEmail}>`,
      to: userPlaceholders.email,
      subject: userPlaceholders.subject,
      text: mailBody.replace(/<[^>]+>/g, ""),
      html: mailBody,
    };

    await transporter.sendMail(mailOpts);
  }
};



