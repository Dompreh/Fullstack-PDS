require("dotenv").config();
const ejs = require("ejs");
const sendmail = require("../helpers/sendMail");
const User = require("../models/User");
const CryptoJs = require("crypto-js");

const sendWelcomeEmail = async () => {
  const users = await User.find({ status: 0 });
  if (users.length > 0) {
    console.log(users)
    for (let user of users) {
      const hashedpwd = CryptoJs.AES.decrypt(user?.password, process.env.PASS);
      const originalpwd = hashedpwd.toString(CryptoJs.enc.Utf8);

      ejs.renderFile(
        "templates/welcome.ejs",
        { fullname: user.fullname, password: originalpwd, email: user.email },
        async (err, info) => {
          let messageOption = {
            from: process.env.EMAIL,
            to: user.email,
            subject: "Welcome to Xpress",
            html: info,
          };

          try {
            await sendmail(messageOption);
            await User.findByIdAndUpdate(user._id, { $set: { status: 1 } });
          } catch (error) {
            console.log(error);
          }
        }
      );
    }
  }
};

module.exports = { sendWelcomeEmail };
