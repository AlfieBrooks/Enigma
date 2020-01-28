import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { accountDetails } from "./schemas/singup";
import { bookingDetails} from './schemas/booking';
const app = express();
const port = 443;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/config", (req, res) => {
  res.send({ features: { cuck: true } });
});

app.post("/signup", (req, res) => {
  if (req.body && req.body.email && req.body.password === req.body.confirmPassword) {
    const {
      email,
      password,
      firstName,
      lastName,
      confirmPassword,
      postcode,
      hourlyRate,
      maxDistance,
      companyName,
      membership,
      membershipExpiry,
      accountType
    } = req.body;

    const AccountDetails = mongoose.model("enigmatest", accountDetails);
    const accountObj = new AccountDetails({
      _id: email,
      password,
      firstName,
      lastName,
      confirmPassword,
      postcode,
      hourlyRate,
      maxDistance,
      companyName,
      membership,
      membershipExpiry,
      accountType
    });

    return accountObj.save((err, acc) => {
      if (err) {
        return res.status(409).json({ error: `Error When saving Account ${err}` });
      }
      return res.status(201).json({ success: acc._id });
    });
  }
  return res.status(400).json({ error: "Invalid Body" });
});

app.get("/account", (req, res) => {
  if (req.headers && req.headers.email && req.headers.password) {
    const { email, password } = req.headers;
    const AccountDetails = mongoose.model("enigmatest", accountDetails);
    return AccountDetails.findOne({ _id: email, password }, (err, acc) => {
      if (err) {
        return res.status(400).json({ error: `Something went wrong ${err}` });
      }
      if (!acc) {
        return res.status(401).json({ error: `Invalid Credentials ${email}, ${password}` });
      }
      return res.status(200).json({ success: acc._id });
    });
  }
  return res.status(400).json({ error: "Invalid Headers" });
});

app.post("/booking", (req, res) => {
  if (
    req.body &&
    req.body.startDate &&
    req.body.endDate &&
    req.body.companyName &&
    req.body.postcode &&
    req.body.requestId &&
    req.body.interpreterId
  ) {
    const { startDate, endDate, companyName, postcode, requestId, interpreterId } = req.body;
    const Booking = mongoose.model("booking", bookingDetails);
    const bookingRequest = new Booking({
      startDate,
      endDate,
      companyName,
      postcode,
      requestId,
      interpreterId
    });

    return bookingRequest.save((err, booking) => {
      if (err) {
        return res.status(409).json({ error: `Error When saving your booking ${err}` });
      }
      return res.status(201).json({ success: booking._id });
    });
  }
});

app.get("/availability", (req, res) => {
  console.log(req.headers)
  if (req.headers && req.headers.startdate && req.headers.enddate && req.headers.postcode) {
    let unavailableInterpreterIds = [];
    const { startdate, enddate, postcode } = req.headers;
    console.log("here")
    const Booking = mongoose.model("booking", bookingDetails);
    console.log("Booking", Booking)

    Booking.find({ startdate, enddate, postcode }, (err, bookings) => {
      console.log(err)
      for (let index = 0; unavailableInterpreterIds.length < bookings.length; index++) {
        unavailableInterpreterIds.push(bookings[index].interpreterId);
      }
    });
    const AccountDetails = mongoose.model("enigmatest", accountDetails);
    return AccountDetails.find({ _id: { $nin: unavailableInterpreterIds }, accountType: 'Interpreter' }, (err, availability) => {
      console.log(availability, err)
    });
  }
});

connect();

function listen() {
  app.listen(port);
  console.log("App started on port " + port);
}

function connect() {
  mongoose.connection
    .on("error", console.error)
    .on("disconnected", connect)
    .once("open", listen);
  return mongoose.connect("mongodb://35.246.119.118:27017/enigmatest", {
    keepAlive: 1,
    useNewUrlParser: true
  });
}
