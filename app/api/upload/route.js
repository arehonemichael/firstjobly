import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../lib/firebaseConfig";

export const POST = async (req) => {
  try {
    const formData = await req.formData();
    const file = formData.get("image");

    console.log("Received file:", file?.name, file?.size);

    if (!file || !file.name) {
      return new Response(
        JSON.stringify({ error: "No file uploaded" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Clean filename
    const ext = file.name.split(".").pop();
    const baseName = file.name
      .replace(/\.[^/.]+$/, "")
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    const filename = `${baseName}-${Date.now()}.${ext}`;

    // Upload to Firebase Storage
    const storageRef = ref(storage, `blog-images/${filename}`);
    
    const buffer = await file.arrayBuffer();
    await uploadBytes(storageRef, buffer, {
      contentType: file.type,
    });

    // Get public URL
    const downloadURL = await getDownloadURL(storageRef);

    console.log("Upload successful:", downloadURL);

    return new Response(
      JSON.stringify({ url: downloadURL }),
      { 
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (err) {
    console.error("Upload error:", err);
    return new Response(
      JSON.stringify({ 
        error: "Upload failed", 
        details: err.message 
      }),
      { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};