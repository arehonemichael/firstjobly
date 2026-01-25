import path from "path";
import { promises as fs } from "fs";

export const POST = async (req) => {
  try {
    const formData = await req.formData();
    const file = formData.get("image");

    if (!file || !file.name) {
      return new Response(
        JSON.stringify({ error: "No file uploaded" }),
        { status: 400 }
      );
    }

    // Ensure /public/images exists
    const imagesDir = path.join(process.cwd(), "public/images");
    await fs.mkdir(imagesDir, { recursive: true });

    // Clean filename
    const ext = file.name.split(".").pop();
    const baseName = file.name
      .replace(/\.[^/.]+$/, "")
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    const filename = `${baseName}-${Date.now()}.${ext}`;
    const filepath = path.join(imagesDir, filename);

    // Write file
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filepath, buffer);

    // ✅ RETURN RELATIVE PATH
    return new Response(
      JSON.stringify({ url: `/images/${filename}` }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Upload error:", err);
    return new Response(
      JSON.stringify({ error: "Upload failed" }),
      { status: 500 }
    );
  }
};
