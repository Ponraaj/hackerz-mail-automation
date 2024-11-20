import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const BUCKET_NAME = "templates";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !file.name.endsWith(".html")) {
      return NextResponse.json(
        { error: "Invalid file format. Only HTML files are allowed." },
        { status: 400 }
      );
    }


    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(file.name, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      throw new Error(`File upload to Supabase failed: ${error.message}`);
    }

    const { data: publicUrlData, error: urlError } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(file.name);

    if (urlError) {
      throw new Error(`Failed to generate public URL: ${urlError.message}`);
    }

    return NextResponse.json({
      success: true,
      filePath: publicUrlData.publicURL,
    });
  } catch (err) {
    console.error("Error during file upload:", err);
    return NextResponse.json(
      { error: err.message || "An error occurred while uploading the file." },
      { status: 500 }
    );
  }
}
