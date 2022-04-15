import {
    context,
    logging,
    storage,
    u128,
    ContractPromiseBatch,
} from 'near-sdk-as';

// --- contract code goes below



export function getStorage(key:string): string | null {
    return storage.getString(key);
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

    storage.set(context.sender, '');
}
