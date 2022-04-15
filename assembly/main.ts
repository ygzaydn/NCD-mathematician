import {
    context,
    logging,
    PersistentMap,
    storage,
    u128,
    ContractPromiseBatch,
    ContractPromise,
} from 'near-sdk-as';

const BASIC_GAS = 5000000000000;

// --- contract code goes below

const balances = new PersistentMap<string, u128>('q:');

function getBalance(owner: string): u128 {
    return balances.getSome(owner);
}

export function sayHi(): string {
    return 'Hello';
}

export function getPredecessor(): string {
    return context.predecessor;
}

export function initialize(user: string): void {
    logging.log('user: ' + user);
    assert(storage.get<string>(user) == null, 'User is already initialized');
    const balance = context.accountBalance;
    balances.set(user, balance);
    storage.set(user, 'initialization completed');
}

export function initCheck(user: string): string | null {
    return storage.get<string>(user);
}

function xcc__high_level__function_call(
    remote_account: string,
    remote_method: string,
    remote_method_args: string
): void {
    const promise = ContractPromise.create(
        remote_account, // target contract account name
        remote_method, // target contract method name
        remote_method_args, // target contract method arguments
        BASIC_GAS, // gas attached to the call
        u128.from('10000000000000000000000') // deposit attached to the call
    );

    promise.returnAsResult(); // return the value of the DataReceipt the client
}

export function getTicket(): boolean {
    logging.log(
        'transfer from: ' +
            context.sender +
            ' to: ' +
            context.contractName +
            ' amount: 1 NEAR '
    );
    const fromAmount = getBalance(context.sender);
    const price = u128.from('10000000000000000000000');

    assert(
        fromAmount >= price,
        'user does not have enough near to participate game'
    );

    xcc__high_level__function_call(context.contractName, 'getTicket', '');

    /*functionCall(
        'getTicket',
        [null],
        BASIC_GAS,
        u128.from('10000000000000000000000')
    );*/

    ContractPromiseBatch.create(context.contractName).transfer(
        context.attachedDeposit
    );
    //createTransaction(context.sender,,"nerdkrypto.testnet",)
    balances.set(context.sender, u128.sub(fromAmount, price));

    return true;
}
