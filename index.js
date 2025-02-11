import dotenv from 'dotenv'
dotenv.config()

import { app } from './app.js'
import connectDB from './src/db/connectDB.js';


app.get('/hello', (req, res) => {
   res.status(200).json({ message: "Hello" });
})


connectDB()
   .then(() => {
      app.listen(process.env.PORT || 3000, () => {
         console.log(`Server is running at ${process.env.PORT}`);
      })
   })
   .catch((err) => {
      console.log('Error=---', err)
   })