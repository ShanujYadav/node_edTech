import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        let MONGOURI = 'mongodb+srv://marketing:w8ykukFQ3PVtdbn5@cluster0.rcfxd.mongodb.net/Cluster0'
        const connectionInstance = await mongoose.connect(`${MONGOURI}`)
        console.log(`MongoDB Connected---- ${connectionInstance.connection.host}`);
    } catch (e) {
        console.log('Mongo DB Error ---', e)
        process.exit(1)
    }
}

export default connectDB;