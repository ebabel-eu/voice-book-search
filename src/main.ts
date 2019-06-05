
class HelloWorld {
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}


const hiDave = new HelloWorld('hullo Dave');

console.log(`The message is ${hiDave.message}.`);

