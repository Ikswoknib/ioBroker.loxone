import { Control } from '../structure-file';
import { ControlBase, ControlType } from './control-base';

export class TextState extends ControlBase {
    async loadAsync(type: ControlType, uuid: string, control: Control): Promise<void> {
        await this.updateObjectAsync(uuid, {
            type: type,
            common: {
                name: control.name,
                role: 'sensor',
            },
            native: { control: control as any },
        });

        await this.loadOtherControlStatesAsync(control.name, uuid, control.states, ['state']);

        if (!control.hasOwnProperty('states') || !control.states.hasOwnProperty('state')) {
            return;
        }

        await this.createSimpleControlStateObjectAsync(control.name, uuid, control.states, 'state', 'string', 'state');
    }
}
