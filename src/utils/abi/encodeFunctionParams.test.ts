import { expect, test } from 'vitest'

import { encodeFunctionParams } from './encodeFunctionParams'

test('foo()', () => {
  expect(
    encodeFunctionParams({
      abi: [
        {
          inputs: [],
          name: 'foo',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ] as const,
      functionName: 'foo',
    }),
  ).toEqual('0xc2985578')
  expect(
    encodeFunctionParams({
      // @ts-expect-error
      abi: [
        {
          name: 'foo',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ] as const,
      functionName: 'foo',
    }),
  ).toEqual('0xc2985578')
})

test('bar(uint256)', () => {
  expect(
    encodeFunctionParams({
      abi: [
        {
          inputs: [
            {
              internalType: 'uint256',
              name: 'a',
              type: 'uint256',
            },
          ],
          name: 'bar',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ] as const,
      functionName: 'bar',
      args: [1n],
    }),
  ).toEqual(
    '0x0423a1320000000000000000000000000000000000000000000000000000000000000001',
  )
})

test('getVoter((uint256,bool,address,uint256))', () => {
  expect(
    encodeFunctionParams({
      abi: [
        {
          inputs: [
            {
              components: [
                {
                  internalType: 'uint256',
                  name: 'weight',
                  type: 'uint256',
                },
                {
                  internalType: 'bool',
                  name: 'voted',
                  type: 'bool',
                },
                {
                  internalType: 'address',
                  name: 'delegate',
                  type: 'address',
                },
                {
                  internalType: 'uint256',
                  name: 'vote',
                  type: 'uint256',
                },
              ],
              internalType: 'struct Ballot.Voter',
              name: 'voter',
              type: 'tuple',
            },
          ],
          name: 'getVoter',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ] as const,
      functionName: 'getVoter',
      args: [
        {
          delegate: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
          vote: 41n,
          voted: true,
          weight: 69420n,
        },
      ],
    }),
  ).toEqual(
    '0xf37414670000000000000000000000000000000000000000000000000000000000010f2c0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000a5cc3c03994db5b0d9a5eedd10cabab0813678ac0000000000000000000000000000000000000000000000000000000000000029',
  )
})

test("errors: function doesn't exist", () => {
  expect(() =>
    encodeFunctionParams({
      abi: [
        {
          inputs: [],
          name: 'foo',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ] as const,
      // @ts-expect-error
      functionName: 'bar',
    }),
  ).toThrowErrorMatchingInlineSnapshot(`
    "Function \\"bar\\" not found on ABI.
    Make sure you are using the correct ABI and that the function exists on it.

    Docs: https://viem.sh/docs/contract/encodeFunctionParams

    Version: viem@1.0.2"
  `)
})