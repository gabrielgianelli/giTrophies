export default interface Server {
    on(url: string, method: string, fn: any): void;
    listen(port: number): void;
}
