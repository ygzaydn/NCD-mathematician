import Big from 'big.js';

export const DIVIDER = 1000000000000000000000000;
export const ATTACHED_GAS = Big(1)
    .times(10 ** 14)
    .times(3)
    .toFixed(); // NEAR --> 10k picoNEAR conversion
export const ATTACHED_TOKENS = Big(1)
    .times(10 ** 24)
    .toFixed(); // NEAR --> yoctoNEAR conversion
