/**
 * 
 */
export class DeltaTiming {
    /**
     * 
     */
    fixedFrameTime: number = 1000 / 60;
    /**
     * 
     */
    fixedTime: boolean;
    /**
     * 
     */
    startTime: number;
    /**
     * 
     */
    deltaTime: number;
    /**
     * 
     */
    maxDebugTime: number = 1;
    /**
     * 
     */
    constructor(fixedFrameTime: number, maxDebugTime: number) {
        this.fixedFrameTime = fixedFrameTime;
        this.maxDebugTime = maxDebugTime;
    }
    /**
     * 
     */
    calculate(fixedTime: boolean): number {
        this.fixedTime = fixedTime;
        if (fixedTime) {
            this.startTime = performance.now();
            return this.fixedFrameTime;
        }

        const now = performance.now();
        this.deltaTime = now > this.startTime ? (now - this.startTime) / 1000 : 0;
        if (this.deltaTime > this.maxDebugTime) {
            this.deltaTime = this.fixedFrameTime;
        }
        this.startTime = now;
        return this.deltaTime;
    }
}