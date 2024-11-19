import fs from "fs";
import path from "path";

/**
 * Loads an email template from the file system.
 * @param {string} templateName - Name of the template file (without extension).
 * @returns {string} - The raw HTML content of the template.
 */
export const loadTemplate = (templateName) => {
  const filePath = path.join(process.cwd(), "src/utils/templates", `${templateName}.html`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Template file "${templateName}" not found in templates directory.`);
  }
  return fs.readFileSync(filePath, "utf8");
};

export const replacePlaceHolders = (template, placeHolders) => {
  return Object.keys(placeHolders).reduce((result, key) => {
    const regex = new RegExp(`{{${key}}}`, "g");
    const value = placeHolders[key];

    // If value is an object, try to extract name or use full object
    if (typeof value === 'object' && value !== null) {
      const replacementValue = value.name || JSON.stringify(value);
      return result.replace(regex, replacementValue);
    }

    return result.replace(regex, value);
  }, template);
};

