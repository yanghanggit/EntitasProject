
import "reflect-metadata";
/**
 * 
 */
export function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}
/**
 * 
 */
function enumerable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.enumerable = value;
    };
}
/**
 * 
 */
function configurable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.configurable = value;
    };
}
/**
 * 
 */
function format(formatString: string) {
    return function (target: any, propertyKey: string) {
        Reflect.defineMetadata("format", formatString, target, propertyKey);
    };
}
/**
 * 
 */
function logParameter(target: any, key: string, index: number) {
    console.log('logParameter:' + key);
}

/**
 * 
 */
@sealed
export class MyDecorators {
    /**
     * 
     */
    @format("Hello, %s")
    greeting: string;
    /**
     * 
     */
    private _name: string;
    /**
     * 
     */
    constructor(greeting: string, name: string) {
        this.greeting = greeting;
        this.name = name;
        this._privateCall("_privateCall");
    }
    /**
     * 
     */
    @enumerable(false)
    greet() {
        let formatString = Reflect.getMetadata("format", this, "greeting");
        return formatString.replace("%s", this.greeting + this._name);
    }
    /**
     * 
     */
    @configurable(false)
    get name() { return this._name; }
    set name(value) { this._name = value; }
    /**
     * 
     */
    private _privateCall(@logParameter message: string) {
        console.log(message);
    }
}
