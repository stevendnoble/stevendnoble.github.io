---
layout: post
title: 'Building "BrickByBrick Advocacy": Foundations and Empowerment'
description: >
  In the inaugural post of our series on developing "BrickByBrick Advocacy," we embark
  on a journey to construct a Rails application dedicated to amplifying LGBTQ+ voices
  and facilitating activism. This post lays the groundwork by setting up the Rails
  environment and integrating Devise for user authentication, enabling users to sign up,
  log in, and manage their profiles with additional personalization options like name
  and bio. With a nod to the Stonewall Riots, the app's foundation is built on the
  principles of resilience, unity, and the power of collective action, symbolizing the
  ongoing struggle for rights and recognition within the LGBTQ+ community.
image: /assets/img/webdevfun/building-brickbybrick-advocacy-foundations-and-empowerment.jpg
tags: ['Ruby on Rails', 'LGBTQ+ Advocacy', 'Devise', 'User Authentication', 'Stonewall Riots', 'Activism Platform']
author: stevendnoble
related_posts:
  - webdevfun/_posts/2022-09-12-glam-up-your-drag-queen-database-app-refactoring-for-elegance-and-efficiency.md
  - webdevfun/_posts/2022-08-29-spotlight-on-crud-managing-your-drag-queen-database-with-elegance.md
sitemap: false
hide_description: true
---

* this unordered seed list will be replaced by the toc
{:toc}

Welcome to the inaugural post in our series detailing the journey of building **BrickByBrick Advocacy**, a Rails app dedicated to amplifying voices and fostering activism within the LGBTQ+ community. Inspired by the resilience and unity demonstrated during the Stonewall Riots, our app aims to be a digital monument to the courage of those who stood up for their rights, laying down the bricks of the movement we continue to build upon today.

## The Spirit of Stonewall: Our Guiding Light

The Stonewall Riots of 1969 marked a seminal moment in LGBTQ+ history, a time when individuals fought back against oppression, sparking a global movement. **BrickByBrick Advocacy** embodies this spirit of defiance and solidarity, providing a platform for engagement and action against anti-LGBTQ+ legislation.

## Laying the Foundation: Rails Setup and User Engagement

Our journey begins with setting up our Rails environment, ensuring we have the necessary tools to construct a robust and scalable application. With Ruby on Rails, we're not just coding; we're crafting the digital bricks that will build our platform of advocacy.

### Step 1: Setting Up Rails

Ensure you have [Ruby]()https://www.ruby-lang.org/en/documentation/installation/ and [Rails](https://guides.rubyonrails.org/getting_started.html) installed on your system. We recommend Rails 6.1 or newer and Ruby 2.7 or newer for this project.

~~~bash
ruby --version
rails --version
~~~

Make sure you have a Ruby version greater than 2.7.0 and a Rails version greater than 7.1.0. If not, find the appropriate installer using the links above.

Create your new Rails project with:

~~~bash
rails new brickbybrick_advocacy --database=postgresql
~~~

We choose PostgreSQL for its reliability and scalability, essential features for an app that aims to support a growing community of activists. When Rails is finished installing, it tries to run `bundle install`. If there errors with PostgreSQL, you may need to install it in a different way:

~~~bash
brew install postgresql
~~~

Postgres is a full database hosted locally on a server. You can turn it on and off and check the status of it with the following commands:

~~~bash
brew services list              # check the status of your services
brew services start postgresql  # start Postgres server
brew services stop postgresql   # stop Postgres server
~~~

Brew may rename your postgres server to `postgresql@14` or another version.

Once you get Postgres installed, try to run `bundle install` and see if you get a successful install. After setting up your project, initiate your database with:

~~~bash
rails db:create
rails db:migrate
~~~

### Step 2: User Authentication and Profiles with Devise

As we delve deeper into the construction of **BrickByBrick Advocacy**, we recognize the importance of creating a secure and welcoming environment for our users. User authentication is not merely a technical requirement; it's the gateway through which our community members will join forces, share their stories, and mobilize for action. In this spirit, we've chosen Devise, a versatile and widely-used authentication solution for Rails, to empower our users with the ability to sign up, log in, and manage their profiles. Here’s how we integrate Devise to lay the foundational bricks of our community.

#### Integrating Devise

Devise offers a comprehensive suite of authentication features, making it an ideal choice for **BrickByBrick Advocacy**. To get started, add Devise to your Gemfile:

~~~ruby
gem 'devise'
~~~

Run `bundle install` to install the gem. Next, install Devise in your Rails app:

~~~bash
rails generate devise:install
~~~

This command generates the necessary configuration files. Follow the post-installation instructions provided in the terminal—such as setting up the default URL options in the development environment found in config/environments/development.rb:

<details>
<summary>Click here to see the post installation instructions and examples</summary>
<div markdown="1">

~~~
===============================================================================

Depending on your application's configuration some manual setup may be required:

  1. Ensure you have defined default url options in your environments files. Here
     is an example of default_url_options appropriate for a development environment
     in config/environments/development.rb:

       config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }

     In production, :host should be set to the actual host of your application.

     * Required for all applications. *

  2. Ensure you have defined root_url to *something* in your config/routes.rb.
     For example:

       root to: "home#index"

     * Not required for API-only Applications *

  3. Ensure you have flash messages in app/views/layouts/application.html.erb.
     For example:

       <p class="notice"><%= notice %></p>
       <p class="alert"><%= alert %></p>

     * Not required for API-only Applications *

  4. You can copy Devise views (for customization) to your app by running:

       rails g devise:views

     * Not required *

===============================================================================
~~~

~~~rb
file: "in config/environments/development.rb"
config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }
~~~

~~~rb
# file: "config/routes.rb"
Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  root "home#index"
end
~~~

~~~html
<!-- file: "/app/views/layouts/application.html.erb" -->
<!DOCTYPE html>
<html>
  <head>
    <title>BrickbybrickAdvocacy</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <%= csrf_meta_tags %>
    <%= csp_meta_tag %>

    <%= stylesheet_link_tag "application", "data-turbo-track": "reload" %>
  </head>

  <body>
    <p class="notice"><%= notice %></p>
    <p class="alert"><%= alert %></p>
    <%= yield %>
  </body>
</html>
~~~
</div>
</details>

#### Generating User Model

With Devise installed, the next step is to create our `User` model. Devise will handle the heavy lifting for user authentication, but we’ll personalize this model to meet our app's unique needs:

~~~bash
rails generate devise User  # can also use "rails g devise User"
~~~

This command creates a migration file for the users table, a User model (`app/models/user.rb`) ready to be customized, and the routes necessary for authentication. Run `rails db:migrate` to apply the migration to your database.

#### Customizing User Profiles

To truly reflect the diverse community we serve, we extend the User model beyond basic authentication. Let's add additional fields to our users table to capture more about our activists:

~~~bash
rails generate migration AddDetailsToUsers name:string bio:text
~~~

This migration adds a name and a bio to our users, allowing them to share a bit of their story and connect on a more personal level. After running `rails db:migrate`, update your Devise views to include these new fields. If you haven’t already, you can generate the views with:

~~~bash
rails generate devise:views
~~~

Customize the `app/views/devise/registrations/new.html.erb` and `app/views/devise/registrations/edit.html.erb` files to include fields for the name and bio, ensuring that every brick in our foundation carries the unique mark of its layer.

<details>
<summary>Click here to see the how to do this</summary>
<div markdown="1">

For the new.html.erb (sign up) and edit.html.erb (account edit) forms, add the following lines inside the `<form>` tags where the other input fields are:

~~~erb
<div class="field">
  <%= f.label :name %><br />
  <%= f.text_field :name, autofocus: true, autocomplete: "name" %>
</div>

<div class="field">
  <%= f.label :bio %><br />
  <%= f.text_area :bio, autocomplete: "bio" %>
</div>
~~~

Devise doesn't automatically know about the new attributes you've added to your User model, so you'll need to explicitly permit them through the `application_controller.rb`. You do this by adding a before_action to configure the permitted parameters for account sign up and account update actions.

~~~rb
# file: "app/controllers/application_controller.rb"
class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :bio])
    devise_parameter_sanitizer.permit(:account_update, keys: [:name, :bio])
  end
end
~~~

This code snippet tells Devise to allow the name and bio fields during the sign-up and account update processes.
</div>
</details>

#### Securing Our Foundation

Security is paramount, especially in an app that deals with sensitive topics and activism. Devise offers several modules to enhance security, such as "lockable" for locking an account after a certain number of failed login attempts, and "timeoutable" to automatically sign out users after a period of inactivity. Incorporate these modules as needed to protect your users and their data.

#### Reflecting on Our Progress

With Devise integrated and customized for **BrickByBrick Advocacy**, we’ve laid down the essential bricks of our community’s foundation. Our users can now sign up, log in, and personalize their profiles, taking the first step towards active participation in our collective advocacy efforts.

As we build upon this foundation, we remember the struggles and triumphs of those who came before us, from the Stonewall Riots to the ongoing fight for equality. Like the activists of the past, we recognize the strength in our unity and the power of our voices, amplified brick by brick through **BrickByBrick Advocacy**.

### Step 3: Paying Homage to History

As we lay down the technical foundations, let's not forget the historical underpinnings of our cause. Each feature we build and every line of code we write carries the legacy of the Stonewall activists and every brave soul who has fought for LGBTQ+ rights. In our app's design, we incorporate nods to Stonewall's symbolism — be it in the color schemes, the app's logo, or through dedicated sections that educate users about LGBTQ+ history and rights.

## Moving Forward: Our Next Steps

With the groundwork laid for **BrickByBrick Advocacy**, our next steps involve deepening user engagement through legislator databases, issue tracking, and creating actionable steps for advocacy. These features will empower our users to speak out, reach out, and stand out in the ongoing fight for equality and justice.

In subsequent posts, we'll explore these features in detail, always mindful of the historical context that gives our work meaning. **BrickByBrick Advocacy** is more than an app; it's a testament to the power of collective action and the enduring spirit of the LGBTQ+ rights movement.

Stay tuned as we continue to build this platform, brick by brick, towards a future where every voice is heard, and every action counts. Together, we honor the legacy of Stonewall and move forward with determination and hope.