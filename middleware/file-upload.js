const multer = require('multer');
const { v4 } = require('uuid');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
}

const fileUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/images');
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, v4() + '.' + ext);
    }
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];  
    // !! converts object to boolean.If it was falsey(e.g. 0, null, undefined, etc.).
    let error = isValid ? null : new Error('Invalid mime type!');
    // we have to pass (null and true) if succeed or (error and false) if failed
    cb(error, isValid);       
  }
})

module.exports = fileUpload;