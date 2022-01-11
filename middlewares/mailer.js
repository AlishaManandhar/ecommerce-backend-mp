const nodemailer = require("nodemailer");
"use strict";

require("dotenv").config()

let transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.PASSWORD,
  }
})

module.exports.registerMail = async (email = "alisha.manandhar@deerwalk.edu.np", firstname = "Alisha", lastname = "Manandhar") => {
  
  let info = await transporter.sendMail({
      from: process.env.USER_EMAIL, 
      to: email, // list of receivers
      subject: "Welcome Email", // Subject line
       // plain text body
      html: `<p>Hi ${firstname},</p>
      <p><strong>Thanks for signing up to our Baby Store!</strong>&nbsp;</p><p>We started Online Baby Store because we noticed &nbsp;a lack of dedicated eCommerce for baby products.</p><p>We deeply believe that, regardless of how you manage your time, <strong>everything cant be managed in time</strong>. So we set out to build a system that sells relevant and affordable products.</p><p>We hope we can help you find right products for your baby too—whether you’re an experienced parents or parents with new borne</p><p> Happy Shopping! </p> <p>Regards,</p> <p> <strong> Online Baby Store </strong></p>` // html body
    });

}


module.exports.deliveryMail = async (email = "alisha.manandhar@deerwalk.edu.np", firstname = "Alisha", orderProducts) => {
  let str = ""
      for(let i = 0; i < orderProducts.length; i++)
    {
      str += `<li>&nbsp; <b> ${orderProducts[i].productName} ${orderProducts[i].quantity} * ${orderProducts[i].price} </b></li>`
    }
  
   
  let info = await transporter.sendMail({
      from: process.env.USER_EMAIL, 
      to: email, // list of receivers
      subject: "Product Delivery", // Subject line
       // plain text body
      html: `<p>Hi ${firstname},</p>
      <p>&nbsp;Your products for order number <b>${orderProducts[0].orderId._id}</b>have been delivered few moments ago. The products are:&nbsp;</p><ol> ${str}  </ol><p>Regards,</p> <p> <strong> Online Baby Store </strong></p>` // html body
    });
  console.log("Hi")
}


