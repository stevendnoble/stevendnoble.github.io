---
layout: post
title: "Ensuring Flawless Performances: Unit Testing Your Drag Queen Database"
description: >
  Dive into the essentials of testing database interactions in Node.js applications with
  our comprehensive guide. We unravel the complexities of ensuring your database
  functions perform flawlessly, without ever touching a real database during tests. By
  leveraging jest for our testing framework and mock-knex for simulating knex queries,
  we illustrate how to create robust tests for common database operations such as
  inserts, updates, deletes, and queries. This guide is perfect for developers seeking
  to enhance the reliability of their data access layer, ensuring that every function
  behaves as expected in varied scenarios. From setting up your testing environment to
  writing and running tests that cover a wide range of database interactions, we've got
  you covered.
image: /assets/img/webdevfun/ensuring-flawless-performances-unit-testing-your-drag-queen-database.jpg
tags: ['Node.js', 'Express Router', 'Bootstrap Navbar', 'CRUD', 'Knex', 'Nodemon', 'Drag Queens']
author: stevendnoble
related_posts:
  - webdevfun/_posts/2022-10-10-building-brickbybrick-advocacy-foundations-and-empowerment.md
  - webdevfun/_posts/2022-09-12-glam-up-your-drag-queen-database-app-refactoring-for-elegance-and-efficiency.md
sitemap: false
hide_description: true
---

* this unordered seed list will be replaced by the toc
{:toc}

In the dazzling world of drag, precision, and perfection reign supreme, from the stitch of a gown to the shade of a lipstick. Similarly, in the world of web development, ensuring your application performs flawlessly under every spotlight requires a meticulous approach to testing. This blog post will guide you through the process of adding unit tests to your drag queen database app, ensuring every feature sashays exactly as expected, without a single misstep.

## The Importance of Unit Testing

Unit testing involves isolating and testing individual parts of your application, such as functions or components, to verify that they work correctly in isolation. For a drag app, this could mean testing database interactions, API endpoints, or utility functions. The goal is to catch and fix bugs early in the development process, improving code quality and reducing future maintenance headaches.

## Choosing a Testing Framework

For Node.js applications, two popular choices for writing unit tests are *Jest* and *Mocha*. Both offer a rich set of features for testing asynchronous code, mocking dependencies, and organizing test suites. For our drag app, we'll use [Jest](https://jestjs.io/docs/getting-started) for its simplicity and built-in assertion library. To get started, install Jest:

~~~bash
npm install --save-dev jest
~~~

Then, add a test script to your package.json:

~~~json
"scripts": {
  "test": "jest"
}
~~~

Next, let's initialize Jest to set up some configuration options, and install [Babel](https://babeljs.io/) to ensure that our app works with older browsers.

~~~bash
npm init jest@latest
npm install --save-dev babel-jest @babel/core @babel/preset-env
~~~

Then create a file `.babelrc.json` with the configuration in it:

~~~json
{
  "presets": ["@babel/preset-env"]
}
~~~

## Writing Your First Test

Let's start with something simple, like testing a utility function that calculates the age of a queen based on her birthdate. Assume we have a function calculateAge(birthdate) in a file named utils.js.

First, create a test file named `serverUtils.test.js`. For our app, we will keep the test files in the same directory as the corresponding source files. This simplifies imports in the test files, especially for relative paths. It also makes refactoring easier since moving a source file means moving its test file alongside it. Here's how you might write a test for `filterObject`:

~~~js
// file: "serverUtils.test.js"
const { filterObject } = require('./serverUtils');
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

describe('filterObject', () => {
  test('should filter an object for allowed keys (seasons)', () => {
    const originalObject = { name: 'Season 1', year: 2009, location: 'The Moon' };
    const category = 'seasons';
    const expectedResult = { name: 'Season 1', year: 2009 };

    expect(filterObject(originalObject, allowedKeys[category])).toEqual(expectedResult);
  });

  test('should filter an object for allowed keys (drag_queens)', () => {
    const originalObject = { name: 'Queen A', age_during_season: 25, hometown: 'Hometown', placement: '1st', season_id: 1, extra: 'data' };
    const category = 'drag_queens';
    const expectedResult = { name: 'Queen A', age_during_season: 25, hometown: 'Hometown', placement: '1st', season_id: 1 };

    expect(filterObject(originalObject, allowedKeys[category])).toEqual(expectedResult);
  });

  test('should return an empty object if no keys are allowed', () => {
    const originalObject = { extra1: 'data1', extra2: 'data2' };
    const category = 'seasons'; // Assuming 'extra1' and 'extra2' are not allowed keys for seasons

    expect(filterObject(originalObject, allowedKeys[category])).toEqual({});
  });

  test('should return an empty object if original object is empty', () => {
    const originalObject = {};
    const category = 'drag_queens';

    expect(filterObject(originalObject, allowedKeys[category])).toEqual({});
  });
});
~~~

We won't actually need to test this function since it is not exported. Instead, we will incorporate this into tests for the functions that call `filterObject`.

## Testing Database Operations

Testing `serverUtils.js` requires mocking the `knex` library to avoid actual database operations during tests. This ensures tests run quickly and do not modify your database. We'll use Jest for testing and mocking.

### Step 1: Set Up Jest and Install Dependencies

Install `mock-knex` for mocking Knex queries:

~~~bash
npm install --save-dev mock-knex
~~~

### Step 2: Configure `mock-knex` in Your Test

In your test file, you'll need to require mock-knex and attach it to your Knex instance. Then, you can use mock-knex to mock the responses for your Knex queries.

Here's an example of how you might set up a test for a function that queries your database using Knex. Let's test the `getAllObjects` function in the `serverUtils.js` file.

~~~js
// file: "serverUtils.test.js"
const knexConfig = require("../knexfile.js");
const knex = require("knex")(knexConfig[process.env.NODE_ENV]);
const mockKnex = require("mock-knex");
const db = knex(knexConfig);
const serverUtils = require("./serverUtils");
const tracker = mockKnex.getTracker();

describe("serverUtils", () => {
  beforeEach(() => {
    mockKnex.mock(db);
    tracker.install();
  });

  afterEach(() => {
    tracker.uninstall();
    mockKnex.unmock(db);
  });

  describe("getAllObjects", () => {
    it("successfully retrieves all objects from the table", async () => {
      const mockData = [{ id: 1, name: "Test Object" }];

      tracker.on("query", (query, step) => {
        expect(query.method).toEqual("select");
        query.response(mockData);
      });

      const result = await serverUtils.getAllObjects("seasons", "name");

      expect(result).toEqual(mockData);
    });
  });
});
~~~

Now run your test with `npm test`.

#### Explanation

* **Setting up `mock-knex`:** Before each test, `mock-knex`'s tracker is installed, which allows you to intercept and mock any query made using the Knex instance. After each test, the tracker is uninstalled to ensure a clean slate for the next test.
* **Mocking queries:** The `tracker.on('query')` method is used to intercept database queries. You can assert on the properties of the query (like the SQL method) and then specify the mock response that should be returned by calling `query.response()`.
* **Testing your function:** After setting up the mock, you call your function as you normally would. Instead of hitting the database, it will receive the mocked response, allowing you to assert on the function's output based on the mocked data.

### Step 3: Adjust Your Application Code for Testing

Ensure your application code can accept a Knex instance for testing purposes. One approach is to pass the Knex instance into your functions or modules that require database access, allowing you to substitute the real instance with a mocked one during tests.

<details>
<summary>Click here to see the full code for `serverUtils.test.js`</summary>
<div markdown="1">

~~~js
const knexConfig = require("../knexfile.js");
const knex = require("knex")(knexConfig[process.env.NODE_ENV]);
const mockKnex = require("mock-knex");
const db = knex(knexConfig);
const serverUtils = require("./serverUtils");
const tracker = mockKnex.getTracker();

describe("serverUtils", () => {
  beforeEach(() => {
    mockKnex.mock(db);
    tracker.install();
  });

  afterEach(() => {
    tracker.uninstall();
    mockKnex.unmock(db);
  });

  describe("getAllObjects", () => {
    it("successfully retrieves all objects from the table", async () => {
      const mockData = [{ id: 1, name: "Test Object" }];

      tracker.on("query", (query, step) => {
        expect(query.method).toEqual("select");
        query.response(mockData);
      });

      const result = await serverUtils.getAllObjects("seasons", "name");

      expect(result).toEqual(mockData);
    });
  });

  describe("getAllSeasonsWithCounts", () => {
    it("successfully retrieves seasons with counts using a valid orderBy parameter", async () => {
      tracker.on("query", (query) => {
        query.response([]);
      });

      await expect(
        serverUtils.getAllSeasonsWithCounts("name"),
      ).resolves.not.toThrow();
    });

    test("throws an error with an invalid orderBy parameter", async () => {
      await expect(
        serverUtils.getAllSeasonsWithCounts("invalid_column"),
      ).rejects.toThrow("Invalid order parameter");
    });

    it("successfully retrieves seasons with drag queen counts", async () => {
      const mockData = [
        { id: 1, name: "Season 1", year: 2009, drag_queen_count: 10 },
        { id: 2, name: "Season 2", year: 2010, drag_queen_count: 12 },
      ];

      tracker.on("query", (query) => {
        expect(query.method).toEqual("select");
        query.response(mockData);
      });

      const result = await serverUtils.getAllSeasonsWithCounts("id");

      expect(result).toEqual(mockData);
    });
  });

  describe("getAllDragQueensWithSeasons", () => {
    it("successfully retrieves seasons with counts using a valid orderBy parameter", async () => {
      tracker.on("query", (query) => {
        query.response([]);
      });

      await expect(
        serverUtils.getAllDragQueensWithSeasons("age_during_season"),
      ).resolves.not.toThrow();
    });

    test("throws an error with an invalid orderBy parameter", async () => {
      await expect(
        serverUtils.getAllDragQueensWithSeasons("invalid_column"),
      ).rejects.toThrow("Invalid order parameter");
    });

    it("successfully retrieves drag queens with season data", async () => {
      const mockData = [
        {
          drag_queen_id: 1,
          drag_queen_name: "Season 1",
          season_name: "Season 1",
          age_during_season: 25,
          hometown: "Los Angeles",
          placement: 1,
        },
        {
          drag_queen_id: 2,
          drag_queen_name: "Season 2",
          season_name: "Season 2",
          age_during_season: 26,
          hometown: "Los Angeles",
          placement: 1,
        },
      ];

      tracker.on("query", (query) => {
        expect(query.method).toEqual("select");
        query.response(mockData);
      });

      const result = await serverUtils.getAllDragQueensWithSeasons("id");

      expect(result).toEqual(mockData);
    });
  });

  describe("addNewObject", () => {
    it("successfully inserts a new object with filtered params", async () => {
      const table = "drag_queens";
      const requestParams = {
        age_during_season: 25,
        name: "Test",
        unauthorizedParam: "ignore this",
      };
      const filteredParams = { age_during_season: 25, name: "Test" };
      const mockResponse = [1];

      tracker.on("query", (query, step) => {
        expect(query.method).toEqual("insert");
        expect(query.bindings).toEqual(Object.values(filteredParams));
        expect(query.sql).toContain(table);
        query.response(mockResponse);
      });

      const result = await serverUtils.addNewObject(table, requestParams);

      expect(result).toEqual(mockResponse);
    });
  });

  describe("getObjectById", () => {
    test("retrieves object by id", async () => {
      tracker.on("query", (query) => {
        expect(query.method).toBe("select");
        query.response([{ id: 1, name: "Test Object" }]); // Adjust based on expected result
      });

      const result = await serverUtils.getObjectById("your_table", 1);
      expect(result).toEqual([{ id: 1, name: "Test Object" }]);
    });
  });

  describe("updateObject", () => {
    test("updates object with filtered params", async () => {
      tracker.on("query", (query) => {
        expect(query.method).toBe("update");
        query.response(1); // Simulate updating one record
      });

      const request = {
        params: { id: 1 },
        body: { name: "Updated Name", unauthorizedParam: "ignored" },
      };
      const result = await serverUtils.updateObject("seasons", request);
      expect(result).toBe(1); // Assuming knex update response is the count of updated records
    });
  });

  describe("deleteObject", () => {
    test("deletes object by id", async () => {
      tracker.on("query", (query) => {
        expect(query.method).toBe("del");
        query.response(1); // Simulate deleting one record
      });

      const result = await serverUtils.deleteObject("your_table", 1);
      expect(result).toBe(1); // Assuming knex delete response is the count of deleted records
    });
  });
});
~~~
</div>
</details>

## Conclusion

Adding unit tests to your drag app is like having a backstage crew ensuring every performance goes smoothly. By covering your utility functions, database operations, and API endpoints with tests, you can develop with confidence, knowing that each part of your app works as expected. Remember, in the spotlight of production, there's no room for error, and with a comprehensive suite of unit tests, your app will always be ready for its standing ovation.