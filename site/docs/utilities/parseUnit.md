# parseUnit

Multiplies a string representation of a number by a given exponent of base 10 (10<sup>exponent</sup>).

## Import

```ts
import { parseUnit } from 'viem'
```

## Usage

```ts
import { parseUnit } from 'viem'

parseUnit('420', 9) // [!code focus:2]
// 420000000000n
```

## Returns

`bigint`

## Arguments

### value

- **Type:** `string`

The string representation of the number to multiply.

### exponent 

- **Type:** `number`

The exponent.