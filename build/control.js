"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Control = void 0;
var child_process_1 = __importDefault(require("child_process"));
var Control = /** @class */ (function () {
    function Control() {
        this.conn = child_process_1.default.spawn('python', ["".concat(__dirname, "/control.py"), 'start']);
    }
    Control.prototype.write = function (args) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.conn.stdout.on('data', function (chunck) {
                _this.conn.stdout.removeAllListeners('data');
                var output = chunck.toString('ascii');
                if (output.length <= 0)
                    return reject(new Error('No output'));
                try {
                    resolve(JSON.parse(output));
                }
                catch (error) {
                    reject(error);
                }
            });
            _this.conn.stdin.write("".concat(args, "\n"));
        });
    };
    Control.prototype.keyDown = function (key) {
        return this.write("keydown ".concat(key));
    };
    Control.prototype.keyUp = function (key) {
        return this.write("keyup ".concat(key));
    };
    Control.prototype.press = function (key) {
        return this.write("press ".concat(key));
    };
    Control.prototype.stop = function () {
        this.write('stop');
    };
    return Control;
}());
exports.Control = Control;
