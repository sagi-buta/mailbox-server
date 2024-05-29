const express = require("express"),
  router = express.Router();

const app = express();
const {
  createFun,
  readFun,
  deleteFun,
  updateFun,
} = require("../BL/services/users.servic");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookie = require("cookie-parser");
app.use(cookie());

router.post("/register", async (req, res) => {
  try {
    // const { userName, email, password } = req.body;
    const { userName = req.body.firstname, email, password } = req.body;

    if (!(userName && email && password)) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const checkUser = await readFun({ email: email });

    if (checkUser) {
      return res.status(400).send({ message: "(email)User already exist" });
    }

    const myPassowrd = await bcrypt.hash(password, 10);

    const userResolt = await createFun({
      userName,
      email,
      password: myPassowrd,
    });

    const token = jwt.sign(
      { _id: userResolt._id, email },
      process.env.PRYVET_KEY, //process.env.SECRET_...
      { expiresIn: "2h" }
    );
    userResolt.token = token;
    userResolt.password = undefined;

    // res.status(201).send(userResolt);
    res.status(201).json(userResolt);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    if (!(email && password)) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const userResolt = await readFun({ email: email }, "+password");
    console.log(userResolt);
    let token = "";
    if (userResolt && (await bcrypt.compare(password, userResolt.password))) {
      token = jwt.sign(
        { _id: userResolt._id, email },
        process.env.PRYVET_KEY, //process.env.SECRET_...
        { expiresIn: "2h" }
      );
      //    const payload = jwt.verify(
      //         token,
      //         "shhhh",//process.env.SECRET_...
      //          )
      userResolt.token = token;
      userResolt.password = undefined;
    } else {
      return res
        .status(400)
        .send({ message: "Invalid credentials/not foud/not password" });
    }
    const optionsObj = {
      expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res.status(200).cookie("token", token, optionsObj).json({
      success: true,
      token,
      userResolt,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    let data = await readFun();
    res.send(data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
router.get("/:id", async (req, res) => {
  try {
    let data = await readFun({ _id: req.params.id });
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});
router.post("/", async (req, res) => {
  try {
    let data = await createFun(req.body);
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    let data = await deleteFun(req.params.id);
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});
router.put("/:id", async (req, res) => {
  try {
    let data = await updateFun(req.params.id, req.body);
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

module.exports = router;
