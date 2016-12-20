import * as sw from "../../utils/simpleWorker";
import * as contract from "./demoContract";
import { TypedEvent } from '../../../common/events';

export const clearLiveDemo = new TypedEvent<{}>();
export const liveDemoData = new TypedEvent<{ data: string }>();

namespace Master {
    export const receiveLiveDemoData: typeof contract.master.receiveLiveDemoData = (q) => {
        liveDemoData.emit(q);
        return Promise.resolve({});
    }
    export const receiveClearLiveDemo : typeof contract.master.receiveClearLiveDemo = (q) => {
        clearLiveDemo.emit({});
        return Promise.resolve({});
    }
}

// Ensure that the namespace follows the contract
const _checkTypes: typeof contract.master = Master;
// launch worker
export const {worker} = sw.startWorker({
    workerPath: __dirname + '/demoWorker',
    workerContract: contract.worker,
    masterImplementation: Master
});
export function start() {
    // Any optional initilization on worker;
}
export const enableLiveDemo =  worker.enableLiveDemo;
export const disableLiveDemo =  worker.disableLiveDemo;
