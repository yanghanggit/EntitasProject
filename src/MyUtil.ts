/**
 * 
 */
export class MyUtil {
    /**
     * 
     */
    public static randomElementFromArray<T>(arr: T[]): T | undefined {
        if (arr.length === 0) {
            return undefined;
        }
        const randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    }
    /**
     * 
     */
    public static randomRange(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
}