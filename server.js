const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use('/uploads', express.static('uploads'));

// STORAGE
const storage = multer.diskStorage({
destination: (req, file, cb) => cb(null, 'uploads/'),
filename: (req, file, cb) => {
cb(null, Date.now() + "-" + file.originalname);
}
});

const upload = multer({ storage });

// ROUTE
app.post('/apply', upload.single('cv'), (req, res) => {

const { name, phone, passport, job } = req.body;
const file = req.file;

if(!file){
return res.status(400).json({message:"CV required"});
}

const applicant = {
name,
phone,
passport,
job,
cv: file.filename,
date: new Date()
};

console.log(applicant);

res.json({message:"Success", applicant});
});

// START
app.listen(5000, ()=>console.log("Server running on port 5000"));