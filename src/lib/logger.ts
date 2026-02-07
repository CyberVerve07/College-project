type LogLevel = 'info' | 'warn' | 'error';

/**
 * Singleton Logger utility for consistent logging across the application.
 * Handles different log levels and environment-specific behaviors.
 */
class Logger {
    private static instance: Logger;
    private isProd = process.env.NODE_ENV === 'production';

    private constructor() { }

    /**
     * Get the singleton instance of the Logger.
     * @returns {Logger} The shared Logger instance.
     */
    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    /**
     * Internal implementation of logging logic.
     * @param {LogLevel} level - The severity level of the log.
     * @param {string} message - The message to log.
     * @param {any} [data] - Optional data to include in the log.
     */
    private log(level: LogLevel, message: string, data?: any) {
        const timestamp = new Date().toISOString();
        const formattedLog = `[${timestamp}] [${level.toUpperCase()}]: ${message}`;

        if (this.isProd) {
            // In production, you would send this to a service like Logtail or Axiom
            // For now, we use console with level distinction
            if (level === 'error') console.error(formattedLog, data);
            else if (level === 'warn') console.warn(formattedLog, data);
        } else {
            console.log(formattedLog, data || '');
        }
    }

    /**
     * Log an info message.
     * @param {string} message - The info message.
     * @param {any} [data] - Optional supporting data.
     */
    public info(message: string, data?: any) {
        this.log('info', message, data);
    }

    /**
     * Log a warning message.
     * @param {string} message - The warning message.
     * @param {any} [data] - Optional supporting data.
     */
    public warn(message: string, data?: any) {
        this.log('warn', message, data);
    }

    /**
     * Log an error message.
     * @param {string} message - The error message.
     * @param {any} [data] - Optional supporting data, such as an Error object.
     */
    public error(message: string, data?: any) {
        this.log('error', message, data);
    }
}

export const logger = Logger.getInstance();
