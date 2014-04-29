interface Window {
	JSON: any;
}
declare class LocalStore {
	constructor();
	public clear(key: string): void;
	public hasKey(key: string): boolean;
	public load(key: string): any;
	public save(key: string, value: any): void;
}
