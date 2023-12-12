/**
 * 
 */
import { Pool } from "../lib/entitas/Pool";
import { VisualDebugging } from "../lib/entitas/viewer/VisualDebugging";
import { ComponentIds } from "./Components";

export class Pools {

    static _allPools: Array<Pool>;

    static get allPools(): Array<Pool> {
        if (Pools._allPools == null) {
            Pools._allPools = [Pools.pool];
        }
        return Pools._allPools;
    }

    static _pool: Pool;

    static get pool(): Pool {
        if (Pools._pool == null) {
            Pools._pool = new Pool(ComponentIds, ComponentIds.TotalComponents, false);
            VisualDebugging.init(Pools._pool);
        }

        return Pools._pool;
    }
}
