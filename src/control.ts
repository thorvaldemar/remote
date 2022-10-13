import process from 'child_process';

class Control {
    private conn: process.ChildProcessWithoutNullStreams;

    constructor() {
        this.conn = process.spawn('python', [`${__dirname}/control.py`, 'start']);
    }

    write(args: string): Promise<Object> {
        return new Promise((resolve, reject) => {
            this.conn.stdout.on('data', chunck => {
                this.conn.stdout.removeAllListeners('data');

                const output: string = chunck.toString('ascii');
                if (output.length <= 0) return reject(new Error('No output')); 

                try {
                    resolve(JSON.parse(output));
                } catch (error) {
                    reject(error);
                }

            });
            this.conn.stdin.write(`${args}\n`);
        });
    }

    keyDown(key: string): Promise<Object> {
        return this.write(`keydown ${key}`);
    }

    keyUp(key: string): Promise<Object> {
        return this.write(`keyup ${key}`);
    }

    press(key: string): Promise<Object> {
        return this.write(`press ${key}`);
    }

    stop() {
        this.write('stop');
    }
}

export { Control };