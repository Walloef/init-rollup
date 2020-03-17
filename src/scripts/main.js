// This file includes arrow functions, imports and spread operators just to show that it works
// This file is your init file where all scripts are imported that needs to run
import { arr } from './arr';

const spreadOperator = [...arr()]

const arrowFunction = () => 'arrowFunction'

console.log(spreadOperator);
console.log(arrowFunction())