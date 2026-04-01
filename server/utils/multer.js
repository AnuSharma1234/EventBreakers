import multer from "multer";
import cloudinary from "./cloudinary.js";

const storage = multer.memoryStorage();

const upload = multer({ storage });

export const uploadImage = async (req, res, next) => {
    upload.single("eventBanner")(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ success: false, message: err.message });
        }
        
        if (req.file) {
            try {
                const result = await cloudinary.uploader.upload(req.file.buffer.toString('base64'), {
                    folder: "eventBreakersFolder",
                    resource_type: "image"
                });
                req.file.path = result.secure_url;
                req.file.cloudinary_id = result.public_id;
            } catch (uploadError) {
                return res.status(500).json({ success: false, message: "Failed to upload image" });
            }
        }
        next();
    });
};