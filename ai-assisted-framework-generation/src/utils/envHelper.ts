// path: src/utils/envHelper.ts
export class EnvHelper {
    public static getBaseUrl(): string {
        return process.env.BASE_URL || 'https://www.saucedemo.com';
    }
}