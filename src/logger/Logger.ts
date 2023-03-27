import { Error } from '../assembler/error';

export enum LogKind {
    Step,
    Context,
    Info,
    Warning,
    Error,
}

export type Log = {
    kind: LogKind.Context,
    title: string,
    time: number,
} | {
    kind: LogKind.Step,
    step: string,
} | {
    kind: LogKind.Warning,
    warning: string,
} | {
    kind: LogKind.Error,
    error: string,
} | {
    kind: LogKind.Info,
    info: string,
}

export default class Logger {
    private _logs: Log[] = [];

    public clear() {
        this._logs = [];
    }

    public logs(): Log[] {
        return Array.from(this._logs);
    }

    public context(title: string, time: number) {
        this._logs.push({ kind: LogKind.Context, title, time }); }

    public step(step: string) {
        this._logs.push({ kind: LogKind.Step, step });
    }

    public warning(warning: string) {
        this._logs.push({ kind: LogKind.Warning, warning });
    }

    public error(error: Error) {
        const l = error.line;
        const c = error.cause;
        const v = error.value ? `"${error.value.toString()}" ` : ``;
        const message = `(at line ${l}) ${v}${c}`;

        this._logs.push({ kind: LogKind.Error, error: message });
    }

    public info(info: string) {
        this._logs.push({ kind: LogKind.Info, info });
    }
}
