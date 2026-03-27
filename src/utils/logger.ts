// path: src/utils/logger.ts
export class Logger {
    public static info(message: string): void {
        console.log(`[INFO] ${new Date().toISOString()}: ${message}`);
    }

    public static error(message: string, error?: Error): void {
        console.error(`[ERROR] ${new Date().toISOString()}: ${message}`, error?.message || '');
    }
}