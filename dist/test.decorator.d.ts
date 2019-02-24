export interface IConfig<Input, Expected> {
    description?: string;
    params?: Array<IParams<Input, Expected>>;
}
export interface IParams<Input, Expected> {
    description?: string;
    input: Input;
    expected: Expected;
}
export declare function test<I, E>(config?: IConfig<I, E> | string): (target: any, methodName: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
