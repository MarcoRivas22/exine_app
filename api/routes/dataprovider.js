const express = require("express");
const router = express.Router();
const { checkAuth } = require("../middlewares/authentication.js");

//models import
import Data from "../models/data.js";

router.get("/get-last-data", checkAuth, async (req, res) => {
  try {
    const userId = req.userData._id;
    const chartTimeAgo = req.query.chartTimeAgo;
    const dId = req.query.dId;
    const variable = req.query.variable;

    const timeAgoMs = Date.now() - chartTimeAgo * 60 * 1000;

    const data = await Data.find({
      userId: userId,
      dId: dId,
      variable: variable,
    })
      .sort({ time: -1 })
      .limit(1);

    const response = {
      status: "success",
      data: data,
    };

    return res.json(response);
  } catch (error) {
    console.log(error);

    const response = {
      status: "error",
      error: error,
    };

    return res.json(response);
  }
});

router.get("/get-small-charts-data", checkAuth, async (req, res) => {
  try {
    const userId = req.userData._id;
    const chartTimeAgo = req.query.chartTimeAgo;
    const dId = req.query.dId;
    const variable = req.query.variable;

    const timeAgoMs = Date.now() - chartTimeAgo * 60 * 1000;
    const toSearch =
      chartTimeAgo > 0
        ? {
            userId: userId,
            dId: dId,
            variable: variable,
            time: { $gt: timeAgoMs },
          }
        : {
            userId: userId,
            dId: dId,
            variable: variable,
          };

    const data = await Data.find(toSearch).sort({ time: 1 });

    const response = {
      status: "success",
      data: data,
    };

    return res.json(response);
  } catch (error) {
    console.log(error);

    const response = {
      status: "error",
      error: error,
    };

    return res.json(response);
  }
});

module.exports = router;
