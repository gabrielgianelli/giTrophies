export default class DailyContribution {
    constructor (
        readonly date: Date,
        readonly totalContributions: number
    ) {}

    get hasContributions (): boolean {
        return this.totalContributions > 0;
    } 
    
    isDate (date: Date): boolean {
        return this.date.getTime() === date.getTime();
    }
}
