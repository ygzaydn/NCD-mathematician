import { context, u128, PersistentVector } from "near-sdk-as";

/**
 * Exporting a new class PostedMessage so it can be used outside of this file.
 */
@nearBindgen
export class EntryTicket {
    sender: string;
    constructor(public text: string) {
        //context.attachedDeposit >= u128.from("10000000000000000000000");
        this.sender = context.sender;
    }
}
/**
 * collections.vector is a persistent collection. Any changes to it will
 * be automatically saved in the storage.
 * The parameter to the constructor needs to be unique across a single contract.
 * It will be used as a prefix to all keys required to store data in the storage.
 */
export const tickets = new PersistentVector<EntryTicket>("m");
