import { ControlBase, ControlType } from './ControlBase';

/**
 * This class is used if the control has no type (currently seems to be only for window monitoring).
 * It will just load the simple default states.
 */
export class None extends ControlBase {
    async loadAsync(type: ControlType, uuid: string, control: any): Promise<void> {
        await this.updateObjectAsync(uuid, {
            type: type,
            common: {
                name: control.name,
                role: 'info',
            },
            native: control,
        });

        await this.loadOtherControlStatesAsync(control.name, uuid, control.states, []);
    }
}
