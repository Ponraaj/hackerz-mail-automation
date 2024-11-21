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

export const sendEmail = async ({ from, to, templateName, placeHolders, appPassword, excelFileName, sessionId }) => {
  const { transporter, senderEmail } = await createTransporter(from, appPassword);
  const template = await loadTemplate(templateName);

  for (const userPlaceholders of placeHolders) {
    try {
      const mailBody = await replacePlaceHolders(template, userPlaceholders);

      const mailOpts = {
        from: `"Hackerz" <${senderEmail}>`,
        to: userPlaceholders.email,
        subject: userPlaceholders.subject,
        text: mailBody.replace(/<[^>]+>/g, ""),
        html: mailBody,
      };

      await transporter.sendMail(mailOpts);

      await prisma.emailStatus.create({
        data: {
          email: userPlaceholders.email,
          subject: userPlaceholders.subject,
          status: 'sent',
          delivered: true,
          excelFileName: excelFileName,
          sessionId: sessionId,
          senderEmail: from
        },
      });
    } catch (err) {
      await prisma.emailStatus.create({
        data: {
          email: userPlaceholders.email,
          subject: userPlaceholders.subject,
          status: 'failed',
          delivered: false,
          excelFileName: excelFileName,
          sessionId: sessionId,
          senderEmail: from
        },
      });
      console.log(`Error sending email to ${userPlaceholders.email}: ${err.message}`);
    }
  }
};



