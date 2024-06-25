
const mongoose=require('mongoose');

const connect_databse=()=>{

    mongoose.connect(process.env.DB_LOCAL_URI,{
        useNewUrlParser:true,
        UseUnifiedTopology:true
    }).then((con)=>{
            console.log(`Connection successful at host ${con.connection.host}` )
    }).catch((e)=>{
         console.log(e);
    })
}

module.exports=connect_databse;