import express from "express";
import cors from "cors";
import session from "express-session";
import connectMongoDBSession from "connect-mongodb-session";
import UserRoute from "./routes/userRoute.js";

const app = express();
const mongoURI = "mongodb://localhost:27017/sessions";
const MongoDBStore = connectMongoDBSession(session);

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// allow request from other origin (Frontend which is at different port)
app.use(
  cors({
    origin: "http://localhost:3221", // Specify the exact URL of the frontend
    credentials: true, // This is important to allow sending cookies across origins
  })
);

const store = new MongoDBStore({
  uri: mongoURI,
  collection: "mySessions",
});

app.use(
  session({
    secret: "key that will sign cookie",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.get("/", (req, res) => {
  req.session.isAuth = true;
  req.session.save((err) => {
    if (err) console.error("Session save error:", err);
    res.send("Hello Sessions");
  });
});

// use routes
app.use("/user", UserRoute);

export default app;
