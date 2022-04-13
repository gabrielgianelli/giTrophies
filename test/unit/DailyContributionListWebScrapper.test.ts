import { describe, it } from 'mocha';
import { expect } from 'chai';
import profile from '../mocks/GithubProfileBody.json';
import profileDailyContributionList from '../mocks/GithubProfileDailyContributionList.json';
import DailyContributionListWebScrapper from '../../src/streak/DailyContributionListWebScrapper';

describe('Web Scrapper Suite Tests', () => {
    it('should get a list of daily contributions from the body of html of github profile', () => {
        const expected = profileDailyContributionList.map(contribution => (
            {
                date: new Date(contribution.date),
                totalContributions: contribution.totalContributions
            }
        ));
        const result = DailyContributionListWebScrapper.execute(profile.body);
        console.log(expected)
        expect(result).to.be.deep.equal(expected);
    });
});
