import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const BUCKET_NAME = "templates";

export async function GET() {
  try {
    const { data, error } = await supabase.storage.from(BUCKET_NAME).list('', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'asc' }
    });

    if (error) {
      throw error;
    }

    const htmlFiles = data.filter((file) => file.name.endsWith(".html")).map((file) => file.name);

    return NextResponse.json({ templates: htmlFiles });
  } catch (error) {
    console.error("Error fetching templates:", error);
    return NextResponse.json({ templates: [], error: "Failed to fetch templates." }, { status: 500 });
  }
}
