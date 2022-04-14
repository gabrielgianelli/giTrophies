export default interface Client {
    request(username: string): Promise<string>;
}