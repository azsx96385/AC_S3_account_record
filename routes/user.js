const express = require("express");
const router = express.Router();

//路由區

//1.註冊
router.get("/register", (req, res) => {
  res.render("register");
});
router.post("/register", (req, res) => {});

//2.登入
router.get("/login", (req, res) => {
  res.render("login");
});
router.post("/login", (req, res) => {});

//3.登出
router.get("/logout", (req, res) => {
  res.redirect("/user/login");
});
//匯出路由
module.exports = router;
