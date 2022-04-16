import {
    context,
    logging,
    storage,
    u128,
    ContractPromiseBatch,
    PersistentMap
} from 'near-sdk-as';


let m = new PersistentMap<string, Array<u128> >("m");

// --- contract code goes below

export function getStorage(key:string): string | null {
    return storage.getString(key);
}

export function getMap(key:string):Array<u128>| null {
    return m.get(key);
    
}

export function getTicket(): void {
    
    logging.log(
        'transfer from: ' +
            context.sender +
            ' to: ' +
            context.contractName +
            ' amount: ' + context.attachedDeposit.toString() +' NEAR '
    );
    
    const price = u128.from('10000000000000000000000');

    assert(
        context.accountBalance >= price,
        'user does not have enough near to participate game'
    );
  
    ContractPromiseBatch.create(context.contractName).transfer(
        context.attachedDeposit
    );
  
    storage.set(context.sender, 'payment completed');
  
}

export function finishGame(amount:u128): void {
    logging.log(
        'transfer from: ' +
            context.contractName +
            ' to: ' +
            context.sender +
            ' amount: ' + amount.toString() +' NEAR '
    );

  

    ContractPromiseBatch.create(context.sender).transfer(
        amount
    );

    const mapVal = m.get(context.sender);
    if(mapVal){
        mapVal.push(amount)
        m.set(context.sender, mapVal );
    } else {
        m.set(context.sender, [amount] );
    }
    
    
  
    storage.set(context.sender, '');
}
