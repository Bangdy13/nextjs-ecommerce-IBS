import mongoose from "mongoose";

function connDB() {
  if (mongoose.connections[0].readyState) {
    console.log("Sudah terhubung.");
    return;
  }
  mongoose.set("strictQuery", true);
  mongoose.connect(
    process.env.MONGODB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) throw err;
      console.log("Menghubungkan ke mongoDB.");
    }
  );
}

export default connDB;
