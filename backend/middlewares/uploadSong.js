import multer from "multer"
const storage= multer.memoryStorage()

const uploadSong= multer({
    storage,
    limits: {fileSize: 15*1024*1024},
    fileFilter: (req, file, cb)=>{
        if(file.mimetype.startsWith('audio/') || file.mimetype.startsWith('image/')){
        return    cb(null, true)
        }
         cb(new Error("file type not supported "))
    }
})

export default uploadSong
