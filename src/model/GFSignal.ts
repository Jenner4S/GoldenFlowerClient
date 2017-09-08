module model {
    export interface GFSignalBinding {
        detach(): void;
    }

    export class GFSignal<T> {
        private _listeners = new Array<(payload: T) => void>();
        add(listener: (payload: T) => void): GFSignalBinding {
            this._listeners.push(listener);
            return {
                detach: () => this._listeners.splice(this._listeners.indexOf(listener),1),
            };
        }
        dispatch(payload: T): void {
            this._listeners.forEach(callback => callback.call(undefined, payload));
        }
    }
}