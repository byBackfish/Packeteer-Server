import { Timestamp } from '@skyra/timestamp';
import Logger from 'node-color-log';

export class PacketeerConsole {
  logger: typeof Logger;
  template: Timestamp;
  name: string;

  constructor(name: string) {
    this.logger = Logger;
    this.logger.setLevel(
      process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'staging'
        ? 'debug'
        : 'info'
    );
    this.template = new Timestamp(/*'DD/MM/YYYY @*/ 'HH:mm:ss');
    this.name = name;
  }

  get timestamp() {
    return this.template.display(new Date());
  }

  debug(...args: any[]) {
    if (this.logger.level != 'debug') return;
    this.logger
      .bgColor('magenta')
      .bold()
      .log(`[${this.name} @ ${this.timestamp}]`)
      .joint()
      .log(' ')
      .joint()
      .log(...args);
  }

  info(...args: any[]) {
    this.logger
      .bgColor('green')
      .color('black')
      .bold()
      .log(`${this.name} @ ${this.timestamp}]`)
      .joint()
      .log(' ')
      .joint()
      .log(...args);
  }

  log(...args: any[]) {
    this.info(...args);
  }

  warn(...args: any[]) {
    this.logger
      .bgColor('yellow')
      .color('black')
      .log(`[${this.name} @ ${this.timestamp}]`)
      .joint()
      .log(' ')
      .joint()
      .log(...args);
  }

  oops(...args: any[]) {
    this.warn(...args);
  }

  error(...args: any[]) {
    this.logger
      .bgColor('red')
      .bold()
      .log(`[${this.name} @ ${this.timestamp}]`)
      .joint()
      .log(' ')
      .joint()
      .log(...args);
  }

  wtf(...args: any[]) {
    this.error(...args);
  }
}
