//OOP: programming paradigm
//Use objects to model real-world or abstract features.
//contains data (properties) and code (methods)
//we pack data and the corresponding behavior into one block.
//Building blocks of applications, interact with one another
//interactions happen through a PUBLIC INTERFACE (API):methods that the
//code outside the object can access and use to communicate with the object.
//OOP goal : organize code ; make it more flexible and easier to maintain

//CLASS : blueprint from which we can create new Objects
// Object created from Class ->Instance of Class : INSTANTIATION

//4 fundamental OOP Principles for a good Class Implementation
//Abstraction , Encapsulation ,Inheritance , Polymorphism

//1-Abstraction : hide Implementation details that don't matter (not important for users)
//Abstracted away from User

//2-Encapsulation:Keeping properties and methods private inside the Class,
//Not accessible from outside the class
//WHY ?
//Prevents external code from accidentally manipulating internal properties/state ->break code
//Allows to change internal implementation(private methods) without risk of breaking extrenal code

//3-Inheritance : child Class Extends Parent Class
//reuse common logic and to model real-world relationships

//4-polymorphism: A child class can overwrite a method it inherited from a parent class

//OOP in JS
//PROTOTYPES
//All Objects are linked to a prototype Object
//each Object has a prototype
//Prototype:contains methods  that can be used by objects linked to that prototype
//called Pototypal inheritance/Delegation
//like an instance inheriting from a class; OOP inheritance class - class
//Behavior is delegated to the linked prototype object (object to prototype)

//example
const num = [1, 2, 3]; //object linked to Array.prototype
num.map((v) => v * 2); //defined in Array.prototype.map()
//num inherited map method / num deligated the behavior or mapping to its prototype

//How to Implement OOP in JS in practice ?
// 3 ways:
//1-constructor functions
//2-ES6 classes : more modern way : layer of obstraction over previous way of doing it
//3-Object.create() // most straightforward way of linking object to a prototype object

//the 4 OOP principles are still valid with Prototypal Inheritance
