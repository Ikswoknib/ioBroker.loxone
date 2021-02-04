"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpDownDigital = void 0;
const control_base_1 = require("./control-base");
class UpDownDigital extends control_base_1.ControlBase {
    async loadAsync(type, uuid, control) {
        await this.updateObjectAsync(uuid, {
            type: type,
            common: {
                name: control.name,
                role: 'switch',
            },
            native: { control: control },
        });
        await this.createButtonCommandStateObjectAsync(control.name, uuid, 'pulseUp');
        this.addStateChangeListener(uuid + '.pulseUp', () => {
            this.sendCommand(control.uuidAction, 'PulseUp');
        });
        await this.createButtonCommandStateObjectAsync(control.name, uuid, 'pulseDown');
        this.addStateChangeListener(uuid + '.pulseDown', () => {
            this.sendCommand(control.uuidAction, 'PulseDown');
        });
		
    }
}
exports.UpDownDigital = UpDownDigital;
//# sourceMappingURL=UpDownDigital.js.map