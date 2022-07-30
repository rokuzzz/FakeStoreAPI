import { Router } from 'express'
import path from 'path'
import Image from '../models/Images'

const images = Router()
images.get('/:imageId', async (req, res) => {
  const {imageId} = req.params
  res.sendFile(path.join(__dirname, `../../public/images/${imageId}`))
})

export default images