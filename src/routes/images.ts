import { Router } from 'express'
import path from 'path'
import Image from '../models/Images'

const images = Router()
images.get('/:imageName', (req, res) => {
  const {imageName} = req.params
  res.sendFile(path.join(__dirname, `../../public/images/${imageName}`))
})

export default images