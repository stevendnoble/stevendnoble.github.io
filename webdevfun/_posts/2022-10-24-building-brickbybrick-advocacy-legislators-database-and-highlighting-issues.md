---
layout: post
title: 'Building "BrickByBrick Advocacy": Legislators Database and Highlighting Issues'
description: >
  This blog post delves into creating an advocacy Rails application, focusing on managing and presenting
  legislative issues with an emphasis on user engagement. It guides readers through setting up a dynamic
  index page using Bootstrap for stylish and responsive filters, and it introduces practical steps for adding
  and utilizing model scopes for efficient data filtering. Additionally, the post outlines how to craft an
  edit page, enabling users to update legislation details, thus enhancing the app's functionality and user
  experience in promoting informed civic participation.
image: /assets/img/webdevfun/building-brickbybrick-advocacy-legislators-database-and-highlighting-issues.jpg
tags: ['Ruby on Rails', 'BrickByBrick Advocacy', 'LGBTQ+ Advocacy', 'Postgres', 'Models', 'Views', 'Controllers']
author: stevendnoble
related_posts:
  - webdevfun/_posts/2022-10-10-building-brickbybrick-advocacy-foundations-and-empowerment.md
  - webdevfun/_posts/2022-09-26-ensuring-flawless-performances-unit-testing-your-drag-queen-database.md
sitemap: true
hide_description: true
---

* this unordered seed list will be replaced by the toc
{:toc}

In this second installment of our series on developing **BrickByBrick Advocacy**, we delve into the heart of our app's purpose: empowering users to engage with their legislators and stay informed about crucial legislative issues affecting the LGBTQ+ community. Our focus is twofold —- first, to construct a comprehensive database of legislators, and second, to effectively highlight and categorize issues and legislation. This dual approach ensures our users are not only well-informed but also well-equipped to take meaningful action.

## Legislators Database

A core component of **BrickByBrick Advocacy** is enabling users to easily find and contact their representatives. To achieve this, we begin by setting up a `Legislators` model in our Rails app. This model includes fields for names, districts, contact information, and any other relevant details.

We utilize external APIs, such as the `ProPublica Congress API`, to populate our database with up-to-date information on federal, state, and local legislators. This involves crafting API calls within our Rails application, parsing the returned data, and storing it in our database.

### Gathering and Storing Information

We'll start by detailing the process of generating the model and table for storing legislator information, then move on to fetching data from an external API and storing it in our database.

#### Generating the Legislator Model

First, we need to create a model to store our legislators' information. This model will include fields such as name, district, party, contact information, and any other relevant attributes you wish to track. Here's how you can generate this model using Rails' command-line tools:

~~~bash
rails generate model Legislator name:string party:string government_level:string district:string phone:string email:string website:string
~~~

This command generates a migration file for creating the legislators table in your database with the specified columns. After generating the model, run the migration with the following command:

~~~bash
rails db:migrate
~~~

#### Fetching Data from an External API

To populate our legislators table with data, we'll use an external API. For this example, let's use the `ProPublica Congress API`, which provides comprehensive data about federal legislators. You'll need to sign up for an API key from ProPublica and review their documentation to understand the available endpoints and data formats.

Here's a simplified example of how you might fetch and store data about legislators using Ruby's `HTTParty` gem. Later, you might want to create a service object or rake task to handle this logic.

First, add the `httparty` gem to your Gemfile to simplify HTTP requests:

~~~rb
gem 'httparty'
~~~

Then, run `bundle install`.

Next, create a service object for fetching and processing the API data:

~~~rb
# file: "app/services/legislators_importer.rb"
require 'httparty'

class LegislatorsImporter
  PROPUBLICA_API_KEY = 'your_api_key_here'
  BASE_URL = 'https://api.propublica.org/congress/v1/members/house/CA/current.json'

  class << self
	  def import
	    response = HTTParty.get(BASE_URL, headers: { "X-API-Key" => PROPUBLICA_API_KEY })

	    if response.success?
	      legislators = response.parsed_response['results']

	      legislators.each do |legislator|
	        Legislator.find_or_create_by!(
	          name: format_name(legislator),
	          party: legislator['party'],
	          district: legislator['state'],
	          phone: legislator['phone'],
	          email: legislator['email'],
	          website: legislator['url']
	        )
	      end
	    else
	      puts "Failed to fetch legislators: #{response.code}"
	    end
	  end

	  private

	  def format_name(legislator)
	  	[
    		[
      		legislator['first_name'],
      		legislator['middle_name'],
      		legislator['last_name']
      	].compact.join(" "),
      	legislator['suffix']
      ].compact.join(", ")
	  end
	end
end
~~~

<details>
<summary>Click here to see how to hide your API key using dotenv</summary>
<div markdown="1">

### Using Dotenv to Securely Store Your API Key

When working with external APIs, such as the `ProPublica Congress API` in the development of **BrickByBrick Advocacy**, it's crucial to keep your API keys secure and out of your codebase. Exposing these keys publicly can lead to security vulnerabilities and potential misuse. One effective way to manage environment variables and API keys securely is by using the Dotenv gem.

#### Installing Dotenv

First, add the Dotenv gem to your Gemfile. It's a good practice to include it in the :development, :test group, as you might use different methods for managing environment variables in production.

~~~rb
group :development, :test do
  gem 'dotenv-rails'
end
~~~

Run `bundle install` to install the gem.

#### Setting Up Dotenv

Create a file named `.env` in the root directory of your Rails project. This file will be used to store your environment variables, including API keys. For example:

~~~makefile
PROPUBLICA_API_KEY=your_actual_api_key_here
~~~

The `.env` file should not be committed to your version control system. Add `.env` to your `.gitignore` file to prevent it from being included in your Git repository:

~~~bash
# file: ".gitignore"
.env
~~~

#### Accessing Environment Variables
With your API key stored in the `.env` file, you can access it anywhere in your Rails application using the ENV hash. For instance, modify your API call to use the stored API key:

~~~rb
# app/services/legislators_importer.rb
class LegislatorsImporter
  BASE_URL = 'https://api.propublica.org/congress/v1/members/house/CA/current.json'

  def self.import
    response = HTTParty.get(BASE_URL, headers: { "X-API-Key" => ENV['PROPUBLICA_API_KEY'] })
    # Rest of the method...
  end
end
~~~

This approach allows you to keep sensitive information like API keys out of your codebase, reducing the risk of accidental exposure and making it easier to manage different keys for development, testing, and production environments.

#### Final Thoughts

Using Dotenv is a simple and effective way to manage environment variables in Rails applications. By securely storing your API keys, you protect your application from security risks and ensure that sensitive information is kept private.
</div>
</details>

To use this service object to import legislators, you could run the following in your Rails console or include it in a rake task:

~~~rb
LegislatorsImporter.import
~~~

This service object, `LegislatorsImporter`, makes a GET request to the `ProPublica Congress API` (you'll need to adjust the BASE_URL to match the specific endpoint you're interested in). It then iterates over the returned JSON, creating or updating legislator records in the database using the extracted data.

<details>
<summary>Another approach storing more granular details about the US Congress</summary>
<div markdown="1">

~~~bash
rails generate model UsCongressperson propublica_id:string chamber:string title:string short_title:string propublica_api_uri:string first_name:string middle_name:string last_name:string suffix:string party:string twitter_account:string facebook_account:string youtube_account:string website:string contact_form:string next_election:string office:string phone:string state:string district:string at_large:boolean
rails db:migrate
~~~

~~~rb
# file: "app/services/legislators_importer.rb"
require "httparty"

class LegislatorsImporter
  PROPUBLICA_API_KEY = ENV["PROPUBLICA_API_KEY"]
  BASE_URL = "https://api.propublica.org/congress/v1"
  SENATE_URL = "/117/senate/members.json"
  HOUSE_URL = "/117/house/members.json"

  def self.import_senators
    import(SENATE_URL, "senate")
  end

  def self.import_representatives
    import(HOUSE_URL, "house")
  end

  private

  def self.import(chamber_url, chamber)
    response = HTTParty.get(
      "#{BASE_URL}#{chamber_url}",
      headers: { "X-API-Key" => PROPUBLICA_API_KEY }
    )

    if response.success?
      legislators = response.parsed_response["results"][0]["members"]
      find_or_create_us_congresspeople(legislators, chamber)
    else
      puts "Failed to fetch legislators: #{response.code}"
    end
  end

  def self.find_or_create_us_congresspeople(legislators, chamber)
    legislators.each do |legislator|
      UsCongressperson.find_or_create_by!(
        propublica_id: legislator["id"],
        chamber: chamber,
        title: legislator["title"],
        short_title: legislator["short_title"],
        propublica_api_uri: legislator["api_uri"],
        first_name: legislator["first_name"],
        middle_name: legislator["middle_name"],
        last_name: legislator["last_name"],
        suffix: legislator["suffix"],
        party: legislator["party"],
        twitter_account: legislator["twitter_account"],
        facebook_account: legislator["facebook_account"],
        youtube_account: legislator["youtube_account"],
        website: legislator["url"],
        contact_form: legislator["contact_form"],
        next_election: legislator["next_election"],
        office: legislator["office"],
        phone: legislator["phone"],
        state: legislator["state"],
        district: legislator["district"],
        at_large: legislator["at_large"]
      )
    end
  end
end
~~~

Then in the rails console (using `rails c` on the command line), you can import the Senators and Representatives using:

~~~bash
LegislatorsImporter.import_senators
LegislatorsImporter.import_representatives
~~~
</div>
</details>

#### Important Considerations

* **API Rate Limits:** Be mindful of any rate limits imposed by the API provider to avoid getting your access revoked.
* **Error Handling:** Implement comprehensive error handling to manage potential issues with network requests or data inconsistencies.
* **Data Updates:** Consider how frequently you need to update your data and plan accordingly (e.g., scheduling regular imports with a cron job or a scheduler like Sidekiq).

### Displaying Legislators Information

Using `Bootstrap`, we can take advantage of updated features and utilities to enhance the presentation of our legislators' information in the **BrickByBrick Advocacy** app. We'll also cover the necessary routes and controllers to fetch and display this data. This update ensures our application remains modern, accessible, and user-friendly.

#### Step 1: Install Bootstrap and Ensure Compatibility

First, ensure your Rails app uses Bootstrap 5.2 or later. If you're using the Bootstrap gem, check for the latest version and update your Gemfile accordingly:

~~~rb
# file: "Gemfile"
gem 'bootstrap', '~> 5.2.0'
~~~

After updating the gem, run bundle update to install the new version. Ensure your application's assets and packs import Bootstrap to have access to the latest features.
To do this, rename `app/assets/stylesheets/application.css` to `application.scss` and import Bootstrap:

~~~css
@import "bootstrap";
~~~

#### Step 2: Define Routes and Controllers

Before displaying our US Senators' data, we need to set up the appropriate routes and controllers. Let's define a route in `config/routes.rb` to handle the listing of all congresspeople as well as US Senators and US Representatives:

~~~ruby
# file: "in config/routes.rb"
resources :us_congresspeople, only: [:index] do
  collection do
    get 'house'
    get 'senate'
  end
end
~~~

This configuration does the following:

* Defines a resource `us_congresspeople` that, for now, only has an `index` action available. This is where you could list all congresspeople or provide a general overview.
* Inside the `collection` block, two custom collection routes are defined: `house` and `senate`. These are not tied to a specific congressperson's ID, making them perfect for displaying groups of congresspeople (e.g., all members of the House or Senate).
* The routes generate path helpers `house_us_congresspeople_path` and `senate_us_congresspeople_path`, which you can use in your views to link to these pages.

Next, create a controller named `UsCongresspeopleController` with an index action, a house action, and a senate action to fetch and display all senators/representatives:

~~~rb
# file: "app/controllers/us_senators_controller.rb"
class UsCongresspeopleController < ApplicationController
  def index
    @us_congresspeople = UsCongressperson.all
  end

  def senate
    @us_senators = UsCongressperson.where(chamber: "senate")
  end

  def house
    @us_representatives = UsCongressperson.where(chamber: "house")
  end
end
~~~

These controller actions set up instance variables `@us_congresspeople`, `@us_senators`, and `@us_representatives` containing the approriate records from the `us_congresspeople` table, which we'll use in our view to display the senators' information.

#### Step 3: Creating Views with Bootstrap 5.2 Tables and Icons

Now, let's create the views in `app/views/us_congresspeople/` to use Bootstrap 5.2's table styling:
* `index.html.erb` for the index action
* `house.html.erb` for the house action
* `senate.html.erb` for the senate action

Each view will be tailored to display the appropriate data, whether it's a general overview of all congresspeople or filtered lists of either House or Senate members. You can link to these pages using the path helpers generated by the routes. For example, in a navbar or menu:

~~~erb
<%= link_to 'All Congresspeople', us_congresspeople_path %>
<%= link_to 'House Members', house_us_congresspeople_path %>
<%= link_to 'Senate Members', senate_us_congresspeople_path %>
~~~

This setup provides a clean and organized way to navigate through different sections of your us_congresspeople resource, enhancing the user experience of your **BrickByBrick Advocacy** app.

First, ensure you have Bootstrap Icons available in your project. If you haven't already included them, you can add the Bootstrap Icons by including the following line in your application's layout file (app/views/layouts/application.html.erb), within the `<head>` tag:

~~~html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.8.1/font/bootstrap-icons.min.css">
~~~

Create a partial named `_congresspeople_table.html.erb` in a`app/views/us_congresspeople/`. This partial will display information in a table format, including social media links with Bootstrap icons.

~~~html
<!-- file: "app/views/us_congresspeople/_congresspeople_table.html.erb" -->
<div class="table-responsive">
  <table class="table table-striped table-hover align-middle">
    <thead>
      <tr>
        <th>Title</th>
        <th>Name</th>
        <th>Party</th>
        <th>State</th>
        <th>Contact</th>
        <th>Social Media</th>
      </tr>
    </thead>
    <tbody>
      <% congresspeople.each do |person| %>
        <tr>
          <td><%= person.title %></td>
          <td><%= person.first_name %> <%= person.last_name %></td>
          <td><%= person.party %></td>
          <td><%= person.state %></td>
          <td>
            <%= link_to 'Contact', person.contact_form, class: 'btn btn-primary', target: '_blank' if person.contact_form.present? %>
          </td>
          <td>
            <%= link_to "https://twitter.com/#{person.twitter_account}", target: "_blank", class: 'me-2' do %>
              <i class="bi bi-twitter"></i>
            <% end if person.twitter_account.present? %>
            <%= link_to "https://facebook.com/#{person.facebook_account}", target: "_blank", class: 'me-2' do %>
              <i class="bi bi-facebook"></i>
            <% end if person.facebook_account.present? %>
            <%= link_to "https://youtube.com/#{person.youtube_account}", target: "_blank", class: 'me-2' do %>
              <i class="bi bi-youtube"></i>
            <% end if person.youtube_account.present? %>
          </td>
        </tr>
      <% end %>
    </tbody>
  </table>
</div>
~~~

In each of the views (`index.html.erb`, `house.html.erb`, and `senate.html.erb`), you'll render the partial created above, passing the appropriate collection of congresspeople as a local variable.

~~~html
<!-- file: "app/views/us_congresspeople/index.html.erb" -->
<div class="container mt-5">
  <h2>All US Congresspeople</h2>
  <%= link_to 'House Members', house_us_congresspeople_path %>
  <%= link_to 'Senate Members', senate_us_congresspeople_path %>
  <%= render partial: 'congresspeople_table', locals: { congresspeople: @us_congresspeople } %>
</div>
~~~

~~~html
<!-- file: "app/views/us_congresspeople/house.html.erb" -->
<div class="container mt-5">
  <h2>House Members</h2>
  <%= link_to 'All Congresspeople', us_congresspeople_path %>
  <%= link_to 'Senate Members', senate_us_congresspeople_path %>
  <%= render partial: 'congresspeople_table', locals: { congresspeople: @us_representatives } %>
</div>
~~~

~~~html
<!-- app/views/us_congresspeople/senate.html.erb -->
<div class="container mt-5">
  <h2>Senate Members</h2>
  <%= link_to 'All Congresspeople', us_congresspeople_path %>
  <%= link_to 'House Members', house_us_congresspeople_path %>
  <%= render partial: 'congresspeople_table', locals: { congresspeople: @us_senators } %>
</div>
~~~

#### Enhancing the Pages

* **Navigation and Layout:** Consider adding a navbar and other navigational elements using Bootstrap's components to improve your app's layout and user experience.
* **Styling Buttons and Links:** Utilize Bootstrap's button styles (btn, btn-primary, etc.) to make links to social media and contact forms visually appealing and consistent with the overall design.
* **Accessibility:** Ensure your table and overall page design follow accessibility best practices, which Bootstrap 5.2's components are designed to support.

By following these steps and utilizing Bootstrap 5.2, you'll create a modern, responsive, and accessible page for displaying US Senators' information in your **BrickByBrick Advocacy** app, making it easy for users to find and interact with their representatives.

## Highlighting Issues and Legislation

The second pillar of our application focuses on issues and legislation. We introduce two new models: `Issues` and `Legislation`. These models are associated not only with each other but also with the legislator models, enabling a rich, interconnected database where users can navigate from an issue to related legislation and then to the legislators involved.

### Generating Models

First, let's generate two models: `Issue` and `Legislation`. The `Issue` model can represent broader topics or concerns, such as "LGBTQ+ Rights," while the Legislation model can represent specific legislative bills.

~~~bash
rails generate model Issue title:string description:text
rails generate model Legislation title:string description:text issue:references status:integer url:string state:string bill_number:string legiscan_bill_id:integer relevant:boolean active:boolean
~~~

After generating these models, run `rails db:migrate` to update your database schema.

The `Issue` model has `title` and `description` attributes, providing a way to categorize legislation under broader topics. The `Legislation` model includes a reference to `Issue`, allowing for an association where each piece of legislation is linked to a specific issue. It also includes `status` and `url` attributes to track the legislation's current state and provide a link to more information.

### Fetching Legislation Data

To fetch legislation related to anti-LGBT and anti-trans issues, you would typically use an external API that provides access to legislative data, such as the ProPublica Congress API or a similar governmental or civic information API. The LegiScan API seems to have more updated data.

* **Identify Relevant Legislation:** Determine keywords or bill numbers associated with anti-LGBT and anti-trans legislation. This could be done through research or by using a tagging system within the API (if available).
* **API Requests:** Make requests to the API to search for legislation using the identified keywords or bill numbers. This usually involves sending HTTP GET requests to the API's search endpoint and parsing the response.
* **Filter Results:** Depending on the API's capabilities, you might receive a broad set of results. Filter these results server-side or within your application logic to focus on the legislation relevant to your advocacy goals.
* **Store and Display Data:** Once you have fetched and filtered the legislation data, store it in your database under the appropriate issue categories. Then, display this information in your app, providing users with details about each piece of legislation and how they can take action.

#### Example: Fetching Data with Ruby

Assuming you're using an API like LegiScan, here's a simplified example of how you might fetch data using Ruby's HTTParty gem.

~~~rb
require 'httparty'

class LegislationImporter
  LEGISCAN_API_KEY = ENV["LEGISCAN_API_KEY"]
  LEGISCAN_URL = "https://api.legiscan.com/"
  ISSUES = {
    "transgender" => "legislation related to transgender rights"
  }.freeze

  def self.search(state: "", page: 1, query:)
    search_legiscan(op: "getSearch", query: query, state: state, page: page)
  end

  def self.get_bill(bill_id:)
    bill = search_legiscan(op: "getBill", id: bill_id)
  end

  def self.pull_us_transgender_bills
    page = 1
    response = search(state: "US", query: "transgender", page: page)
    result = response.delete("searchresult")
    summary = result.delete("summary")
    pages = summary["page_total"]
    while page <= pages
      result.each { |_k, data| find_or_create_legislation(data, "transgender") }
      page += 1
      response = search(state: "US", query: "transgender", page: page)
      result = response.delete("searchresult")
      summary = result.delete("summary")
    end
  end

  private

  def self.search_legiscan(params = {})
    params["key"] = LEGISCAN_API_KEY
    response = HTTParty.get(
      [LEGISCAN_URL, params.to_query].compact.join("?")
    )

    if response.success?
      response.parsed_response
    else
      puts "Failed to fetch legislation: #{response.code}"
      puts response.parsed_response
      []
    end
  rescue => e
    puts "Error fetching legislation: #{e.message}"
    []
  end

  def self.find_or_create_legislation(legislation, issue_title)
    issue = Issue.find_or_create_by!(
      title: issue_title,
      description: ISSUES[issue_title]
    )

    legislation_record = Legislation.find_or_create_by!(
      state: legislation["state"],
      bill_number: legislation["bill_number"],
      legiscan_bill_id: legislation["bill_id"],
      issue: issue
    )

    bill = get_bill(bill_id: legislation["bill_id"])["bill"]
    legislation_record.title = bill["title"]
    legislation_record.description = bill["description"]
    legislation_record.status = bill["status"]
    legislation_record.url = bill["url"]
    legislation_record.save! if legislation_record.changed?
  end
end
~~~

Then you can run `LegislationImporter.pull_us_transgender_bills` in the rails console.

#### Explanation

* **Class Structure:** The `LegislationImporter` class is created to encapsulate the functionality related to fetching and processing legislation data. This includes setting up `HTTParty` with the base URI for the ProPublica Congress API and the necessary headers for authentication.
* **Fetching Data:** The fetch_legislation method uses `HTTParty.get` to make a GET request to the LegiScan API `getSearch` endpoint. It dynamically inserts the keyword into the query parameters. `HTTParty` automatically parses the JSON response, making it easy to access the data in Ruby.
* **Error Handling:** The method includes basic error handling, logging a message if the request fails or an exception is raised. This is crucial for debugging and ensuring your application can gracefully handle API outages or issues.
* **Processing and Storing Data:** The `find_or_create_legislation` class method demonstrates how you might take the fetched data, iterate over it, and store it in your database, associating each piece of legislation with an issue.

Remember, you'll need to get an API key for the LegiScan API and store it in you `.env` file.

This approach simplifies HTTP requests and response handling in your Rails app, making it more readable and maintainable, especially when dealing with external APIs like ProPublica's.

#### Considerations

* **API Rate Limits:** Be mindful of any rate limits imposed by the API provider.
* **Data Accuracy:** Regularly update your data to reflect the latest legislative developments.
* **User Engagement:** Provide users with options to take action on legislation, such as contacting representatives or participating in campaigns.

By following these steps, you'll be able to highlight and inform users about specific legislation impacting the LGBTQ+ community, fostering informed advocacy and action within your app.

### Managing and Presenting Legislative Issues

In this section of our blog series on building an advocacy app, we delve into managing and presenting legislative issues, focusing on creating a dynamic and user-friendly interface for exploring legislation. Our goal is to empower users to stay informed and engaged with legislative developments that matter to them. We'll cover setting up an **index** page with filtering capabilities and an **edit** page for individual pieces of legislation.

First, add the routes for the two pages and the `update` action.

~~~rb
# file: "config/routes.rb"
resources :legislation, only: [:index, :edit, :update]
~~~

#### Index Page with Filters

Our **index** page will list legislative issues, utilizing `Bootstrap` for styling, and include filters for `status` and `relevant`. To achieve this, we first need to add scopes to our `Legislation` model to easily filter records.

**Adding Scopes in the Model:**

~~~rb
# file: "app/models/legislation.rb"
class Legislation < ApplicationRecord
  # ...

  scope :by_status, -> (status) { where(status: status) }
  scope :relevant, -> { where(relevant: true) }
end
~~~

**Updating the Controller:**

~~~rb
# file: "app/controllers/legislation_controller.rb"
class LegislationController < ApplicationController
  def index
    @legislation = Legislation.all

    @legislation = @legislation.active if params[:active] == "1"
    @legislation = @legislation.relevant if params[:relevant] == "1"
  end
end
~~~

**Creating the Index View:**

We'll use `Bootstrap` to design our index page, ensuring it's responsive and accessible. The form allows users to filter legislation based on `status` and whether it's `relevant`.

~~~erb
<!-- file: "app/views/legislation/index.html.erb" -->
<div class="container">
  <div class="text-center mb-4">
    <h1>All Legislation</h1>
  </div>
  <div class="card">
    <div class="card-header">
      <div class="d-flex flex-row-reverse">
        <%= form_with(url: legislation_index_path, method: :get, local: true) do |form| %>
          <div class="form-check form-check-inline">
            <%= form.label :active, 'Active', class: "form-check-label" %>
            <%= form.check_box :active, { class: "form-check-input" }, "1", "0" %>
          </div>

          <div class="form-check form-check-inline">
            <%= form.label :relevant, 'Relevant', class: "form-check-label" %>
            <%= form.check_box :relevant, { class: "form-check-input" }, "1", "0" %>
          </div>

          <%= form.submit 'Filter', class: "btn btn-primary" %>
        <% end %>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-striped table-hover mb-0">
        <thead class="table-dark">
          <tr>
            <th>Bill Number</th>
            <th>Title</th>
            <th>Relevant</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <% @legislation.each do |bill| %>
            <tr>
              <td><%= bill.bill_number %></td>
              <td>
                <%= bill.title %>
                <div><%= link_to "View full details on LegiScan", bill.url %></div>
              </td>
              <td><%= bill.relevant ? 'Yes' : 'No' %></td>
              <td><%= bill.active ? 'Yes' : 'No' %></td>
              <td>
                <%= link_to 'Edit', edit_legislation_path(bill), class: 'btn btn-sm btn-outline-primary' %>
              </td>
            </tr>
          <% end %>
        </tbody>
      </table>
    </div>
  </div>
</div>
~~~

#### Edit Page for Legislation

The edit page allows users to view all stored information about the legislation as well as update the description, active, and relevant flags of a legislation record. This ensures that legislative issues are accurately represented and up-to-date. It gives an admin the ability to mark a bill as irrelevant or inactive.

**Updating the Controller:**

An `update` controller endpoint in a Rails application is responsible for handling the update action for a specific resource. This action typically involves finding the resource by its ID, attempting to update it with the provided parameters, and then redirecting or rendering a response based on whether the update was successful. Below is an example of what an update endpoint might look like for a `LegislationController`, assuming you're updating a legislation's description, as well as its active and relevant flags.

~~~rb
# file: "app/controllers/legislation_controller.rb"
**Updating the Controller:**

An update controller endpoint in a Rails application is responsible for handling the update action for a specific resource. This action typically involves finding the resource by its ID, attempting to update it with the provided parameters, and then redirecting or rendering a response based on whether the update was successful. Below is an example of what an update endpoint might look like for a LegislationsController, assuming you're updating a legislation's description, as well as its active and relevant flags.

ruby
Copy code
# app/controllers/legislations_controller.rb
class LegislationsController < ApplicationController
  before_action :set_legislation, only: [:edit, :update]

  # This method does not need to be included
  # def edit
  #   @legislation is set by the before_action
  # end

  def update
    respond_to do |format|
      if @legislation.update(legislation_params)
        format.html { redirect_to legislations_url, notice: "Legislation was successfully updated." }
        format.json { render :show, status: :ok, location: @legislation }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @legislation.errors, status: :unprocessable_entity }
      end
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_legislation
    @legislation = Legislation.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def legislation_params
    params.require(:legislation).permit(:description, :active, :relevant)
  end
end
~~~

**Key Components of the Update Endpoint:**

* **before_action:** The set_legislation method is called before the edit and update actions. It finds the legislation object based on the id provided in the URL and sets it as an instance variable (@legislation). This DRYs up the code by removing the need to find the legislation object in both actions.
* **edit action:** This action typically just renders the edit form. Since @legislation is set by the before_action, you don't need to explicitly find the legislation in this action.
* **update action:** This is where the actual update happens. The update method tries to update the legislation object with the provided parameters (legislation_params). If the update is successful, it redirects to a desired path (e.g., the index view of legislations) with a success notice. If the update fails (e.g., validation fails), it re-renders the edit form, displaying any errors.
* **legislation_params (Strong Parameters):** This method defines which parameters are allowed to be used in the update action. It's a security feature to prevent unwanted attributes from being updated (Mass Assignment Vulnerability).
* **respond_to block:** This allows your controller to handle different response formats, such as HTML and JSON, making your application more flexible and API-friendly.

This structure follows the RESTful convention in Rails, providing a clear and secure way to handle updates to your resources.

**Creating the Edit View:**

~~~erb
<!-- file: "app/views/legislation/edit.html.erb" -->
<div class="container">
  <div class="card">
    <div class="card-header">
      <div class="text-center">
        <h1 class="mb-0">Edit Legislation: <%= @legislation.bill_number %></h1>
      </div>
    </div>
    <div class="card-body">
      <div class="table-responsive">
        <%= form_for @legislation, html: { class: 'needs-validation' } do |f| %>
          <table class="table table-striped table-hover">
            <tbody>
              <tr>
                <td>State</td>
                <td><%= @legislation.state %></td>
              </tr>
              <tr>
                <td>Bill Number</td>
                <td><%= @legislation.bill_number %></td>
              </tr>
              <tr>
                <td>Title</td>
                <td>
                  <%= @legislation.title %>
                  <div><%= link_to "View full details on LegiScan", @legislation.url %></div>
                </td>
              </tr>
              <tr>
                <td>Description</td>
                <td>
                  <%= f.label :description %>
                  <%= f.text_area :description, class: 'form-control' %>
                </td>
              </tr>
              <tr>
                <td>Status</td>
                <td><%= @legislation.status %></td>
              </tr>
              <tr>
                <td>Relevant</td>
                <td>
                  <%= f.check_box :relevant, class: 'form-check-input' %>
                </td>
              </tr>
              <tr>
                <td>Active</td>
                <td>
                  <%= f.check_box :active, class: 'form-check-input' %>
                </td>
              </tr>
              <tr>
                <td>Actions</td>
                <td>
                  <%= link_to 'Back to List', legislation_index_path, class: 'btn btn-sm btn-outline-primary' %>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="text-end">
            <%= f.submit 'Update Legislation', class: 'btn btn-primary' %>
          </div>
        <% end %>
      </div>
    </div>
  </div>
</div>
~~~

### Empowering Users Through Information

The combination of a robust legislators database with a dynamic system for highlighting issues and legislation forms the backbone of **BrickByBrick Advocacy**. By providing users with detailed, accessible information and clear avenues for action, we empower them to become active participants in the democratic process.

Our aim is to not only inform but also inspire our users to advocate for change, much like the bricks laid by activists at Stonewall and beyond. In our next posts, we will explore additional features of our app, including actionable steps for advocacy and building a community of support.

Stay tuned as we continue to develop **BrickByBrick Advocacy**, layering feature upon feature to construct a platform that champions equality, justice, and active engagement in the political sphere.
