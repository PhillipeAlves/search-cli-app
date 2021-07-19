# Search App

<br />

## About

<br />

This is a search command line application that provides access to data from users and tickets. It follows three steps:

#### `1` - Input

When the user runs the application in the terminal, he/she gets a few options (filters) to choose from. </br> These are predetermined filters based on mapping of the data and a field for the user to input the terms for the search. They are:

- ##### Search type

  _Prompt_: "I am searching for" </br>
  _Choices_: Determines the main data to be searched.

  > - tickets
  > - users

- ##### Match

  _Prompt_: "using" </br>
  _Choices_: With this option the use can choose the kind of reach match.

  > - relative match
  > - exact match

- ##### Criteria

  _Prompt_: "by" </br>
  _Choices_: Based on the previous choice the user can choose one filter respectively. </br>

  > - **Users**
  >   > - user ID
  >   > - name
  >   > - date created
  >   > - verified user </br>
  > - **Tickets**
  >   > - ticket ID
  >   > - date created
  >   > - content type
  >   > - subject
  >   > - assignee ID
  >   > - tags

- ##### Results per page

  _Prompt_: "Results per page" </br>
  Choices: It allows the user to choose the number of results to be displayed per page.

  > - 1
  > - 5
  > - 10
  > - 15
  >   -20

- ##### Search value

  _Prompt_: "Type your search here" or "Are you looking for...?" based on the criteria </br>
  _Choices_: In this field the use types the terms of the search.

  > - user input

</br>

#### `2` - Search

Based on the user's inputs the app performs a main search through the data opted on search type. </br>
If it finds a result then it runs a second search on the remaining data for related data.
</br>
When searching for tickets it returns their assigned user and searching users returns their assigned tickets.

#### `3` - Output

Once the search is completed the results are displayed to the user on the terminal. </br>
The amount of results is displayed and easily accessible on the intervals between results as a foot note.
</br>
If there are multiple results the user can opt to see more results by either pressing return or "y" (yes).
</br>
The user can choose to stop the application in this case by pressing "n" (no).
</br>
If no results were found the user gets a "not found" message containing also the search terms.

</br>

---

</br>

## Technical specifications

</br>

The app was built with JavaScript using Node.js as runtime.
</br> It is organized in different directories based on functionality. They are:

- #### Data

  It handles basic functionalities related to how the data is organized, by mapping and sorting it.

- #### Input

  It takes care of the initializing the app and input functionalities by prompting the user for input. </br>
  This input data is then returned to be searched.

- #### Search

  It contains all the logic behind the search. </br>
  The application uses both custom and native sorting JS functions (mostly the QuickSort algorithms in our case).</br>
  It uses custom binary search algorithm to find related data after it has been sorted.

- #### Output

  This section handles the next step after the search returns with the results.</br>
  It formats the data to become more readable and renders a basic UI to show the results.

- #### UI

  The "ui" folder contains basic "components" build using "chalk" and "boxen".</br>
  It also handles different options for text rendering.

- #### Utils

  This section contains shared formatting and validation functions used across the application.

- #### Test
  This folder contains the tests related to each section, when testing is feasible. </br>
  It uses Jest as a testing framework.

</br>

---

</br>

## Instructions

</br>

#### `1` - Clone the project to your local directory

</br>

```
$ git clone https://github.com/PhillipeAlves/search-cli-app.git
$ cd search-cli-app
```

</br>

#### `2` - Install the dependencies

</br>

```
$ npm install
```

</br>

#### `3` - Run

</br>

```
$ npm start
```

</br>

---

</br>
