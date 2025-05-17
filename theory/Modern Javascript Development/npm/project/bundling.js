//The module Bundler that we will use : Parcel
//works without any configuration

//install
//npm install parcel --save-dev
//dev tool to build our application

//parcel will be added to package.json through "devDependecies" property
//two options to use parcel
//1-npx -2 npm scripts

//1-npx : applcation build into npm
//npx parcel index.html
//remove type ="module" // modules will be replaced by parcel
//modules dont work with older browsers

//2-npm scripts
//write scripts in package.json
/*

  "scripts": {
  "start":"parcel index.html"
    ,"test": "echo \"Error: no test specified\" && exit 1"
  },
to run the script npm run start ; start : name of script


*/

//finally building step

// "build":"parcel build index.html"
//npm run build
