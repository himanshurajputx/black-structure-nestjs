import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { LogLevel, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { CustomLoggerService } from './shared';

let server: { close: (arg0: (err: any) => void) => void };

async function bootstrap() {
  const isProduction = process.env.NODE_ENV === 'production';
  const logLevels: LogLevel[] = isProduction
    ? ['error', 'warn', 'log']
    : ['error', 'warn', 'log', 'verbose', 'debug'];

  const app = await NestFactory.create(AppModule, {
    logger: logLevels,
  });
  const config: ConfigService = app.get(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.use(cookieParser());
  const logger = app.get(CustomLoggerService);
  app.useLogger(logger);
  server = await app.listen(config.get<string>('http.port'), () => {
    console.info(
      'SERVER IS RUNNING ON PORT ' +
        config.get<string>('http.host') +
        '://' +
        'localhost' +
        ':' +
        config.get<string>('http.port'),
    );
  });
  // Handle process kill signals
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}
function shutdown() {
  // Gracefully close outstanding HTTP connections
  server.close((err) => {
    if (err) {
      console.error(
        'An error occurred while closing the server. Forecefullly shutting down',
      );
      console.error(err);
      process.exit(1);
    }
    console.log('Http server closed.');

    // Close data connections here, eg database pool connections

    // clean up your resources and exit
    process.exit(0);
  });
}
bootstrap();
