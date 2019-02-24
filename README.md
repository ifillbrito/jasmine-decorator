# Jasmine Decorators
## Overview
This projects illustrates how to implement a decorator for writing unit tests. 
The implementation uses Jasmine.

## Usage
1. Define a class to add methods for your tests.
2. Add your methods and write `@test()` above each of them.
3. Run the tests

Notice that this package is not in the npm repository. The code is very short. If you would like to try it,
just take the code from `src/test.decorators.ts` or `dist/test.decorator.js`

## What is the decorator doing?
Basically the decorator is only creating a `describe` and a `it` function. It generates some strings
 for them and it places your assertion-code inside of the `it` function.

## Examples
### Basic Test
Using `@test()` only.

```
class TestDemo {

    @test()
    public two_times_two_should_return_four() {
        expect(multiply(2, 2)).toBe(4);
    }   
}
```
If the test fails, you would see something like:
```
1) Test: two times two should return four 
  - Expected <some_number> to be <some_result>.
```

### Specify a Description for the Test
Using `@test(<description>)`

```
class TestDemo {

    @test('2 x 2 = 4') // or @test({description: '2 x 2 = 4'})
    public some_name() {
        expect(multiply(2, 2)).toBe(4);
    }
}
```
If the test fails in this case, then you would see something like:
```
1) Test: 2 x 2 = 4 
  - Expected <some_number> to be <some_result>.
```

### Parameterized Tests
You can also pass an object with a description and an array of parameters.
In this case, the test method must have a parameter of type `IParams<Input, Expected>`.
You can now use this object to write the assertions in your tests.

The main decription and the description from `params` is concatenated in the report.

```typescript
class TestDemo{
    @test(
        {
            description: 'cases',
            params: [{
                description: '2 x 4 = 8',
                expected: 8,
                input: {n1: 2, n2: 4},
            }, {
                description: '2 x 4.5 = 9',
                expected: 9,
                input: {n1: 2, n2: 4.5},
            }, {
                expected: 0,
                input: {n1: 2, n2: 0},
            }],
        })
    public test_multiply(params: IParams<{n1: number, n2: number}, number>) {
        expect(multiply(params.input.n1, params.input.n2)).toBe(params.expected);
    }
}
```

If a test fails, you would see the parameters and the case index.
```
1) Test: cases - 2 x 4.5 = 9
    Case Index: 1 
    Parameters: {expected:<some_result>,input:{n1:2,n2:4.5}}
  - Expected <some_number> to be <some_result>.
```
## TODO
- Add support for `afterAll`, `afterEach`, `beforeAll`, `beforeEach`. 


## License

Copyright 2019 by Grebiel José Ifill Brito

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

