import DailyContribution from "./DailyContribution";

export default class DailyContributionList {
    constructor(
        private _dailyContributions: DailyContribution[] 
    ) {}

    get currentStreak(): number {
        const reverseDailyContributions = this._dailyContributions.slice().reverse();
        let lastDay = reverseDailyContributions.shift();
        if (!lastDay) return 0;
        lastDay.date.setHours(0, 0, 0, 0);
        const serverDay = new Date();
        serverDay.setHours(0, 0, 0, 0);
        const serverNextDay = new Date(serverDay.getTime());
        serverNextDay.setDate(serverNextDay.getDate() + 1);
        let streak = 0;
        if (lastDay.isDate(serverNextDay)) {
            if (lastDay.hasContributions) streak++;
            lastDay = reverseDailyContributions.shift();
            if (!lastDay) return streak;
            lastDay.date.setHours(0, 0, 0, 0);
        }
        if(!lastDay.isDate(serverDay)) return streak;
        if (lastDay.hasContributions) streak++;
        else if (streak > 0) return streak;
        let previousDay = new Date(lastDay.date.getTime());
        previousDay.setDate(previousDay.getDate() - 1);
        for (let contribution of reverseDailyContributions) {
            if (!contribution.isDate(previousDay)) break;
            if (!contribution.hasContributions) break;
            previousDay.setDate(previousDay.getDate() - 1);
            streak++;
        }
        return streak;
    }

    get maxStreak(): number {
        let nextDay = this._dailyContributions[0].date;
        let streak = 0;
        let maxStreak = 0;
        for (let contribution of this._dailyContributions) {
            if (streak > maxStreak) maxStreak = streak;
            const { date, totalContributions } = contribution;
            if (date.getTime() === nextDay.getTime() && totalContributions > 0) streak++;
            else streak = 0;
            nextDay.setDate(nextDay.getDate() + 1);
        }
        return maxStreak;
    }
}
