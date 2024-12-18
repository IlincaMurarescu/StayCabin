const express = require("express");
const path = require("path");
const session = require("express-session");

const userRoutes = require("./routes/user");
const cabinRoutes = require("./routes/cabin");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use("/users", userRoutes);
app.use("/cabins", cabinRoutes);

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signin1");
});

app.get("/profile", async (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/login");
  }

  console.log(req.session.userId);

  try {
    const userId = req.session.userId;

    const response = await fetch(
      `http://localhost:3000/cabins/ownedcabins/${userId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch owned cabins");
    }

    const ownedCabins = await response.json();

    res.render("profile", {
      username: req.session.username,
      ownedCabins: ownedCabins,
    });
  } catch (error) {
    console.error("Error fetching owned cabins:", error);
    res.status(500).send("Server error");
  }
});

app.get("/editcabin/:cabinId", (req, res) => {
  res.render("editcabin");
});

app.get("/cabindetail/:cabinId", async (req, res) => {
  const cabinId = req.params.cabinId;
  const userId = req.session.userId;

  try {
    const response = await fetch(
      `http://localhost:3000/cabins/cabinedetail/${cabinId}`
    );

    if (!response.ok) {
      return res.status(404).send("Cabin not found");
    }

    const cabin = await response.json();

    res.render("cabindetail", { cabin: cabin, userId: userId });
  } catch (error) {
    console.error("Error fetching cabin details:", error);
    res.status(500).send("Error fetching cabin details");
  }
});

// app.use((req, res) => {
//   res.status(404).send("Page Not Found");
// });

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
