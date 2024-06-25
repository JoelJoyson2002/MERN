const nodemailer=require('nodemailer')
const Mailgen=require('mailgen');

const sendemail=async options=>{
    console.log('SMTP_HOST:', process.env.SMTP_HOST);
console.log('SMTP_USER:', process.env.SMTP_USER);
console.log('SMTP_PASS:', process.env.SMTP_PASS);

    
    /*const transport={
        host:process.env.SMTP_HOST, //SMTP_HOST=smtp.mailtrap.io
        port:process.env.SMTP_PORT,
        auth:{
            user:process.env.SMTP_USER,
            pass:process.env.SMTP_PASS
        }
    };*/
    const transport={
        service:'gmail',    //new
        auth:{
            user:'20cs078@kpriet.ac.in',
            pass:'huxz yzpn bryx kret '
        }
    }

    const transporter=nodemailer.createTransport(transport); //old

    
    /*const message={
        from:`${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
        to:options.email,
        subject:options.subject,
        text:options.message
    }
    
    await transporter.sendMail(message)*/

    let MailGenerator=new Mailgen({
        theme:"default",
        product:{
            name:"Mailgen",     //new
            link:'https://mailgen.js/'
        }
    })
   
     let response={
        body:{
            name:"Daily",
            intro:"well done",
            table:{                      //new
                data:[
                   { item:"heloo",
                    description:"apple"}
                ]
            }
        }
     }

     let mail=MailGenerator.generate(response)
     let message={
        from:"20cs078@kpriet.ac.in",    //new
        to:options.email,
        subject:options.subject,
        text:options.message
     }
     await transporter.sendMail(message)
    

}
module.exports=sendemail