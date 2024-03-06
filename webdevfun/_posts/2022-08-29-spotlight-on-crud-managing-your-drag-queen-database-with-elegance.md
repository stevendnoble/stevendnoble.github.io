---
layout: post
title: "Spotlight on CRUD: Managing Your Drag Queen Database with Elegance"
description: >
  Dive into the glamorous world of drag and discover how to manage your very own drag queen
  database with finesse using Node.js, SQLite3, and Bootstrap. This comprehensive guide walks
  you through the essential CRUD (Create, Read, Update, Delete) operations needed to keep your
  digital domain as dynamic and dazzling as the queens it represents. Learn to add new
  performers with stylish Bootstrap forms, showcase your fabulous roster, keep their details
  up-to-date, and gracefully remove profiles when it's time for their final curtain call.
  Whether you're a drag performer looking to manage bookings and gigs or a fan creating a
  tribute site, this tutorial ensures your backend management is as polished as the queens
  themselves. Step behind the scenes and let's get the show started!
image: /assets/img/webdevfun/spotlight-on-crud-managing-your-drag-queen-database-with-elegance.jpg
tags: ['Node.js', 'Express', 'SQLite3', 'CRUD', 'Knex', 'Drag Queens']
author: stevendnoble
related_posts:
  - webdevfun/_posts/2022-09-12-glam-up-your-drag-queen-database-app-refactoring-for-elegance-and-efficiency.md
  - webdevfun/_posts/2022-08-15-behind-the-curtains-setting-up-your-stage-with-a-nodejs-server.md
sitemap: false
hide_description: true
---

* this unordered seed list will be replaced by the toc
{:toc}

In the vibrant world of drag, every queen brings her unique brand of charisma, uniqueness, nerve, and talent. But behind the sequins and lashes, efficient management of bookings, performances, and fan interactions is key to keeping the show running smoothly. Enter the realm of CRUD operations—Create, Read, Update, Delete—four essential actions that keep your drag queen database as polished as your performance. This post will guide you through implementing these operations on your drag queen database with the sleek styling of Bootstrap for your forms.

## Setting the Stage with Bootstrap and Express-EJS-Layouts

A more convenient way to implement layouts in an Express app using EJS is with the express-ejs-layouts middleware. This package automatically inserts your individual views into a layout template.

### Step 1: Install express-ejs-layouts

~~~bash
npm install express-ejs-layouts
~~~

### Step 2: Set up express-ejs-layouts in your Express app

~~~js
const expressLayouts = require('express-ejs-layouts');

app.set('view engine', 'ejs');
app.use(expressLayouts);

// Optional: Specify the default layout
app.set('layout', 'layout'); // This looks for views/layout.ejs
~~~

### Step 3: Create your layout file (views/layout.ejs)

In express-ejs-layouts, <%- body %> is where the content of your individual views will be inserted. Before diving into the database operations, ensure your web project is draped in the elegance of Bootstrap. Including Bootstrap in your project is as simple as adding its CSS link to the `<head>` of your HTML. With Bootstrap included, your forms and tables will inherit a professional and stylish look with minimal effort, allowing you to focus on functionality.

~~~html
<!-- file: "views/layout.ejs" -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link href="/stylesheets/styles.css" rel="stylesheet">
    <meta charset="utf-8" />
    <title>Drag Queens!</title>
  </head>
  <body>
    <div class="home-container">
      <div class="container h-100 overflow-auto">
        <%- body %>
      </div>
    </div>
  </body>
</html>
~~~

## The Database: SQLite3 and Knex

Setting up Knex to handle database setup and migrations in a Node.js application involves several steps, from installing Knex and its dependencies to creating and running migration scripts. Knex is a powerful SQL query builder and schema migration tool that supports multiple database systems, including SQLite3, PostgreSQL, MySQL, and others. Here's a step-by-step guide to get you started:

### 1. Install Knex and Database Driver

First, you need to install Knex and the appropriate database driver for your database system (e.g., SQLite3, PostgreSQL, MySQL).

~~~bash
npm install knex sqlite3
~~~

### 2. Initialize Knex Configuration

Use the Knex CLI to initialize a Knex configuration file. This command creates a `knexfile.js` file in your project root directory, which contains configuration settings for your database connections. Move this to the `/db` folder.

~~~bash
npx knex init
~~~

Edit `knexfile.js` to configure your database settings. For SQLite3, it might look something like this:

~~~js
// file: "knexfile.js"
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './db/drag_database.sqlite3'
    },
    useNullAsDefault: true
  },
  migrations: {
    directory: './db/migrations'
  },
  seeds: {
    directory: './db/seeds'
  }

  // You can define other environments like production here
};
~~~

### 3. Create Migration Scripts

Use Knex's migration CLI to create a new migration script. Replace create_table_name with a descriptive name for your migration task.

~~~bash
npx knex migrate:make create_table_name
~~~

This command creates a new file in the migrations directory with a timestamp and your specified name, containing skeleton up and down functions for your migration:

~~~js
exports.up = function(knex) {
  // Create tables and modify database schema
};

exports.down = function(knex) {
  // Undo the schema changes if necessary
};
~~~

Fill in the exports.up function to define your table schema, and exports.down to drop the table or revert the schema changes if needed.

Example for creating a `seasons` table:

~~~bash
npx knex migrate:make create_seasons
~~~

~~~js
exports.up = function(knex) {
  return knex.schema.createTable('seasons', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.integer('year').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('seasons');
};
~~~

Example for creating a `drag_queens` table:

~~~bash
npx knex migrate:make create_drag_queens
~~~

~~~js
exports.up = function(knex) {
  return knex.schema.createTable('drag_queens', function(table) {
    table.increments('id').primary(); // Auto-incrementing primary key
    table.string('name').notNullable(); // Drag queen's name
    table.integer('age').notNullable(); // Age during the season
    table.string('hometown').notNullable(); // Hometown
    table.integer('placement').notNullable(); // Placement in the competition
    table.integer('season_id').unsigned().notNullable(); // Foreign key to the 'seasons' table
    table.foreign('season_id').references('seasons.id'); // Establishes the foreign key relationship
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('drag_queens'); // Drops the 'drag_queens' table if rolling back
};
~~~

### 4. Run Migrations

To apply the migrations and update your database schema, run:

~~~bash
npx knex migrate:latest
~~~

To rollback the last batch of migrations, use:

~~~bash
npx knex migrate:rollback
~~~

For the `npx` commands, you may need to add a path for the `knexfile.js`. To do this, run:
~~~bash
npx knex migrate:latest --knexfile "./knexfile.js"
~~~

### 5. Seed the Database (Optional)

If you want to seed your database with initial data, you can use Knex's seeding feature. First, create a seed file:

~~~bash
npx knex seed:make seed_name
~~~

Edit the created seed file in the seeds directory to insert your data. Then, run the seed command to populate your database:

~~~bash
npx knex seed:run
~~~

Example seeds for the `seasons` and `drag_queens` tables:

~~~bash
npx knex seed:make 01_seasons
npx knex seed:make 02_drag_queens
~~~

~~~js
// file: "db/seeds/01_seasons.js"
exports.seed = async function(knex) {
  // Deletes ALL existing entries for a clean slate
  await knex('seasons').del();

  await knex('seasons').insert([
    {id: 1, name: 'Season 1', year: 2009},
    {id: 2, name: 'Season 2', year: 2010},
    {id: 3, name: 'Season 3', year: 2011},
  ]);
};
~~~

~~~js
// file: "db/seeds/02_drag_queens.js"
exports.seed = async function(knex) {
  // Deletes ALL existing entries for a clean slate
  await knex('drag_queens').del();

  await knex('drag_queens').insert([
    // Season 1 Queens
    {name: 'BeBe Zahara Benet', age: 28, hometown: 'Cameroon', placement: 1, season_id: 1},
    {name: 'Nina Flowers', age: 34, hometown: 'Puerto Rico', placement: 2, season_id: 1},
    {name: 'Rebecca Glasscock', age: 26, hometown: 'Florida', placement: 3, season_id: 1},
    {name: 'Shannel', age: 29, hometown: 'Las Vegas, Nevada', placement: 4, season_id: 1},
    {name: 'Ongina', age: 26, hometown: 'Los Angeles, California', placement: 5, season_id: 1},
    {name: 'Jade', age: 25, hometown: 'Chicago, Illinois', placement: 6, season_id: 1},
    {name: 'Akashia', age: 24, hometown: 'Cleveland, Ohio', placement: 7, season_id: 1},
    {name: 'Tammie Brown', age: 29, hometown: 'Long Beach, California', placement: 8, season_id: 1},
    {name: 'Victoria "Porkchop" Parker', age: 39, hometown: 'Raleigh, North Carolina', placement: 9, season_id: 1},

    // Season 2 Queens
    {name: 'Tyra Sanchez', age: 21, hometown: 'Orlando, Florida', placement: 1, season_id: 2},
    {name: 'Raven', age: 30, hometown: 'Riverside, California', placement: 2, season_id: 2},
    {name: 'Jujubee', age: 25, hometown: 'Boston, Massachusetts', placement: 3, season_id: 2},
    {name: 'Tatianna', age: 21, hometown: 'Falls Church, Virginia', placement: 4, season_id: 2},
    {name: 'Pandora Boxx', age: 37, hometown: 'Rochester, New York', placement: 5, season_id: 2},
    {name: 'Jessica Wild', age: 29, hometown: 'San Juan, Puerto Rico', placement: 6, season_id: 2},
    {name: 'Sahara Davenport', age: 25, hometown: 'Dallas, Texas', placement: 7, season_id: 2},
    {name: 'Morgan McMichaels', age: 28, hometown: 'Mira Loma, California', placement: 8, season_id: 2},
    {name: 'Sonique', age: 26, hometown: 'Atlanta, Georgia', placement: 9, season_id: 2},
    {name: 'Mystique Summers Madison', age: 25, hometown: 'Chicago, Illinois', placement: 10, season_id: 2},
    {name: 'Nicole Paige Brooks', age: 36, hometown: 'Atlanta, Georgia', placement: 11, season_id: 2},
    {name: 'Shangela Laquifa Wadley', age: 28, hometown: 'Paris, Texas', placement: 12, season_id: 2},

    // Season 3 Queens
    {name: 'Raja', age: 36, hometown: 'Los Angeles, California', placement: 1, season_id: 3},
    {name: 'Manila Luzon', age: 28, hometown: 'New York, New York', placement: 2, season_id: 3},
    {name: 'Alexis Mateo', age: 30, hometown: 'St. Petersburg, Florida', placement: 3, season_id: 3},
    {name: 'Yara Sofia', age: 28, hometown: 'Bayamon, Puerto Rico', placement: 4, season_id: 3},
    {name: 'Carmen Carrera', age: 25, hometown: 'Elmwood Park, New Jersey', placement: 5, season_id: 3},
    {name: 'Shangela Laquifa Wadley', age: 29, hometown: 'Paris, Texas', placement: 6, season_id: 3},
    {name: 'Delta Work', age: 34, hometown: 'Norwalk, California', placement: 7, season_id: 3},
    {name: 'Stacy Layne Matthews', age: 25, hometown: 'Back Swamp, North Carolina', placement: 8, season_id: 3},
    {name: 'Mariah Paris Balenciaga', age: 29, hometown: 'Atlanta, Georgia', placement: 9, season_id: 3},
    {name: 'India Ferrah', age: 23, hometown: 'Dayton, Ohio', placement: 10, season_id: 3},
    {name: 'Mimi Imfurst', age: 27, hometown: 'Philadelphia, Pennsylvania', placement: 11, season_id: 3},
    {name: 'Phoenix', age: 29, hometown: 'Atlanta, Georgia', placement: 12, season_id: 3},
    {name: 'Venus D-Lite', age: 26, hometown: 'Los Angeles, California', placement: 13, season_id: 3},
  ]);
};
~~~

Run the seed files:

~~~bash
npx knex seed:run
~~~

### Additional Tips

* **Version Control:** Keep your `knexfile.js`, migration scripts, and seed files in version control to maintain consistency across development environments.
* **Environment Configurations:** Utilize different database configurations for development, testing, and production environments within your `knexfile.js`.
* **Documentation:** For more complex setups or database operations, refer to the Knex documentation for detailed guides and API references.

By following these steps, you can set up Knex to handle your database schema migrations efficiently, making your database management process more structured and maintainable.

## Create: Adding New Seasons and Queens

Assuming you've set up a SQLite3 database in a Node.js environment as discussed earlier, let’s continue using SQLite3 to store information about drag queens and their seasons.

Creating new records is the first step in CRUD. Let's create a form to add a new season to our database:

~~~html
<!-- file: "/views/seasons/new.ejs" -->
<div class="row h-100 align-items-center">
  <div class="col-md-6 offset-md-3">
    <div class="card mt-5 mb-5 rounded-3 shadow-lg">
      <div class="card-body">
        <h2 class="card-title text-center mt-4">Add a Season</h2>
        <form action="/seasons" method="POST" class="container mt-5">
          <div class="mb-3">
            <label for="season-name" class="form-label">Season Name</label>
            <input
              type="text"
              class="form-control"
              id="season-name"
              name="name"
              required
            >
          </div>
          <div class="mb-3">
            <label for="season-year" class="form-label">Year</label>
            <input
              type="number"
              class="form-control"
              id="season-year"
              name="year"
              required
            >
          </div>
          <div class="d-grid mb-4">
            <button type="submit" class="btn btn-danger">Add Season</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
~~~

![Seasons New Page](/assets/img/webdevfun/drag/season-new.png){:lead loading="lazy"}

The navbar will be implemented in the next blog, but this is how it will look.
{:.note}

On the server side, handle the form submission by inserting the new queen into your database. You need to install `body-parser` and include that in your `server.js` file as well:

~~~bash
npm install body-parser
~~~

~~~js
const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      expressLayouts = require('express-ejs-layouts'),
      knexConfig = require('./knexfile.js'),
      knex = require('knex')(knexConfig[process.env.NODE_ENV]),
      port = 3000;

app.use(expressLayouts);                            // use the layout for consistent styling and the navbar
app.use(bodyParser.urlencoded({ extended: true })); // parse the request body
app.use(express.static('public'));                  // serve static assets from the public folder

app.set('view engine', 'ejs');
app.set('layout', 'layout');

function filterObject(originalObject, allowedKeys) {
  return Object.keys(originalObject).reduce((obj, key) => {
    if (allowedKeys.includes(key)) {
      obj[key] = originalObject[key];
    }
    return obj;
  }, {});
}

// render the "new.html" page with the form to add a season
app.get('/seasons/new', async (req, res) => {
  try {
    res.render('seasons/new')
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
})

// endpoint to call when the form is submitted
app.post('/seasons', async (req, res) => {
  try {
    const allowedKeys = ['name', 'year'];
    const filteredParams = filterObject(req.body, allowedKeys);
    await knex('seasons').insert(filteredParams);
    console.log(`A new season has been added with ID ${this.lastID}`);
    res.redirect('/seasons');
  } catch(error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});
~~~

We need to create a GET route for rendering the page with the form as well as a POST route to submit the form. The route posts to `/seasons` and the body of the request contains key-value pairs for `name` and `year`. The function `filterObject` creates a new object out of just the keys in `allowedKeys`. These correspond to the columns we would like to insert into our database. These should be sanitized to prevent SQL injection attacks, but that is a post for another day.

To insert the record in the database, we use the `knex` [insert method](https://knexjs.org/guide/query-builder.html#insert). After inserting the season, a logical place to redirect the user to is that list of all seasons. Read on to see how we implement that page!

<details>
<summary>Click here to see the code for adding a new drag queen</summary>
<div markdown="1">

~~~html
<!-- file: "/views/drag_queens/new.ejs" -->
<div class="row h-100 align-items-center">
  <div class="col-md-6 offset-md-3">
    <div class="card mt-5 mb-5 rounded-3 shadow-lg">
      <div class="card-body">
        <h2 class="card-title text-center mt-4">Add a Drag Queen</h2>
        <form action="/drag-queens" method="POST" class="container mt-5">
          <div class="mb-3">
            <label for="drag-queen-name" class="form-label">Drag Queen Name</label>
            <input
              type="text"
              class="form-control"
              id="drag-queen-name"
              name="name"
              required
            >
          </div>
          <div class="mb-3">
            <label for="drag-queen-age">Age</label>
            <input
              type="number"
              class="form-control"
              id="drag-queen-age"
              name="age"
              required
            >
          </div>
          <div class="mb-3">
            <label for="drag-queen-hometown">Hometown</label>
            <input
              type="text"
              class="form-control"
              id="drag-queen-hometown"
              name="hometown"
              required
            >
          </div>
          <div class="mb-3">
            <label for="drag-queen-placement">Placement</label>
            <input
              type="text"
              class="form-control"
              id="drag-queen-placement"
              name="placement"
              required
            >
          </div>
          <div class="mb-3">
            <label for="drag-queen-season-id">Season</label>
            <select class="form-control" id="drag-queen-season-id" name="season_id">
              <% seasons.forEach(season => { %>
                <option value="<%= season.id %>"><%= season.name %> - <%= season.year %></option>
              <% }); %>
            </select>
          </div>
          <div class="d-grid mb-4">
            <button type="submit" class="btn btn-danger">Add Drag Queen</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
~~~

![Drag Queen New Page](/assets/img/webdevfun/drag/drag-queen-new.png){:lead loading="lazy"}

~~~js
// file: "in server.js"
app.get('/drag-queens/new', async (req, res) => {
  try {
    const seasons = await knex('seasons');
    res.render('drag_queens/new', { seasons: seasons })
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.post('/drag-queens', async (req, res) => {
  try {
    const allowedKeys = ['name', 'age', 'hometown', 'placement', 'season_id'];
    const filteredParams = filterObject(req.body, allowedKeys);
    await knex('drag_queens').insert(filteredParams);
    console.log(`A new drag queen has been added with ID ${this.lastID}`);
    res.redirect('/drag-queens');
  } catch(error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});
~~~
</div>
</details>

## Read: Displaying the Ensemble

Reading from the database allows you to display all the fabulous queens, the seasons they were on, and their details:

~~~js
// file: "in server.js"
app.get('/seasons', async (req, res) => {
  try {
    const seasons = await knex('seasons')
      .leftJoin('drag_queens', 'seasons.id', 'drag_queens.season_id')
      .select('seasons.id', 'seasons.name', 'seasons.year')
      .count('drag_queens.id as drag_queen_count')
      .groupBy('seasons.id')
      .orderBy(orderBy);
    res.render('seasons/index', { seasons: seasons });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
})

app.get('/drag-queens', async (req, res) => {
  try {
    const drag_queens = await knex('drag_queens')
      .leftJoin('seasons', 'seasons.id', 'drag_queens.season_id')
      .select('drag_queens.name as drag_queen_name', 'drag_queens.id as drag_queen_id', 'seasons.name as season_name', '*')
      .orderBy(orderBy.split(','));
    res.render('drag_queens/index', { drag_queens: drag_queens });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});
~~~

And here's how you might structure the seasons and queens views using Bootstrap:

~~~html
<!-- file: "/views/seasons/index.ejs" -->
<div class="row">
  <div class="col-md-8 offset-md-2">
    <div class="card mt-5 mb-5 rounded-3 shadow-lg">
      <div class="card-body">
        <h2 class="card-title text-center mt-4">Seasons</h2>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Year</th>
              <th scope="col">Contestants</th>
            </tr>
          </thead>
          <tbody>
            <% seasons.forEach(season => { %>
              <tr>
                <td scope="row">
                  <a href="/seasons/<%= season.id %>" class="link-danger">
                    <%= season.name %>
                  </a>
                </td>
                <td><%= season.year %></td>
                <td><%= season.drag_queen_count %></td>
              </tr>
            <% }) %>
          </tbody>
        </table>
        <div class="d-grid mb-4">
          <a href="/seasons/new" class="btn btn-danger">Add a Season</a>
        </div>
      </div>
    </div>
  </div>
</div>
~~~

![Seasons Index Page](/assets/img/webdevfun/drag/seasons-index.png){:lead loading="lazy"}

Here we have added a link at the bottom of the page to add a new season. This links to the page we created before.

<details>
<summary>Click here to see the code for displaying all of the drag queens</summary>
<div markdown="1">

~~~html
<!-- file: "/views/drag_queens/index.ejs" -->
<div class="row">
  <div class="col-md-8 offset-md-2">
    <div class="card mt-5 mb-5 rounded-3 shadow-lg">
      <div class="card-body">
        <h2 class="card-title text-center mt-4">Drag Queens</h2>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Age</th>
              <th scope="col">Hometown</th>
              <th scope="col">Placement</th>
              <th scope="col">Season</th>
            </tr>
          </thead>
          <tbody>
            <% drag_queens.forEach(queen => { %>
              <tr>
                <td scope="row">
                  <a href="drag-queens/<%= queen.drag_queen_id %>/edit" class="link-danger">
                    <%= queen.drag_queen_name %>
                  </a>
                </td>
                <td><%= queen.age %></td>
                <td><%= queen.hometown %></td>
                <td><%= queen.placement %></td>
                <td><%= queen.season_name %> (<%= queen.year %>)</td>
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

![Drag Queens Index Page](/assets/img/webdevfun/drag/drag-queens-index.png){:lead loading="lazy"}
</div>
</details>


## Update: Keeping the Show Fresh

Updating records ensures that information stays current. For example, to update a queen's bio, you could use a similar form to the one used for creation, pre-filled with the current details, and process the update on the server like so:

~~~js
// file: "in server.js"
app.get('/seasons/:id/edit', async (req, res) => {
  try {
    const { id } = req.params;
    const season = await knex('seasons').where({ id: id });
    res.render('seasons/edit', { season: season[0] });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.post('/seasons/:id', async (req, res) => {
  try {
    // await updateObject('seasons', req.params)
    const { id } = req.params;
    const allowedKeys = ['name', 'year'];
    const filteredParams = filterObject(req.body, allowedKeys);
    await knex('seasons').where({ id: id }).update(filteredParams);
    console.log(`Season with ID ${id} has been updated`)
    res.redirect('/seasons');
  } catch(error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});
~~~

## Delete: The Final Curtain Call

Finally, deleting records allows you to remove queens who are no longer active:

~~~js
app.post('/seasons/:id/delete', async (req, res) => {
  try {
    // await deleteObject('seasons', req.params.id)
    const { id } = req.params;
    await knex('seasons').where({ id: id }).del();
    console.log(`Season with ID ${id} has been deleted`)
    res.redirect('/seasons');
  } catch(error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});
~~~

We need to create a form with a POST request to the `/seasons/:id` endpoint to update the season as well as a POST request to `seasons/:id/delete` to delete the season. Use Bootstrap to do this:

~~~html
<!-- file: "views/seasons/edit.ejs" -->
<div class="row h-100 align-items-center">
  <div class="col-md-6 offset-md-3">
    <div class="card mt-5 mb-5 rounded-3 shadow-lg">
      <div class="card-body">
        <h2 class="card-title text-center mt-4">Update Season</h2>
        <form
          action="/seasons/<%= season.id %>"
          method="POST"
          class="container mt-5"
        >
          <div class="mb-3">
            <label for="season-name" class="form-label">Season Name</label>
            <input
              type="text"
              class="form-control"
              id="season-name"
              name="name"
              value="<%= season.name %>"
              required
            >
          </div>
          <div class="mb-3">
            <label for="season-year" class="form-label">Year</label>
            <input
              type="number"
              class="form-control"
              id="season-year"
              name="year"
              value="<%= season.year %>"
              required
            >
          </div>
          <div class="d-grid mb-3">
            <button type="submit" class="btn btn-danger">Update Season</button>
          </div>
        </form>
        <form
          action="/seasons/<%= season.id %>/delete"\
          method="POST"
          class="container"
        >
          <div class="d-grid mb-4">
            <button type="submit" class="btn btn-outline-danger">
              Delete Season
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
~~~

![Season Edit Page](/assets/img/webdevfun/drag/season-edit.png){:lead loading="lazy"}

<details>
<summary>Click here to see the code for updating all of the drag queens</summary>
<div markdown="1">

~~~js
app.get('/drag-queens/:id/edit', async (req, res) => {
  try {
    // const drag_queen = await getObjectById('drag_queens', req.params.id);
    // const seasons = await getAllObjects('seasons');
    const { id } = req.params;
    const drag_queen = await knex('drag_queens').where({ id: id });
    const seasons = await knex('seasons');
    res.render('drag_queens/edit', { drag_queen: drag_queen[0], seasons: seasons });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.post('/drag-queens/:id', async (req, res) => {
  try {
    // await updateObject('drag_queens', req.params)
    const { id } = req.params;
    const allowedKeys = ['name', 'age_during_season', 'hometown', 'placement', 'season_id'];
    const filteredParams = filterObject(req.body, allowedKeys);
    await knex('drag_queens').where({ id: id }).update(filteredParams);
    console.log(`Drag Queen with ID ${id} has been updated`)
    res.redirect('/drag-queens');
  } catch(error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.post('/drag-queens/:id/delete', async (req, res) => {
  try {
    // await deleteObject('drag_queens', req.params.id)
    const { id } = req.params;
    await knex('drag_queens').where({ id: id }).del();
    console.log(`Drag Queen with ID ${id} has been deleted`)
    res.redirect('/drag-queens');
  } catch(error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});
~~~

~~~html
<!-- file: "/views/drag_queens/edit.ejs" -->
<div class="row h-100 align-items-center">
  <div class="col-md-6 offset-md-3">
    <div class="card mt-5 mb-5 rounded-3 shadow-lg">
      <div class="card-body">
        <h2 class="card-title text-center mt-4">Edit <%= drag_queen.name %></h2>
        <form
          action="/drag-queens/<%= drag_queen.id %>"
          method="POST"
          class="container mt-5"
        >
          <div class="mb-3">
            <label for="drag-queen-name" class="form-label">Drag Queen Name</label>
            <input
              type="text"
              class="form-control"
              id="drag-queen-name"
              name="name"
              value="<%= drag_queen.name %>"
              required
            >
          </div>
          <div class="mb-3">
            <label for="drag-queen-age">Age</label>
            <input
              type="number"
              class="form-control"
              id="drag-queen-age"
              name="age"
              value="<%= drag_queen.age %>"
              required
            >
          </div>
          <div class="mb-3">
            <label for="drag-queen-hometown">Hometown</label>
            <input
              type="text"
              class="form-control"
              id="drag-queen-hometown"
              name="hometown"
              value="<%= drag_queen.hometown %>"
              required
            >
          </div>
          <div class="mb-3">
            <label for="drag-queen-placement">Placement</label>
            <input
              type="text"
              class="form-control"
              id="drag-queen-placement"
              name="placement"
              value="<%= drag_queen.placement %>"
              required
            >
          </div>
          <div class="mb-3">
            <label for="drag-queen-season-id">Season</label>
            <select class="form-control" id="drag-queen-season-id" name="season_id">
              <% seasons.forEach(season => { %>
                <option value="<%= season.id %>" selected=[]>
                  <%= season.name %> - <%= season.year %>
                </option>
              <% }); %>
            </select>
          </div>
          <div class="d-grid mb-3">
            <button
              type="submit" class="btn btn-danger">Update <%= drag_queen.name %></button>
          </div>
        </form>
        <form
          action="/drag-queens/<%= drag_queen.id %>/delete"\
          method="POST"
          class="container"
        >
          <div class="d-grid mb-4">
            <button type="submit" class="btn btn-outline-danger">
              Delete <%= drag_queen.name %>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
~~~

![Drag Queen Edit Page](/assets/img/webdevfun/drag/drag-queen-edit.png){:lead loading="lazy"}
</div>
</details>

To see the full code on Github, visit [this commit](https://github.com/stevendnoble/my-drag-stage/commit/01c317cfd1e5cfd5c93594ca146cdf301bb9260e#diff-a4c65ede64197e1a112899a68bf994485b889c4b143198bac4af53425b38406f). You can pull down the code and run it locally using:

~~~bash
npx knex migrate:latest --knexfile "./knexfile.js"
npx knex seed:run --knexfile "./knexfile.js"
npm start
~~~

## Curtain Call

With the power of Bootstrap, Node.js, and SQLite3, you've now got the tools to manage your drag queen database with CRUD operations. From the grand entrance of adding new performers to the database, showcasing the ensemble, updating details to keep the show fresh, and finally, to the poignant goodbyes, your CRUD operations ensure that the digital stage reflects the ever-evolving world of drag. Shine on, queens, and may your digital presence be as compelling as your performances.
