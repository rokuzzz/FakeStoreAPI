import { Router, Request, Response } from "express";

const users = Router()

users.get('', ( req: Request, res: Response) => {
  res.send('GET response from /users endpoint')
})
users.post('', (req: Request, res: Response) => {
  res.send(req.body)
})
users.get('/:id', (req: Request, res: Response) => {
  res.send(`GET response form /users/${req.params.id} endpoint`)
})

export default users