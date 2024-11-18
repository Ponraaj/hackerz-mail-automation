import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const sesClient = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  }
})

export const sendEmail = async ({ to, subject, body }) => {
  const params = {
    Source: "ponraajv.cse2023@citchennai.net",
    Destination: {
      ToAddresses: to
    },
    Message: {
      Subject: { Data: subject },
      Body: { Text: { Data: body } }
    },
  }

  const cmd = new SendEmailCommand(params)
  return sesClient.send(cmd)
}
