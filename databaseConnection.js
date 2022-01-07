const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/microproject",
             {  useNewUrlParser:true,
                useUnifiedTopology:true
            })
        .then(console.log("Database connected successfully"))
        .catch((e) => console.log("An error occured in connection with database",e))