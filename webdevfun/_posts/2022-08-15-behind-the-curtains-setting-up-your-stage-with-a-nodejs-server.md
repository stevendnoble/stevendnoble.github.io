---
layout: post
title: "Behind the Curtains: Setting Up Your Stage with a Node.js Server"
description: >
  Step into the spotlight with Node.js, Express, and SQLite3 as your backstage tech crew, ensuring your digital
  drag performance is as flawless as your on-stage presence. This guide takes you through the steps of
  integrating SQLite3, a lightweight and efficient SQL database, with a Node.js server, creating a solid
  foundation for your web projects. From installing SQLite3 and setting up your first database to crafting
  dynamic routes with Express for data retrieval, you'll learn how to manage show schedules, performances, and
  fan interactions with ease. Perfect for drag artists and performers looking to establish an online presence
  without the overhead of more complex database systems, this tutorial is your ticket to a standing ovation in
  the digital realm.
image: /assets/img/webdevfun/behind-the-curtains-setting-up-your-stage-with-a-nodejs-server.jpg
tags: ['Node.js', 'Express', 'SQLite3', 'Tutorial', 'Database Management', 'Drag Queens']
author: stevendnoble
related_posts:
  - webdevfun/_posts/2022-08-29-spotlight-on-crud-managing-your-drag-queen-database-with-elegance.md
  - webdevfun/_posts/2022-08-01-crafting-a-react-pokedex-with-zustand-a-simpler-state-management-saga.md
sitemap: false
hide_description: true
---

* this unordered seed list will be replaced by the toc
{:toc}

Welcome to the digital dressing room where the glitter of drag meets the power of technology. Today, we're pulling back the curtain to reveal how to set up a Node.js server, a backstage essential for any queen aiming to sparkle online. Node.js, with its quick, non-blocking nature, lays the foundation for a website as dynamic and captivating as a drag performance. Let's strut through the process, darling, and ensure your online presence is as fabulous as you are.

## Setting the Stage: Installing Node.js

First, we need the right tools in our makeup kit. Installing Node.js is akin to selecting the perfect palette for your look. Head over to the official Node.js website and download the version that suits your development needs. With Node.js and npm (Node Package Manager) at your fingertips, you're ready to conquer the digital stage.

## Crafting Your First Node.js Server: The Dress Rehearsal

Armed with Node.js, it's time to stitch together our first server, a foundational step in bringing your drag persona to the digital realm.

### Step 1: Creating a New Project

Open your terminal, our digital backstage, and set up your project space:

~~~bash
mkdir my-drag-stage
cd my-drag-stage
npm init -y
~~~

This command sequence crafts the base for your project, setting the default settings as if laying out your costume and makeup for the night's performance.

### Step 2: The Server Script: Bringing Your Act Online

In your project, create a server.js file. This script is where the magic happens, darling. Let's get coding:

~~~js
// file: "server.js"
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Darlings, welcome to my fabulous Node.js server!');
});

server.listen(port, hostname, () => {
  console.log(`Server strutting its stuff at http://${hostname}:${port}/`);
});
~~~

Here, you've set up a basic server ready to greet your fans with open arms and a fabulous message.

### Step 3: The Grand Reveal

It's showtime! Launch your server with:

~~~bash
node server.js
~~~

And visit http://127.0.0.1:3000/ in your web browser. If you're greeted with your welcome message, your digital stage is set, and the spotlight is all yours.

## Adding a Dash of Express: Simplifying Your Server

Every queen needs a reliable crew, and in the world of Node.js, Express.js is your most dependable backstage hand. It simplifies routing, middleware, and more, letting you focus on your performance.

### Step 1: Installing Express

Add Express to your project:

~~~bash
npm install express
~~~

### Step 2: Revamping Your Server with Express

Modify server.js to introduce Express into your act:

~~~js
// file: "server.js"
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Welcome to the main stage of my fabulous Express server!');
});

app.listen(port, () => {
  console.log(`Express server sashaying on port ${port}`);
});
~~~

With Express, setting up routes for different parts of your website becomes as easy as planning your setlist.

## Amplifying Your Performance with SQLite3

Even in the world of drag, where the spotlight is on glitter and glam, the strength of your performance relies on the behind-the-scenes support. SQLite3 acts as your dependable stage crew, handling data with the grace and reliability every star deserves.

### Step 1: Setting Up SQLite3

To begin, you'll need to add SQLite3 to your Node.js project. Open your terminal, and let's get the show on the road:

~~~bash
npm install sqlite3
~~~

This command installs the `sqlite3` package, which includes everything you need to start working with SQLite databases in Node.js.

### Step 2: Creating Your Database and Tables

With SQLite3, your database will be contained in a single file. To create a script that sets up a SQLite database with tables for drag queens from RuPaul's Drag Race Season 1 and the seasons of the show, you can use the sqlite3 library in Node.js. This script will:

* Open a connection to a SQLite database file.
* Create a table for the seasons of the show, if it doesn't already exist.
* Create a table for the drag queens, if it doesn't already exist, with references to their respective seasons.
* Insert data for Season 1 into the seasons table.
* Insert data for the drag queens from Season 1 into the drag queens table.

Create a new file named `init-db.js` in your project directory and add the following code:

~~~js
// file: "init-db.js"
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./drag_database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error('Error opening database', err);
    return;
  }
  console.log('Database opened successfully.');

  // Create the seasons table
  db.run(`CREATE TABLE IF NOT EXISTS seasons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    year INTEGER NOT NULL
  )`, (err) => {
    if (err) {
      console.log('Error creating seasons table', err);
    } else {
      console.log('Seasons table created or already exists.');

      // Insert Season 1 data
      db.run(`INSERT INTO seasons (name, year) VALUES (?, ?)`, ['Season 1', 2009], function(err) {
        if (err) {
          console.log('Error inserting season 1', err);
        } else {
          console.log(`Season 1 inserted with rowid ${this.lastID}`);
        }
      });
    }
  });

  // Create the drag queens table
  db.run(`CREATE TABLE IF NOT EXISTS drag_queens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age_during_season INTEGER NOT NULL,
    hometown TEXT NOT NULL,
    placement INTEGER NOT NULL,
    season_id INTEGER NOT NULL,
    FOREIGN KEY (season_id) REFERENCES seasons(id)
  )`, (err) => {
    if (err) {
      console.log('Error creating drag_queens table', err);
    } else {
      console.log('Drag_queens table created or already exists.');

      // Insert drag queens from Season 1
      const queens = [
        ['BeBe Zahara Benet', 28, 'Minneapolis, Minnesota', 1, 1],
        ['Nina Flowers', 34, 'Denver, Colorado', 2, 1],
        ['Rebecca Glasscock', 26, 'Fort Lauderdale, Florida', 3, 1],
        ['Shannel', 29, 'Las Vegas, Nevada', 4, 1],
        ['Ongina', 26, 'Los Angeles, California', 5, 1],
        ['Jade', 25, 'Chicago, Illinois', 6, 1],
        ['Akashia', 24, 'Cleveland, Ohio', 7, 1],
        ['Tammie Brown', 28, 'Long Beach, California', 8, 1],
        ['Victoria "Porkchop" Parker', 39, 'Raleigh, North Carolina', 9, 1]
      ];

      const insert = db.prepare(`INSERT INTO drag_queens (name, age_during_season, hometown, placement, season_id) VALUES (?, ?, ?, ?, ?)`);
      queens.forEach(queen => {
        insert.run(queen, function(err) {
          if (err) {
            console.log('Error inserting queen', err);
          } else {
            console.log(`Inserted ${queen[0]} with rowid ${this.lastID}`);
          }
        });
      });
      insert.finalize();
    }
  });
});
~~~

This script does the following:

* Opens or creates a SQLite database named `drag_database.db`.
* Creates two tables: `seasons` for storing seasons of the show, and `drag_queens` for storing information about the drag queens, linking each queen to their respective season through a foreign key.
* Inserts data for Season 1 into the `seasons` table.
* Inserts data for the drag queens from Season 1 into the `drag_queens` table.

Run this script with Node to set up your database and table:

~~~bash
node init-db.js
~~~

### Step 3: Making Database Calls

Now, let's integrate SQLite database calls into our Node.js server. Assuming you have an Express server set up, you can create routes to interact with your SQLite database.

Here's an example of a route to fetch all performances:

~~~js
// file: "server.js"
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

const db = new sqlite3.Database('./drag_database.db', (err) => {
  if (err) {
    console.error('Error opening database', err);
  } else {
    console.log('Database opened');
    // You can now create tables or perform transactions
  }
});

app.get('/', (req, res) => {
  res.send('Welcome to the main stage of my fabulous Express server!');
});

app.get('/drag_queens', (req, res) => {
  db.serialize(() => {
    db.all(`SELECT * FROM drag_queens`, [], (err, rows) => {
      if (err) {
        res.status(500).send(err.message);
        return;
      }
      res.json(rows);
    });
  });
});

app.listen(port, () => {
  console.log(`Express server sashaying on port ${port}`);
});

~~~

SQLite3 offers a straightforward, file-based database solution that's ideal for smaller projects or as an embedded database component. Its ease of use and setup makes it a perfect choice for developers looking to implement quick data storage solutions without the complexity of larger database systems. With SQLite3 in your Node.js server, managing data for your drag performances becomes as seamless as your stage presence, ensuring your digital persona captivates and delights your audience.

## Curtain Call

With Node.js as your stage, Express as your director, and SQLite as your wardrobe department, you're ready to dazzle the digital world with your unique brand of drag artistry. Each tool brings you closer to a seamless online experience, allowing you to focus on what you do best: captivating audiences with your creativity and charisma. Remember, the world is your stage, and with this setup, you're set to conquer it. Break a leg, darling!