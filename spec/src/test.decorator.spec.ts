import {IParams, test} from '../../src/test.decorator';

function multiply(a: number, b: number) {
    return a * b;
}

class TestDemo {

    @test()
    public two_times_two_should_return_four() {
        expect(multiply(2, 2)).toBe(4);
    }

    @test('2 x 2 = 4')
    public some_name() {
        expect(multiply(2, 2)).toBe(4);
    }

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
