import axios from 'axios';
import Client from './Client';

export default class ClientAxiosAdapter implements Client {
    private client;
    private baseUrl;

    constructor() {
        this.client = axios.create();
        this.baseUrl = 'https://www.github.com/';
    }

    async request(username: string): Promise<string> {
        const url = `${this.baseUrl}${username}`;
        const { data } = await this.client.get(url);
        return data.toString();
    }
}