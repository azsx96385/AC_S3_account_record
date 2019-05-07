const localStrategy = require("passport-local");
const fbStrategy = require("passport-facebook");
const bcrtpt = require("bcryptjs");

const userModel = require("../models/user");

//後續是要帶入passport座使用，因此使用fun 匯出
module.exports = passport => {
  //local Strategy
  passport.use(
    //建立策略物件
    new localStrategy({ usernameField: "email" }, (email, password, done) => {
      //驗證表單資料漏填

      if (!email || !password) {
        console.log("系統訊息 | 資料漏填了");
        return done(null, false, { message: "系統訊息 | 資料漏填了" });
      } else {
        //檢視是否有該使用者
        userModel.findOne({ email: email }).then(user => {
          console.log("user");
          if (!user) {
            console.log("系統訊息 | 該用戶尚未註冊");
            return done(null, false, { message: "系統訊息 | 該用戶尚未註冊" });
          } else {
            //比對輸入密碼
            bcrtpt.compare(password, user.password, (err, isMatch) => {
              if (err) {
                console.log(err);
              }
              if (!isMatch) {
                console.log("系統訊息 | 密碼錯誤");
                return done(null, false, { message: "系統訊息 |密碼錯誤" });
              } else {
                console.log("系統訊息 | 登入");
                return done(null, user);
              }
            });
          }
        });
      }
    })
  );

  //facebook Strategy

  //2.log session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    userModel.findById(id, (err, user) => {
      console.log("des", user);
      done(err, user);
    });
  });
};
