if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3000;
const { User } = require("./models");
const { comparePass, createToken, readPayload } = require("./helpers");

// midtrans
const midtransClient = require("midtrans-client");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/register", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const createUser = await User.create({ email, password });
    res
      .status(201)
      .json({ id: createUser.id, isSubscribed: createUser.isSubscribed });
  } catch (err) {
    next(err);
  }
});

app.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const findUser = await User.findOne({
      where: {
        email,
      },
    });

    if (!findUser) {
      throw { name: "invalid_email/password" };
    }

    const passwordValidation = comparePass(password, findUser.password);
    if (!passwordValidation) {
      throw { name: "invalid_email/password" };
    }
    const access_token = createToken({
      id: findUser.id,
    });

    res.status(200).json({
      id: findUser.id,
      isSubscribed: findUser.isSubscribed,
      access_token,
    });
  } catch (err) {
    next(err);
  }
});

// AUTHENTICATION
app.use(async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "invalid_token" };
    }

    const payload = readPayload(access_token);

    const user = await User.findByPk(payload.id);
    if (!user) {
      throw { name: "invalid_token" };
    }

    req.user = {
      id: user.id,
    };

    next();
  } catch (err) {
    next(err);
  }
});

app.get("/profile", async (req, res, next) => {
  try {
    const findUser = await User.findByPk(req.user.id);
    res
      .status(200)
      .json({ id: findUser.id, isSubscribed: findUser.isSubscribed });
  } catch (err) {
    next(err);
  }
});

app.patch("/subscription", async (req, res, next) => {
  console.log("masooookkk");
  try {
    await User.update(
      { isSubscribed: true },
      {
        where: {
          id: req.user.id,
        },
      }
    );

    res
      .status(200)
      .json({ message: `user with id ${req.user.id} now is a subscriber` });
  } catch (err) {
    next(err);
  }
});

app.post("/generate-transaction-token", async (req, res, next) => {
  try {
    const findUser = await User.findByPk(req.user.id);
    if (findUser.isSubscribed) {
      throw { name: "already_subscribed" };
    }

    // midtrans
    let snap = new midtransClient.Snap({
      // Set to true if you want Production Environment (accept real transaction).
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    });

    const order_id =
      "TRANS_" + Math.floor(100000000 + Math.random() * 900000000);

    let parameter = {
      transaction_details: {
        order_id: order_id, // isi order_id dengan value yang unique untuk tiap transaction
        gross_amount: 1000000, // harga total transaction (jika untuk keperluan bayar beberapa item maka tinggal di total harga2 nya)
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        // first_name: "budi",
        // last_name: "pratama",
        email: findUser.email,
        // phone: "08111222333",
      },
    };

    const transaction = await snap.createTransaction(parameter);

    let transactionToken = transaction;
    // console.log("transactionToken:", transactionToken);
    res.status(201).json({ transactionToken });
  } catch (err) {
    next(err);
  }
});

// ERROR HANDLER
app.use((err, req, res, next) => {
  console.log(err, "<<< ERROR");

  let code = 500;
  let message = "Internal server error";

  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    code = 400;
    message = err.errors[0].message;
  } else if (err.name === "invalid_token" || err.name === "JsonWebTokenError") {
    code = 401;
    message = "invalid token";
  } else if (err.name === "already_subscribed") {
    code = 400;
    message = "You already a subscriber";
  } else if (err.name === "invalid_email/password") {
    code = 401;
    message = "invalid email/password";
  }
  // midtrans error
  else if (err.name === "MidtransError") {
    code = err.httpStatusCode;
    message = err.ApiResponse.error_messages[0];
  }

  res.status(code).json({ message });
});

app.listen(PORT, () => console.log("running on port " + PORT));
