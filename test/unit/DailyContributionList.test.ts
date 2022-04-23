import { beforeEach, describe, it } from 'mocha';
import { expect } from 'chai';
import sinon, { SinonSandbox } from 'sinon';
import twoDayStreak from './../mocks/TwoDaysStreak.json';
import threeDaysStreakIncludingToday from './../mocks/ThreeDaysStreakIncludingToday.json';
import fourDaysStreakWithMissingDay from './../mocks/FourDaysStreakWithMissingDay.json';
import sevenDaysMaxStreak from './../mocks/SevenDaysMaxStreak.json';
import threeDaysStreakYesterdayTodayTomorrow from './../mocks/ThreeDaysStreak-Yesterday-Today-Tomorrow.json';
import twoDaysStreakYesterdayTodayNoTomorrow from './../mocks/TwoDaysStreak-Yesterday-Today-NoTomorrow.json';
import oneDayStreakYesterdayNoTodayTomorrow from './../mocks/OneDayStreak-Yesterday-NoToday-Tomorrow.json';
import oneDayStreakYesterdayNoTodayNoTomorrow from './../mocks/OneDayStreak-Yesterday-NoToday-NoTomorrow.json';
import twoDaysStreakNoYesterdayTodayTomorrow from './../mocks/TwoDaysStreak-NoYesterday-Today-Tomorrow.json';
import oneDayStreakNoYesterdayTodayNoTomorrow from './../mocks/OneDayStreak-NoYesterday-Today-NoTomorrow.json';
import oneDayStreakNoYesterdayNoTodayTomorrow from './../mocks/OneDayStreak-NoYesterday-NoToday-Tomorrow.json';
import DailyContributionList from '../../src/streak/domain/entity/DailyContributionList';

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

    it('should get the current streak given a list from an advanced timezone with contributions yesterday, today and tomorrow', () => {
        const dailyContributions = threeDaysStreakYesterdayTodayTomorrow.list.map(contribution => (
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

    it('should get the current streak given a list from an advanced timezone with contributions yesterday and today, but no one tomorrow', () => {
        const dailyContributions = twoDaysStreakYesterdayTodayNoTomorrow.list.map(contribution => (
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

    it('should get the current streak given a list from an advanced timezone with contributions yesterday and tomorrow, but no one today', () => {
        const dailyContributions = oneDayStreakYesterdayNoTodayTomorrow.list.map(contribution => (
            {
                date: new Date(contribution.date), 
                totalContributions: parseInt(contribution.totalContributions)
            }
        ));
        const dailyContributionList = new DailyContributionList(dailyContributions);
        const now = new Date(2022, 3, 1);
        sandbox.useFakeTimers(now.getTime());
        const expected = 1;
        const result = dailyContributionList.currentStreak;
        expect(result).to.be.deep.equal(expected);
    });
    
    it('should get the current streak given a list from an advanced timezone with contributions yesterday, but no one today and tomorrow', () => {
        const dailyContributions = oneDayStreakYesterdayNoTodayNoTomorrow.list.map(contribution => (
            {
                date: new Date(contribution.date), 
                totalContributions: parseInt(contribution.totalContributions)
            }
        ));
        const dailyContributionList = new DailyContributionList(dailyContributions);
        const now = new Date(2022, 3, 1);
        sandbox.useFakeTimers(now.getTime());
        const expected = 1;
        const result = dailyContributionList.currentStreak;
        expect(result).to.be.deep.equal(expected);
    });
    
    it('should get the current streak given a list from an advanced timezone with contributions today and tomorrow, but no one yesterday', () => {
        const dailyContributions = twoDaysStreakNoYesterdayTodayTomorrow.list.map(contribution => (
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
    
    it('should get the current streak given a list from an advanced timezone with contributions today, but no one yesterday and tomorrow', () => {
        const dailyContributions = oneDayStreakNoYesterdayTodayNoTomorrow.list.map(contribution => (
            {
                date: new Date(contribution.date), 
                totalContributions: parseInt(contribution.totalContributions)
            }
        ));
        const dailyContributionList = new DailyContributionList(dailyContributions);
        const now = new Date(2022, 3, 1);
        sandbox.useFakeTimers(now.getTime());
        const expected = 1;
        const result = dailyContributionList.currentStreak;
        expect(result).to.be.deep.equal(expected);
    });
    
    it('should get the current streak given a list from an advanced timezone with contributions tomorrow, but no one yesterday and today', () => {
        const dailyContributions = oneDayStreakNoYesterdayNoTodayTomorrow.list.map(contribution => (
            {
                date: new Date(contribution.date), 
                totalContributions: parseInt(contribution.totalContributions)
            }
        ));
        const dailyContributionList = new DailyContributionList(dailyContributions);
        const now = new Date(2022, 3, 1);
        sandbox.useFakeTimers(now.getTime());
        const expected = 1;
        const result = dailyContributionList.currentStreak;
        expect(result).to.be.deep.equal(expected);
    });
});
