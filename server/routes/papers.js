const express = require('express');
const multer = require('multer');
const router = express.Router();
const Paper = require('../../models/paper');
const path = require('path');

//File Storage Config

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads')); // your uploads folder
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});
const upload = multer({storage});

//upload routes
router.post('/upload', upload.single('file'), async(req,res)=>{
    const {subject,year} = req.body;
    const newPaper = new Paper({
        subject,
        year,
        filePath: req.file.path,
    });
    await newPaper.save();
    res.json("msg: Paper uploaded")
});
//fetch paper by subject & year
router.get('/search', async(req, res)=>{
    try {
    const { subject, year } = req.query;
    const filters = {};
    if (subject) filters.subject = new RegExp(subject, 'i'); // case-insensitive
    if (year) filters.year = year;

    const papers = await Paper.find(filters).sort({ uploadedAt: -1 });
    const result = papers.map(paper => ({
            subject: paper.subject,
            year: paper.year,
            uploadedAt: paper.uploadedAt,
            path: paper.filePath , //`http://localhost:5000/${paper.filePath.replace(/\\/g, '/')}`  // 👈 builds the full URL
        }));

        res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;