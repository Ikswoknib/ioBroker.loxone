"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Radio = void 0;
const control_base_1 = require("./control-base");
class Radio extends control_base_1.ControlBase {
    async loadAsync(type, uuid, control) {
        await this.updateObjectAsync(uuid, {
            type: type,
            common: {
                name: control.name,
                role: 'radio',
            },
            native: { control: control },
        });
		
        await this.loadOtherControlStatesAsync(control.name, uuid, control.states, 'activeOutput');
        await this.createSimpleControlStateObjectAsync(control.name, uuid, control.states, 'activeOutput', 'number', 'level', { write: true });
        this.addStateChangeListener(uuid + '.activeOutput', (oldValue, newValue) => {
            newValue = this.convertStateToInt(newValue);
            this.sendCommand(control.uuidAction, newValue.toString());
        });
		
        if (!control.hasOwnProperty('details')) {
            return;
        }

        if (control.details.hasOwnProperty('allOff')) {
			if (control.details.allOff != "") {
				await this.createButtonCommandStateObjectAsync(control.name, uuid, 'allOff');
				this.addStateChangeListener(uuid + '.allOff', () => {
					this.sendCommand(control.uuidAction, 'allOff');
				});
			}
		}
        if (control.details.hasOwnProperty('outputs')) {
			for each (outp in control.details.outputs){
				if (control.details.outputs.hasOwnProperty(outp)) {			
					await this.createButtonCommandStateObjectAsync(control.name, uuid, outp);
					this.addStateChangeListener(uuid + '.' + outp, () => {
						this.sendCommand(control.uuidAction,outp);
					});
				}
			}
		}
    }
}
exports.Radio = Radio;
//# sourceMappingURL=Radio.js.map