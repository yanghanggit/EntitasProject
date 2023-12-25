/**
 * 
 */
function doSomethingAsync(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        setTimeout(() => {
            resolve("结果1");
        }, 1000); // 假设这个操作耗时1秒
    });
}
/**
 * 
 */
function doSomethingElseAsync(result: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        setTimeout(() => {
            resolve(result + " 和 结果2");
        }, 1000); // 假设这个操作也耗时1秒
    });
}
/**
 * 
 */
async function myAsyncFunction() {
    try {
        const result = await doSomethingAsync();
        const newResult = await doSomethingElseAsync(result);
        console.log(newResult);
    } catch (error) {
        console.log(error);
    }
}
/**
 * 
 */
async function callMyAsyncFunction() {
    try {
        await myAsyncFunction();
        console.log("操作完成");
    } catch (error) {
        console.error("发生错误：", error);
    }
}
/**
 * 
 */
export class MyPromise {
    /**
     * 
     */
    constructor() {
    }
    /**
     * 
     */
    run() {
        myAsyncFunction()
            .then(() => console.log("操作完成"))
            .catch(error => console.error("发生错误：", error));

        callMyAsyncFunction();
    }
}