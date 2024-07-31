import mongoose  from "mongoose";

const DbConnect = async () =>{

    try {
        const connectDb = await mongoose.connect(process.env.DB_STRING!)
        console.log("Connected to Database:", connectDb.connection.name)
        
    } catch (error) {
        console.error(error)
        process.exit(1)
    }

}

export default DbConnect;