---
layout: post
title: HTML, CSS, and JavaScript
description: >
  This post takes readers on a light-hearted and informative journey through the
  fundamental technologies that power the internet, html, css, and javascript.
image: /assets/img/webdevfun/html-css-and-javascript.jpg
tags: ['Web Development Basics', 'HTML Introduction', 'CSS Styling', 'JavaScript Functionality', 'Building Websites']
author: stevendnoble
related_posts:
  - webdevfun/_posts/2022-01-17-responsive-web-design.md
  - webdevfun/_posts/2022-01-31-media-queries-and-responsive-design.md
sitemap: true
hide_description: true
---

* this unordered seed list will be replaced by the toc
{:toc}

## HTML, CSS, and JavaScript: The Trio That Powers the Web

Welcome to the whimsical world of web development, where HTML, CSS, and JavaScript form the unbeatable trio that powers the internet. Imagine if the web were a pizza—HTML would be the dough, CSS the tantalizing toppings, and JavaScript the oven that brings it all to life. Let's dive into the delicious details of these technologies, served with a side of humor and memes, because why not?

## HTML: The Dough of the Web

HTML, or HyperText Markup Language, is the backbone of the web—kind of like the dough of our internet pizza. It's where we start our recipe for creating websites. Using tags, HTML structures the content on the web, making sure that our text, images, and videos are properly arranged. Think of it as playing with digital LEGOs, but instead of a cool spaceship, you're building a website. And yes, forgetting a closing tag is like stepping on a LEGO in the dark.


## CSS: Making It Pretty

CSS, or Cascading Style Sheets, is what makes our internet pizza look irresistible. It’s the designer of the web, handling everything from the layout to the color of your fonts. Want to make your website wear a pink polka dot dress? CSS has got you covered. It's like the fairy godmother of web design, turning the pumpkin (HTML) into a carriage (a beautiful website). Remember, though, with great power comes great responsibility—and occasionally, a layout that looks more like abstract art than a webpage.

## JavaScript: The Magic Oven

JavaScript is the wizardry behind the curtain, the oven that bakes our internet pizza to perfection. It turns static pages into interactive experiences, like turning a photo album into a magic book that shows new pictures every time you wave your hand over it. Want to make a form that talks back or a button that plays "Never Gonna Give You Up" by Rick Astley? JavaScript is your go-to. Just be careful not to turn your website into a Pandora’s box of pop-ups—nobody likes those.

## The Power Trio in Action

When HTML, CSS, and JavaScript come together, they create something magical, like a band where each member brings their unique talent. HTML sets the stage, CSS makes it look fabulous, and JavaScript turns up the volume to 11. Together, they create websites that are not only functional but also engaging, proving that when it comes to the web, the whole is indeed greater than the sum of its parts.

### Create a basic page using HTML

Here's a simple HTML snippet to create a basic page featuring our favorite dish—pizza.

~~~html
<!-- file: "index.html" -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>The Pizza Chronicles</title>
</head>
<body>
  <header>
    <h1>Welcome to The Pizza Chronicles</h1>
  </header>
  <main>
    <section>
      <h2>Why Pizza Is The Ultimate Food</h2>
      <p>
        Pizza is not just a meal; it's a lifestyle. Whether it's the thin crust with its audible crunch or the deep dish that feels like a warm hug, pizza encompasses a variety of textures and flavors that cater to every palate. Its versatility is unmatched, making it the ultimate crowd-pleaser at any gathering.
      </p>
      <p>
        The beauty of pizza lies in its simplicity. A basic dough topped with tomato sauce and cheese transforms into a canvas for creativity. From the classic Margherita to the adventurous pineapple topping, each pizza is a reflection of culinary artistry and personal taste. It's the food equivalent of a chameleon, constantly adapting and evolving with every slice.
      </p>
    </section>
    <section>
      <h2>The Art of Pizza Making</h2>
      <p>
        Making pizza is an art form that has been perfected over centuries. It begins with the dough, the foundation that requires just the right amount of kneading to achieve its iconic texture. The sauce, rich and tomatoey, is spread generously before sprinkling the cheese, which melts into a pool of gooey goodness.
      </p>
      <p>
        But the real magic happens in the oven, where high heat works its wonders, baking the pizza to perfection. The result? A symphony of flavors that dances on your taste buds, making each bite better than the last. Pizza isn't just food; it's a culinary masterpiece that brings people together, one slice at a time.
      </p>
    </section>
    <section id="pizzaToppingSection">
      <h2>Need a Topping Suggestion?</h2>
      <button id="toppingButton">Suggest a Topping</button>
      <p id="toppingSuggestion"></p>
    </section>
  </main>
  <footer>
    <p>Created with love by The Pizza Chronicles Team</p>
  </footer>
</body>
</html>
~~~

This HTML page introduces "The Pizza Chronicles" and includes a couple of paragraphs that share the enthusiasm for pizza, its universal appeal, and the artistry behind its creation. Feel free to customize this template further to add images, links, or additional sections to expand on your pizza saga!

### Add some styling to the page with CSS

Let's add some style to our pizza-themed HTML page with this snazzy CSS. Create a new file named styles.css and link it to your HTML by adding `<link rel="stylesheet" href="styles.css">` inside the <head> tag of your HTML file. Here's a CSS snippet to get you started:

~~~css
/* file: "styles.css" */
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  background-color: wheat;
}

header {
  background-color: tomato;
  color: #fff;
  padding: 20px 0;
  text-align: center;
}

main {
  padding: 20px;
  max-width: 800px;
  margin: auto;
}

section {
  margin-bottom: 40px;
}

h1, h2 {
  font-family: 'Georgia', serif;
}

h1 {
  margin-bottom: 0;
}

h2 {
  color: tomato;
}

p {
  line-height: 1.6;
}

footer {
  background-color: tomato;
  text-align: center;
  padding: 10px 0;
  position: fixed;
  bottom: 0;
  width: 100%;
}
~~~

This CSS file adds a warm, pizza-inspired color scheme to your page, with a cozy background, stylish headers, and a footer that sticks to the bottom of the window. It also ensures the text is readable and pleasant to the eye, enhancing the overall user experience. Feel free to tweak the colors, fonts, and spacing to match your personal style or to fit the pizza theme even more closely!

### Add some functionality with JavaScript

Let's add a fun JavaScript snippet to your page that randomly suggests pizza toppings each time a button is clicked, making the page more interactive and engaging. You'll need to add a button to your HTML and a place to display the suggested topping. Then, include the JavaScript to make it work.

~~~js
// file: "script.js"
// Add this script before the closing </body> tag in your HTML file
function getRandomTopping() {
  const toppings = [
    'Pepperoni',
    'Mushrooms',
    'Onions',
    'Sausage',
    'Bacon',
    'Extra cheese',
    'Black olives',
    'Green peppers',
    'Pineapple',
    'Spinach'
  ];

  const randomTopping = toppings[Math.floor(Math.random() * toppings.length)];
  document.getElementById('toppingSuggestion').innerText = `How about some ${randomTopping}?`;
}

document.getElementById('toppingButton').addEventListener('click', getRandomTopping);
~~~

This JavaScript code listens for clicks on the "Suggest a Topping" button. When clicked, it randomly selects a pizza topping from the toppings array and displays the suggestion in the <p> element with the ID of toppingSuggestion.

Similar to adding the styles.css file to the <head> as described earlier, you will need to link the javascript in your HTML: `<script src="script.js"></script>`. This should be at the end of the file, just before the </body> tag.

### Load them all together

Save all three files in the same directory, and you should be able to open it in your browser. If you are seeing any errors, your HTML file should look like this:

![Pizza Website](/assets/img/webdevfun/pizza/pizza.png){:lead loading="lazy"}

[See it live!](/webdevfun/pizza/basics/)
{:.figcaption}

<details>
<summary>Click here to view the hidden html</summary>
<div markdown="1">

~~~html
<!-- file: "index.html" -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="styles.css">
  <title>The Pizza Chronicles</title>
</head>
<body>
  <header>
    <h1>Welcome to The Pizza Chronicles</h1>
  </header>
  <main>
    <section>
      <h2>Why Pizza Is The Ultimate Food</h2>
      <p>
        Pizza is not just a meal; it's a lifestyle. Whether it's the thin crust with its audible crunch or the deep dish that feels like a warm hug, pizza encompasses a variety of textures and flavors that cater to every palate. Its versatility is unmatched, making it the ultimate crowd-pleaser at any gathering.
      </p>
      <p>
        The beauty of pizza lies in its simplicity. A basic dough topped with tomato sauce and cheese transforms into a canvas for creativity. From the classic Margherita to the adventurous pineapple topping, each pizza is a reflection of culinary artistry and personal taste. It's the food equivalent of a chameleon, constantly adapting and evolving with every slice.
      </p>
    </section>
    <section>
      <h2>The Art of Pizza Making</h2>
      <p>
        Making pizza is an art form that has been perfected over centuries. It begins with the dough, the foundation that requires just the right amount of kneading to achieve its iconic texture. The sauce, rich and tomatoey, is spread generously before sprinkling the cheese, which melts into a pool of gooey goodness.
      </p>
      <p>
        But the real magic happens in the oven, where high heat works its wonders, baking the pizza to perfection. The result? A symphony of flavors that dances on your taste buds, making each bite better than the last. Pizza isn't just food; it's a culinary masterpiece that brings people together, one slice at a time.
      </p>
    </section>
    <section id="pizzaToppingSection">
      <h2>Need a Topping Suggestion?</h2>
      <button id="toppingButton">Suggest a Topping</button>
      <p id="toppingSuggestion"></p>
    </section>
  </main>
  <footer>
    <p>Created with love by The Pizza Chronicles Team</p>
  </footer>
  <script src="script.js"></script>
</body>
</html>
~~~
</div>
</details>

## Wrapping Up with a Bow (and a Laugh)

Understanding HTML, CSS, and JavaScript is like getting the keys to the digital kingdom. They are the foundational pillars that make learning web development not just essential but also incredibly fun. Dive into these technologies with a spirit of adventure (and maybe a meme generator), and you'll find that creating on the web is as enjoyable as it is rewarding. After all, in the world of web development, the only limit is your imagination (and, occasionally, your internet speed).

So there you have it, folks—the secret sauce behind the internet pizza, explained with a dash of humor and a pinch of memes. Whether you're just starting out or looking to spice up your web development skills, remember: the journey is as enjoyable as the destination, especially when you're in the company of HTML, CSS, and JavaScript.