var HelloWorld = /** @class */ (function () {
    function HelloWorld(message) {
        this.message = message;
    }
    return HelloWorld;
}());
var hiDave = new HelloWorld('Hi Dave');
console.log("The message is " + hiDave.message + ".");
