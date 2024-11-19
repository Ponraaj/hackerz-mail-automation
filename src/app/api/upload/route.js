import { NextResponse } from "next/server";
import multer from "multer";
import path from "path";
import { promises as fs } from "fs";

const uploadDir = path.join(process.cwd(), "src", "utils", "templates");

// Ensure the directory exists
fs.mkdir(uploadDir, { recursive: true }).catch(console.error);

// Configure multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Set the destination folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Save the file with its original name
  },
});

const upload = multer({ storage });

// Helper function to handle middleware in Next.js API routes
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

// API route handler
export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!file || !file.name.endsWith(".html")) {
    return NextResponse.json({ error: "Invalid file format. Only HTML files are allowed." }, { status: 400 });
  }

  // Save the file
  const filePath = path.join(uploadDir, file.name);
  await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));

  return NextResponse.json({ success: true, filePath });
}
