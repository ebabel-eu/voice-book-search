"use strict";
var HelloWorld = /** @class */ (function () {
    function HelloWorld(message) {
        this.message = message;
    }
    return HelloWorld;
}());
var hiDave = new HelloWorld('hullo Dave');
console.log("The message is " + hiDave.message + ".");
