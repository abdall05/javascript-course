//Structure:organize code
//Maintainability:chnage it in the future
//Expandability:add new features

//well-established architecture pattern like MVC,MVP ...

//Some components that any architecture must have (Web application)

//1-Business Logic : solves the actual business problem.
//like storing transactions, calculating taxes for Banks...

//2-State:Stores all the data about the application (user input/API...)
//UI should be kept in sync with the state
//Many state management libraries like Redux

//3-HTTP Library:making and receiving AJAX requests

//4-Application Logic:implementation of application itself
//Handles navigation and UI events
//mapping action to the user navigation

//5-Presentation Logic (UI Layer) : display the state (sync)

//any good architecture have a way of seperating these components

//MVC : Model-View-Controller Architecture
//View:presentation Logic
//Model:Application's data ->Business logic + State + Http Library
//Controller:Application logic : Bridge between Model and View

//exp: user clicks -> event handled by controller
//Controller interacts with Model for data and with View to update UI
//Controller dispatches tasks to Model and View
//its Controls and Orchestrates this entire actios
//only the controller imports from View and Model

//different ways to implement the MVC Pattern

//first part of forkify
//User selects recipe / page loads with recipe ID: Controller
//Controller call Load recipe (from Model)
//when receive data call render recipe from View

//many real world application have 2 special modules that are completely
//independant of the rest of the architecture
//1-helpers 2-Configuration

//1-config.js
//all variables that should be constants
//exp : API url

//2-helpers.js

//Event handlers in MVC : Publisher-Subscriber Pattern
//DOM elements are related to views -> we cant listen to them
//in the controller;in views instead
//but the callback is inside the controller ? what to do
//we can't call functions from controller in the view
//Solution: Publisher-Subscriber Design Pattern

//the publisher:code that know when to react
//which listen for the event
//subscriber:code that whants to react
//callback inside the controller

//program starts ; controller calls init ; calls the publisher(addHandlerRender())
//subscribe to publisher by passing in the subsriber function
