import { CurrentStateValue, OldStateValue } from '../main';
import { ControlBase, ControlType } from './ControlBase';

export class Pushbutton extends ControlBase {
    async loadAsync(type: ControlType, uuid: string, control: any): Promise<void> {
        await this.updateObjectAsync(uuid, {
            type: type,
            common: {
                name: control.name,
                role: 'switch',
            },
            native: control,
        });

        await this.loadOtherControlStatesAsync(control.name, uuid, control.states, ['active']);

        await this.createBooleanControlStateObjectAsync(control.name, uuid, control.states, 'active', 'switch', {
            write: true,
            smartIgnore: type == 'channel',
        });

        this.addStateChangeListener(uuid + '.active', (oldValue: OldStateValue, newValue: CurrentStateValue) => {
            if (newValue == oldValue) {
                return;
            } else if (newValue) {
                this.sendCommand(control.uuidAction, 'on');
            } else {
                this.sendCommand(control.uuidAction, 'off');
            }
        });

        await this.createButtonCommandStateObjectAsync(control.name, uuid, 'pulse');
        this.addStateChangeListener(uuid + '.pulse', () => {
            this.sendCommand(control.uuidAction, 'pulse');
        });
    }
}