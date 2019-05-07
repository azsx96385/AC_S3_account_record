const express = require("express");
const router = express.Router();
const recordModel = require("../models/record");

//路由區

//1.檢視
router.get("/", (req, res) => {
  recordModel.find().exec((err, data) => {
    if (err) {
      console.log(err);
    }
    //total result 計算
    let totalAmount = 0;
    data.forEach(item => {
      totalAmount += item.amount;
    });
    console.log(totalAmount);
    res.render("index", { userRecords: data, totalAmount });
  });
});

//2.新增
router.get("/create", (req, res) => {
  res.render("create");
});
router.post("/create", (req, res) => {});

//3.修改
router.get("/edit", (req, res) => {});
router.put("/edit", (req, res) => {});

//4.刪除
router.get("/delete", (req, res) => {});

//匯出路由
module.exports = router;
