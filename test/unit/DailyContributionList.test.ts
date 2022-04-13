import { beforeEach, describe, it } from 'mocha';
import { expect } from 'chai';
import sinon, { SinonSandbox } from 'sinon';

import twoDayStreak from './../mocks/TwoDaysStreak.json';
import threeDaysStreakIncludingToday from './../mocks/ThreeDaysStreakIncludingToday.json';
import fourDaysStreakWithMissingDay from './../mocks/FourDaysStreakWithMissingDay.json';
import sevenDaysMaxStreak from './../mocks/SevenDaysMaxStreak.json';
import DailyContributionList from '../../src/streak/entity/DailyContributionList';

describe('Streak Suite Tests', () => {
    let sandbox: SinonSandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should get contribution streak, given an ordered list of objects containing date and number of contributions', () => {
        const dailyContributions = twoDayStreak.list.map(contribution => (
            {
                date: new Date(contribution.date), 
                totalContributions: parseInt(contribution.totalContributions)
            }
        ));
        const dailyContributionList = new DailyContributionList(dailyContributions);
        const now = new Date(2022, 3, 1);
        sandbox.useFakeTimers(now.getTime());
        const expected = 2;
        const result = dailyContributionList.currentStreak;
        expect(result).to.be.deep.equal(expected);
    });

    it('should return 0 to current streak given an empty list', () => {
        const dailyContributionList = new DailyContributionList([]);
        const now = new Date(2022, 3, 1);
        sandbox.useFakeTimers(now.getTime());
        const expected = 0;
        const result = dailyContributionList.currentStreak;
        expect(result).to.be.deep.equal(expected);
    });

    it('should get contribution streak including today if the current day already have contributions', () => {
        const dailyContributions = threeDaysStreakIncludingToday.list.map(contribution => (
            {
                date: new Date(contribution.date), 
                totalContributions: parseInt(contribution.totalContributions)
            }
        ));
        const dailyContributionList = new DailyContributionList(dailyContributions);
        const now = new Date(2022, 3, 1);
        sandbox.useFakeTimers(now.getTime());
        const expected = 3;
        const result = dailyContributionList.currentStreak;
        expect(result).to.be.deep.equal(expected);
    });

    it('should break the current streak when a day of the sequence is missing', () => {
        const dailyContributions = fourDaysStreakWithMissingDay.list.map(contribution => (
            {
                date: new Date(contribution.date), 
                totalContributions: parseInt(contribution.totalContributions)
            }
        ));
        const dailyContributionList = new DailyContributionList(dailyContributions);
        const now = new Date(2022, 3, 1);
        sandbox.useFakeTimers(now.getTime());
        const expected = 4;
        const result = dailyContributionList.currentStreak;
        expect(result).to.be.deep.equal(expected);
    });

    it('should get the max contribution streak, given an ordered list of objects containing date and number of contributions', () => {
        const dailyContributions = sevenDaysMaxStreak.list.map(contribution => (
            {
                date: new Date(contribution.date),
                totalContributions: parseInt(contribution.totalContributions)
            }
        ));
        const dailyContributionList = new DailyContributionList(dailyContributions);
        const expected = 7;
        const result = dailyContributionList.maxStreak;
        expect(result).to.be.deep.equal(expected);
    });
});
