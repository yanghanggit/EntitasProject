/**
 * 
 */
export class MSDeltaTiming {
    /**
     * 
     */
    private fixedFrameTimeMS: number = 1000 / 60;
    /**
     * 
     */
    private fixedTimeSetting: boolean = false;
    /**
     * 
     */
    private startTimeMS: number = 0;
    /**
     * 
     */
    private deltaTimeMS: number = 0;
    /**
     * 
     */
    private maxDebugTimeMS: number = 1;
    /**
     * 
     */
    constructor(fixedFrameTimeMS: number, maxDebugTimeMS: number) {
        if (fixedFrameTimeMS <= 0 || maxDebugTimeMS <= 0) {
            throw new Error("Invalid parameters for DeltaTiming");
        }
        this.fixedFrameTimeMS = fixedFrameTimeMS;
        this.maxDebugTimeMS = maxDebugTimeMS;
    }
    /**
     * 
     */
    public calculate(fixedTimeSetting: boolean): number {
        this.fixedTimeSetting = fixedTimeSetting;
        if (this.fixedTimeSetting) {
            this.startTimeMS = performance.now();
            return this.fixedFrameTimeMS;
        }
        const nowMS = performance.now();
        this.deltaTimeMS = nowMS > this.startTimeMS ? (nowMS - this.startTimeMS) : 0;
        if (this.deltaTimeMS > this.maxDebugTimeMS) {
            this.deltaTimeMS = this.fixedFrameTimeMS;
        }
        this.startTimeMS = nowMS;
        return this.deltaTimeMS;
    }
}