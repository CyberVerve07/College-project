type LogLevel = 'info' | 'warn' | 'error';

class Logger {
    private static instance: Logger;
    private isProd = process.env.NODE_ENV === 'production';

    private constructor() { }

    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

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

    public info(message: string, data?: any) {
        this.log('info', message, data);
    }

    public warn(message: string, data?: any) {
        this.log('warn', message, data);
    }

    public error(message: string, data?: any) {
        this.log('error', message, data);
    }
}

export const logger = Logger.getInstance();
