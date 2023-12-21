/**
 * 
 */
import { COMPONENT_ID_PROPERTY } from "./ComponentsPreprocessing";
/**
 * 
 */
export function CID<ComponentClass>(clazz: ComponentClass): number {
    return (clazz as any)[COMPONENT_ID_PROPERTY] as number;
}


