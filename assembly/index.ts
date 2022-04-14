import { storage, u128, context, logging } from "near-sdk-as";


// let amount: u128 = 1_000_000_000_000_000_000_000_000; // 1 $NEAR as yoctoNEAR
// return the string 'hello world'
export function helloWorld(names: Array<string>): string {
    return names.map<string>((name) => "hello " + name).join(" ");
}

// read the given key from account (contract) storage
export function read(key: string): string {
    if (storage.hasKey(key)) {
        return `✅ Key [ ${key} ] has value [ ${storage.getString(key)!} ]`;
    } else {
        return `🚫 Key [ ${key} ] not found in storage. ( ${storageReport()} )`;
    }
}

// write the given value at the given key to account (contract) storage
export function write(key: string, value: string): string {
    storage.set(key, value);
    return `✅ Data saved. ( ${storageReport()} )`;
}

// return predecessor
export function predecessor(): string {
    const predecessor = context.predecessor;
    return "hello " + predecessor;
}

// private helper method used by read() and write() above
function storageReport(): string {
    return `storage [ ${context.storageUsage} bytes ]`;
}
