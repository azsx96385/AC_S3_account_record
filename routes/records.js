const express = require("express");
const router = express.Router();
const recordModel = require("../models/record");

//路由區

//1.檢視
router.get("/", (req, res) => {
  recordModel.find({ userId: req.user._id }).exec((err, data) => {
    if (err) {
      console.log(err);
    }
    //total result 計算
    let totalAmount = 0;
    data.forEach(item => {
      totalAmount += item.amount;
    });

    res.render("index", { userRecords: data, totalAmount });
  });
});

//2.新增
router.get("/create", (req, res) => {
  res.render("create");
});
router.post("/create", (req, res) => {
  const { userId, name, date, category, amount } = req.body;
  let recorddata = new recordModel({ userId, name, date, category, amount });
  recorddata.save().catch(err => {
    console.log(err);
  });
  res.redirect("/records");
});

//3.修改
router.get("/edit/:id", (req, res) => {
  let id = req.params.id;
  recordModel.findOne({ _id: id }).then(data => {
    let [home, traffic, fun, food, other] = ["", "", "", "", ""];
    if (data.category == "fa-home") {
      home += true;
    } else if (data.category == "fa-shuttle-van") {
      traffic += true;
    } else if (data.category == "fa-grin-beam") {
      fun += true;
    } else if (data.category == "fa-utensils") {
      food += true;
    } else if (data.category == "fa-pen") {
      other += true;
    }
    res.render("edit", { data, home, traffic, fun, food, other });
  });
});
router.put("/edit/:id", (req, res) => {
  recordModel
    .findOne({ _id: req.params.id, userId: req.user._id })
    .then(data => {
      let { _id, userId, name, category, date, amount } = req.body;
      data.name = name;
      data.category = category;
      data.date = date;
      data.amount = amount;
      data.save().catch(err => console.log(err));
      res.redirect("/records");
    });
});

//4.刪除
router.get("/delete/:id", (req, res) => {
  recordModel
    .findOne({ _id: req.params.id, userId: req.user._id })
    .then(data => {
      data.remove();
      res.redirect("/records");
    });
});

//匯出路由
module.exports = router;
