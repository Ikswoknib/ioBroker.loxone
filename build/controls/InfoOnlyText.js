"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoOnlyText = void 0;
const control_base_1 = require("./control-base");
class InfoOnlyText extends control_base_1.ControlBase {
    async loadAsync(type, uuid, control) {
        await this.updateObjectAsync(uuid, {
            type: type,
            common: {
                name: control.name,
                role: 'sensor',
            },
            native: { control: control },
        });
        await this.loadOtherControlStatesAsync(control.name, uuid, control.states, ['text']);
        if (!control.hasOwnProperty('states') || !control.states.hasOwnProperty('text')) {
            return;
        }
        await this.createSimpleControlStateObjectAsync(control.name, uuid, control.states, 'text', 'string', 'text');
    }
}
exports.InfoOnlyText = InfoOnlyText;
//# sourceMappingURL=InfoOnlyText.js.map