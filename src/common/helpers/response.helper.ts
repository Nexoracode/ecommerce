interface ResponseOption<T = any> {
    success: boolean,
    message: string;
    statusCode: number;
    data?: T | null;
}

export const buildResponse = <T = any>(options: ResponseOption) => {
    return {
        success: options.success,
        message: options.message,
        statusCode: options.statusCode,
        data: options.data ?? null
    }
}