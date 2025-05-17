//all of these tools from npm work in the Command Line
//npm : node package manager : its both a software on computer and a package repository
//old way in our projects ; we used the script tag to add libraries
//manage our dependencies in a better and a modern way

//when creating a new project
//1-npm init : init our project
//the previous step creates a filed called package.json
//stores the entire configuration fo our project
//2-download other modules
//example npm install leaflet
//a leaflet dependecy will be created in package.json with the version used
//node_modules folder will be added which contains the leaflet folder
//if we wanted to use it , that wouldnt be easy without a module bundler
//CommonJS (won’t work in browser) they are Node.js-specific
//because leaflet uses the CommonJs module system
//the bundler will replace CommonJS syntax with pure JS

//loadash
//old way  <script src="lodash.js"></script>
// we will install the ES Module format
//using npm i lodash-es

//never upload node-modules folder : ignore it
//npm install will install all dependencies that are in package.json

//uninstall
//npm uninstall package
//to install a specific version
//npm i package@version
