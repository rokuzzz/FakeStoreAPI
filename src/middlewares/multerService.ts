import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  },
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/images'))
  }
})

const fileUpload = multer({
  storage
}).single('avatar')

export default fileUpload