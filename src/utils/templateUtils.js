import { supabase } from "@/lib/supabase";

const BUCKET_NAME = "templates";

export const loadTemplate = async (templateName) => {
  try {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .download(templateName);

    console.log(data)
    if (error) {
      throw new Error(`Error fetching template: ${error.message}`);
    }

    const text = await data.text()
    return text

  } catch (err) {
    console.log(err);
    throw new Error(`Failed to load template: ${err.message}`);
  }
};

export const replacePlaceHolders = async (template, placeHolders) => {
  if (template instanceof Blob) {
    const text = await template.text();
    template = text;
  }

  if (typeof template !== "string") {
    throw new Error("Template is not a valid string.");
  }

  return Object.keys(placeHolders).reduce((result, key) => {
    const regex = new RegExp(`{{${key}}}`, "g");
    const value = placeHolders[key];

    if (typeof value === "object" && value !== null) {
      const replacementValue = value.name || JSON.stringify(value);
      return result.replace(regex, replacementValue);
    }

    return result.replace(regex, value);
  }, template);
};


