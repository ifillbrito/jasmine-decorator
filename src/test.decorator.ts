export interface IConfig<Input, Expected> {
    description?: string;
    params?: Array<IParams<Input, Expected>>;
}

export interface IParams<Input, Expected> {
    description?: string;
    input: Input;
    expected: Expected;
}

export function test<I, E>(config?: IConfig<I, E>|string) {
    return (target: any, methodName: string, descriptor: PropertyDescriptor) => {
        let configInternal: IConfig<I, E> = {};
        if (typeof config ===  'string') {
            configInternal = {description: config};
        } else {
            Object.assign(configInternal, config);
        }

        if (!configInternal || !configInternal.params || configInternal.params.length === 0) {
            executeTest(descriptor, configInternal);
            return descriptor;
        }

        configInternal.params.forEach((testConfig: IParams<I, E>, i: number) => {
            if (!testConfig.description && configInternal && configInternal.description) {
                testConfig.description = configInternal.description;
            }
            executeTest(descriptor, configInternal, testConfig, i);
        });
        return descriptor;
    };
}

function executeTest<I, E>(
    descriptor: PropertyDescriptor,
    config?: IConfig<I, E>,
    params?: IParams<I, E>,
    index?: number,
) {
    describe(createDescription(descriptor, index, config, params), () => {
        it(createParameters(params), () => {
            descriptor.value(params);
        });
    });
}

function createDescription<I, E>(
    descriptor: PropertyDescriptor,
    index: number | undefined,
    config?: IConfig<I, E>,
    params?: IParams<I, E>,
) {
    const indexText = (index || index === 0 ? `\n\tCase Index: ${index}` : '');
    if (
        (!config && !params) ||
        (config && !params && !config.description) ||
        (!config && params && !params.description ) ||
        (config && params && !params.description && !config.description)
    ) {
        return `\tTest: ${descriptor.value.name.replace(/_/g, ' ')}` + indexText;
    }

    if (config && config.description && params && params.description) {
        return `\tTest: ${config.description} - ${params.description}` + indexText;
    }

    if (config && config.description && (!params || !params.description)) {
        return `\tTest: ${config.description}` + indexText;
    }

    if ((!config || !config.description) && params && params.description) {
        return `\tTest: ${params.description}` + indexText;
    }
    return '';
}

function createParameters<I, E>(config?: IConfig<I, E>) {
    const clonedCase = Object.assign({}, config);
    delete clonedCase.description;
    return config ? `\n\tParameters: ${JSON.stringify(clonedCase).replace(/"/g, '')}` : '';
}
