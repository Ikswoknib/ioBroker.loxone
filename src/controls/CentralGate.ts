import { ControlBase, ControlType } from './ControlBase';

export class CentralGate extends ControlBase {
    async loadAsync(type: ControlType, uuid: string, control: any): Promise<void> {
        await this.updateObjectAsync(uuid, {
            type: type,
            common: {
                name: control.name,
                role: 'blind',
            },
            native: control,
        });

        await this.createButtonCommandStateObjectAsync(control.name, uuid, 'open');
        this.addStateChangeListener(uuid + '.open', () => {
            this.sendCommand(control.uuidAction, 'open');
        });

        await this.createButtonCommandStateObjectAsync(control.name, uuid, 'close');
        this.addStateChangeListener(uuid + '.close', () => {
            this.sendCommand(control.uuidAction, 'close');
        });

        await this.createButtonCommandStateObjectAsync(control.name, uuid, 'stop');
        this.addStateChangeListener(uuid + '.stop', () => {
            this.sendCommand(control.uuidAction, 'stop');
        });
    }
}