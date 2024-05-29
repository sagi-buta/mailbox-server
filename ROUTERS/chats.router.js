const express = require("express"),
  router = express.Router();
const { newMsgServic, getChatsServic } = require("../BL/services/chats.servic");

router.get("/:flag", async function (req, res) {
  try {
    let result = await getChatsServic(req.body.user._id, req.params.flag);
    res.send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
});
router.post("/newmsg", async (req, res) => {
  try {
    const newMsgObj = req.body;
    const resolt = await newMsgServic(newMsgObj);
    // console.log(resolt, "roter");
    res.send(resolt);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = router;
