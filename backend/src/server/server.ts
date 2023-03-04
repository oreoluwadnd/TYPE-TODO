import app from "../app";
import mongoose from 'mongoose';
import 'dotenv/config'

const port: string | number = process.env.PORT || 5000;
const uri: string = process.env.DATABASE || '';
const options = { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'Todo' };

mongoose.set("strictQuery", true);
mongoose.connect(uri, options).then(() =>
    console.log('Database connected')).catch(err => console.log(err));
const server = app.listen(port, () => console.log(`Server running on port ${port}`));