---
layout: post
title: "Glam Up Your Drag Queen Database App: Refactoring for Elegance and Efficiency"
description: >
  Dive into the glamorous world of coding with our latest blog post, where we give your
  drag queen database app a dazzling makeover, ensuring it sparkles just as brightly as
  the queens it features. From introducing a sleek serverUtils.js for streamlined
  Knex.js database calls, to organizing routes in a separate file for clarity and
  maintenance ease, adding a stylish Bootstrap navbar for effortless navigation, and
  designing an inviting landing page that sets the stage for your users' journey. We
  also guide you through enhancing index pages with sortable columns, creating detailed
  show pages for each queen, harnessing the power of Nodemon for development efficiency,
  and leveraging package.json scripts to automate tasks. This refactoring journey
  promises to elevate your app's performance and user experience to the main stage.
image: /assets/img/webdevfun/glam-up-your-drag-queen-database-app-refactoring-for-elegance-and-efficiency.jpg
tags: ['Node.js', 'Express Router', 'Bootstrap Navbar', 'CRUD', 'Knex', 'Nodemon', 'Drag Queens']
author: stevendnoble
related_posts:
  - webdevfun/_posts/2022-08-15-behind-the-curtains-setting-up-your-stage-with-a-nodejs-server.md
  - webdevfun/_posts/2022-08-29-spotlight-on-crud-managing-your-drag-queen-database-with-elegance.md
sitemap: false
hide_description: true
---

* this unordered seed list will be replaced by the toc
{:toc}

In the vibrant world of drag, staying fresh and fabulous requires constant evolution. The same goes for your drag queen database app. It's time to step up the performance with some savvy refactoring and new features that will make your app as polished as the queens it represents. Let's dive into the makeover process, highlighting key enhancements like server utilities for cleaner database calls, streamlined routing, a chic navbar, and more.

## Creating a `serverUtils.js` for Knex DB Calls

First things first, let's tidy up those database calls. By introducing a serverUtils.js file and utilizing `Knex.js`, an SQL query builder, we can streamline interactions with our database. This abstraction not only makes our code more readable but also simplifies query adjustments and maintenance.

~~~js
// file: "utils/serverUtils.js"
const knexConfig = require("../knexfile.js"),
  knex = require("knex")(knexConfig[process.env.NODE_ENV]);

const allowedKeys = {
  seasons: ["name", "year"],
  drag_queens: [
    "name",
    "age_during_season",
    "hometown",
    "placement",
    "season_id",
  ],
};

function filterObject(originalObject, allowedKeys) {
  return Object.keys(originalObject).reduce((obj, key) => {
    if (allowedKeys.includes(key)) {
      obj[key] = originalObject[key];
    }
    return obj;
  }, {});
}

function getAllSeasonsWithCounts() {
  return knex("seasons")
    .leftJoin("drag_queens", "seasons.id", "drag_queens.season_id")
    .select("seasons.id", "seasons.name", "seasons.year")
    .count("drag_queens.id as drag_queen_count")
    .groupBy("seasons.id")
}

function addNewObject(table, requestParams) {
  const filteredParams = filterObject(requestParams, [allowedKeys.table]);
  return knex(table).insert(filteredParams);
}

module.exports = {
  filterObject,
  getAllSeasonsWithCounts,
  addNewObject,
};
~~~

<details>
<summary>Click here to see the full code for `serverUtils.js`</summary>
<div markdown="1">

~~~js
// file: "utils/serverUtils.js"
const knexConfig = require("../knexfile.js"),
  knex = require("knex")(knexConfig[process.env.NODE_ENV]);

const allowedKeys = {
  seasons: ["name", "year"],
  drag_queens: [
    "name",
    "age_during_season",
    "hometown",
    "placement",
    "season_id",
  ],
};

function filterObject(originalObject, allowedKeys) {
  return Object.keys(originalObject).reduce((obj, key) => {
    if (allowedKeys.includes(key)) {
      obj[key] = originalObject[key];
    }
    return obj;
  }, {});
}

function getAllObjects(table) {
  return knex(table).orderBy(orderBy.split(","));
}

function getAllSeasonsWithCounts() {
  return knex("seasons")
    .leftJoin("drag_queens", "seasons.id", "drag_queens.season_id")
    .select("seasons.id", "seasons.name", "seasons.year")
    .count("drag_queens.id as drag_queen_count")
    .groupBy("seasons.id")
    .orderBy(orderBy.split(","));
}

function getAllDragQueensWithSeasons() {
  return knex("drag_queens")
    .leftJoin("seasons", "seasons.id", "drag_queens.season_id")
    .select(
      "drag_queens.name as drag_queen_name",
      "seasons.name as season_name",
      "*",
    )
    .orderBy(orderBy.split(","));
}

function addNewObject(table, requestParams) {
  const filteredParams = filterObject(requestParams, [allowedKeys.table]);
  return knex(table).insert(filteredParams);
}

function getObjectById(table, id) {
  return knex(table).where({ id: id });
}

function updateObject(table, requestParams) {
  const { id } = requestParams;
  const filteredParams = filterObject(req.body, [allowedKeys.table]);
  return knex(table).where({ id: id }).update(filteredParams);
}

function deleteObject(table, requestParams) {
  const { id } = req.params;
  return knex(table).where({ id: id }).del();
}

module.exports = {
  filterObject,
  getAllObjects,
  getAllSeasonsWithCounts,
  getAllDragQueensWithSeasons,
  addNewObject,
  getObjectById,
  updateObject,
  deleteObject,
};
~~~
</div>
</details>

## Pulling Routes into a Separate File

As our app grows, so does the complexity of our routing. To keep things manageable, we'll extract our route definitions into dedicated files, say `routes/seasons.js` and `routes/drag_queens.js`. This not only cleans up our main server file but also enhances modularity and readability. To do this we will use [express.Router](https://expressjs.com/en/guide/routing.html).

~~~js
// file: "routes/seasons.js"
const express = require("express"),
  router = express.Router();

const {
  getAllSeasonsWithCounts,
  addNewObject,
  getObjectById,
  getDragQueensBySeasonId,
  updateObject,
  deleteObject,
} = require("../utils/serverUtils.js");

router.get("/", async (req, res) => {
  try {
    const seasons = await getAllSeasonsWithCounts();
    res.render("seasons/index", { seasons: seasons });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// ...

module.exports = router;
~~~

Try to refactor the rest of the routes on your own. Then try to do the same with the `drag_queens.js` file.

<details>
<summary>Click here to see the full code for `routes/seasons.js` and `routes/drag_queens.js`</summary>
<div markdown="1">

~~~js
// file: "routes/seasons.js"
const express = require("express"),
  router = express.Router();

const {
  getAllSeasonsWithCounts,
  addNewObject,
  getObjectById,
  getDragQueensBySeasonId,
  updateObject,
  deleteObject,
} = require("../utils/serverUtils.js");

router.get("/", async (req, res) => {
  try {
    const seasons = await getAllSeasonsWithCounts();
    res.render("seasons/index", { seasons: seasons });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.get("/new", async (req, res) => {
  try {
    res.render("seasons/new");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.post("/", async (req, res) => {
  try {
    await addNewObject("seasons", req.body);
    res.redirect("/seasons");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.get("/:id/edit", async (req, res) => {
  try {
    const season = await getObjectById("seasons", req.params.id);
    res.render("seasons/edit", { season: season[0] });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.post("/:id", async (req, res) => {
  try {
    await updateObject("seasons", req);
    res.redirect("/seasons");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.post("/:id/delete", async (req, res) => {
  try {
    await deleteObject("seasons", req.params.id);
    res.redirect("/seasons");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
~~~

~~~js
// file: "routes/drag_queens.js"
const express = require("express"),
  router = express.Router();

const {
  getAllObjects,
  getAllDragQueensWithSeasons,
  addNewObject,
  getObjectById,
  updateObject,
  deleteObject,
} = require("../utils/serverUtils.js");

router.get("/", async (req, res) => {
  try {
    const drag_queens = await getAllDragQueensWithSeasons();
    res.render("drag_queens/index", { drag_queens: drag_queens });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.get("/new", async (req, res) => {
  try {
    const seasons = await getAllObjects("seasons");
    res.render("drag_queens/new", { seasons: seasons });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.post("/", async (req, res) => {
  try {
    await addNewObject("drag_queens", req.body);
    res.redirect("/drag-queens");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.get("/:id/edit", async (req, res) => {
  try {
    const drag_queen = await getObjectById("drag_queens", req.params.id);
    const seasons = await getAllObjects("seasons");
    res.render("drag_queens/edit", {
      drag_queen: drag_queen[0],
      seasons: seasons,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.post("/:id", async (req, res) => {
  try {
    await updateObject("drag_queens", req);
    res.redirect("/drag-queens");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.post("/:id/delete", async (req, res) => {
  try {
    await deleteObject("drag_queens", req.params.id);
    res.redirect("/drag-queens");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
~~~
</div>
</details>

This greatly reduces your main `server.js` file:

~~~js
// file: "server.js"
const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  expressLayouts = require("express-ejs-layouts"),
  seasons = require("./routes/seasons"),                  // Two new lines here to include
  drag_queens = require("./routes/drag_queens"),          // code from the files we created
  port = 3000;

app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("layout", "layout");

app.get("/", (req, res) => {
  res.send("Welcome to the main stage of my fabulous Express server!");
});
app.use("/seasons", seasons);                                // Two new lines here to use the
app.use("/drag-queens", drag_queens);                        // included routes

app.listen(port, () => {
  console.log(`Express server sashaying on port ${port}`);
});
~~~

## Adding a Navbar

No app is complete without a navigation bar. Bootstrap to the rescue! Adding a navbar will guide your users through the app with style and ease. We can create a partial and then include that in our layout.

~~~html
<!-- file: "views/partials/navbar.ejs" -->
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">Drag Realm</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="/seasons">Seasons</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/drag-queens">Drag Queens</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
~~~

~~~html
<!-- file: "in views/layout.ejs" -->
<body>
  <%- include("./partials/navbar.ejs") %>
  <div class="home-container">
    <div class="container h-100 overflow-auto">
      <%- body %>
    </div>
  </div>
</body>
~~~

## Crafting a Landing Page

First impressions matter. A landing page introduces users to your app, adorned with fabulous imagery and a summary of what they can explore. Implement this in an `index.ejs` file and make it the root route's response.

~~~html
<div class="row h-100 align-items-center">
  <div class="col-md-6 offset-md-3">
    <div class="card mt-5 mb-5 rounded-3 shadow-lg opacity-75">
      <div class="card-body text-center p-5">
        <h1 class="card-title text-center mt-4 mb-4 text-danger">Drag Realm</h1>
        <h3>
          Welcome to the main stage of my fabulous Express server!
        </h3>
      </div>
    </div>
  </div>
</div>
~~~

## Ordering by Columns in Index Pages

Enhance user experience by allowing them to order the list of drag queens or seasons by various attributes. Implement this feature by adjusting your Knex queries based on query parameters.

~~~js
// file: "in utils/serverUtils.js"
const validOrderBys = {
  seasons: ["name", "year"],
  drag_queens: [
    "name",
    "age_during_season",
    "hometown",
    "placement",
    "year",
    "year,placement",
  ],
};

function validateOrderBy(table, orderBy) {
  if (!validOrderBys[table].includes(orderBy)) {
    throw new Error("Invalid order parameter");
  }
  return orderBy;
}

function getAllObjects(table, orderBy = "id") {
  return knex(table).orderBy(orderBy.split(","));
}

function getAllSeasonsWithCounts(orderBy = "id") {
  validateOrderBy("seasons", orderBy);
  return knex("seasons")
    .leftJoin("drag_queens", "seasons.id", "drag_queens.season_id")
    .select("seasons.id", "seasons.name", "seasons.year")
    .count("drag_queens.id as drag_queen_count")
    .groupBy("seasons.id")
    .orderBy(orderBy.split(","));
}

function getAllDragQueensWithSeasons(orderBy = "id") {
  validateOrderBy("drag_queens", orderBy);
  return knex("drag_queens")
    .leftJoin("seasons", "seasons.id", "drag_queens.season_id")
    .select(
      "drag_queens.id as drag_queen_id",
      "drag_queens.name as drag_queen_name",
      "seasons.name as season_name",
      "*",
    )
    .orderBy(orderBy.split(","));
}
~~~

Then we can add links in the `index.ejs` pages to allow ordering by the column headers. These links add an `order_by` param to the url which is passed in the request.

~~~html
<!-- file: "in /views/seasons/index.ejs" -->
<thead>
  <tr>
    <th scope="col"><a href="/seasons?order_by=name" class="link-danger">Name</a></th>
    <th scope="col"><a href="/seasons?order_by=year" class="link-danger">Year</a></th>
    <th scope="col">Contestants</th>
  </tr>
</thead>
~~~

~~~html
<!-- file: "in /views/drag_queens/index.ejs" -->
<h2 class="card-title text-center mt-4">
  <a href="/drag-queens" class="link-danger">
    Drag Queens
  </a>
</h2>
<table class="table table-hover">
  <thead>
    <tr>
      <th scope="col"><a href="/drag-queens?order_by=name" class="link-danger">Name</a></th>
      <th scope="col"><a href="/drag-queens?order_by=age_during_season" class="link-danger">Age</a></th>
      <th scope="col"><a href="/drag-queens?order_by=hometown" class="link-danger">Hometown</a></th>
      <th scope="col"><a href="/drag-queens?order_by=placement" class="link-danger">Placement</a></th>
      <th scope="col">Season</th>
    </tr>
  </thead>
  ...
</table>
~~~

Then we can pass it into the server utility functions through our routes.

~~~js
// file: "routes/seasons.js"
router.get("/", async (req, res) => {
  try {
    const orderBy = req.query.order_by || "seasons.id";
    const seasons = await getAllSeasonsWithCounts(orderBy);
    res.render("seasons/index", { seasons: seasons });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});
~~~


~~~js
// file: "routes/drag_queens.js"
router.get("/", async (req, res) => {
  try {
    const drag_queens = await getAllDragQueensWithSeasons(req.query.order_by);
    res.render("drag_queens/index", { drag_queens: drag_queens });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});
~~~

## Showcasing a Drag Queen

Create individual show pages for each season, offering more detailed insights into the queens on the season. Utilize dynamic routing to fetch and display this data.

~~~js
file: "routes/seasons.js"
router.get("/:id", async (req, res) => {
  try {
    const season = await getObjectById("seasons", req.params.id);
    const drag_queens = await getDragQueensBySeasonId(req.params.id);
    res.render("seasons/show", { season: season[0], drag_queens: drag_queens });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});
~~~

How would you display all of the queens on the season?

<details>
<summary>Click here to see one way to do it</summary>
<div markdown="1">

~~~html
<!-- file: "/views/seasons/show.ejs" -->
<div class="row">
  <div class="col-md-8 offset-md-2">
    <div class="card mt-5 mb-5 rounded-3 shadow-lg">
      <div class="card-body">
        <h2 class="card-title text-center mt-4"><%= season.name %>(<%= season.year %>)</h2>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Year</th>
              <th scope="col">Contestants</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td scope="row"><%= season.name %></td>
              <td><%= season.year %></td>
              <td><%= season['count(*)'] %></td>
            </tr>
          </tbody>
        </table>
        <div class="d-grid mb-5">
          <a href="/seasons/<%= season.id %>/edit" class="btn btn-outline-danger">Edit Season</a>
        </div>
        <h3 class="card-title text-center mt-4">
          Drag Queens from <%= season.name %>
        </h3>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Age</th>
              <th scope="col">Hometown</th>
              <th scope="col">Place</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <% drag_queens.forEach(queen => { %>
              <tr>
                <td scope="row">
                  <a href="/drag-queens/<%= queen.id %>/edit" class="link-danger">
                    <%= queen.name %>
                  </a>
                </td>
                <td><%= queen.age_during_season %></td>
                <td><%= queen.hometown %></td>
                <td><%= queen.placement %></td>
                <td>
                  <form
                    action="/drag-queens/<%= queen.id %>/delete"\
                    method="POST"
                    class="container"
                  >
                    <button type="submit" class="btn btn-danger">
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            <% }) %>
          </tbody>
        </table>
        <div class="d-grid mb-4">
          <a href="/drag-queens/new" class="btn btn-danger">Add a Drag Queen</a>
        </div>
      </div>
    </div>
  </div>
</div>
~~~

## Using Nodemon for Development Efficiency

Nodemon will watch the files in your directory and automatically restart the server upon changes. Install it as a dev dependency and say goodbye to manually restarting your server.

~~~bash
npm install --save-dev nodemon
~~~

## Leveraging Scripts in `package.json`

Automate common tasks with npm scripts. Add a script for starting your app with Nodemon, making your development workflow smoother. You can also implement scripts for migrations, seeds, and any other commands you run commonly on the command line.

~~~json
"scripts": {
  "dev": "NODE_ENV=development nodemon server.js",
  "migrate": "knex migrate:latest --knexfile knexfile.js",
  "seed": "knex seed:run --knexfile knexfile.js"
},
~~~

To run your app in development mode with Nodemon, simply execute `npm run dev`. Similarly, you can run `npm run migrate` or `npm run seed`.

## Conclusion

Just like a queen’s routine, refactoring your app is an ongoing process of enhancement and optimization. By implementing these updates, your drag queen database app will not only run more smoothly but also provide a more engaging user experience. Remember, in both drag and development, dazzle comes from dedication. Keep shining, developers!