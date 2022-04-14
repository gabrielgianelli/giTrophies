import { describe, beforeEach, it } from 'mocha';
import { expect } from 'chai';
import profile from '../mocks/GithubProfileBody.json';
import profileDailyContributionList from '../mocks/GithubProfileDailyContributionList.json';
import WebScrapper from '../../src/streak/WebScrapper';
import WebScrapperCheerioAdapter from '../../src/streak/WebScrapperCheerioAdapter';

describe('Web Scrapper Suite Tests', () => {
    let webScrapper: WebScrapper;

    beforeEach(() =>{
        webScrapper = new WebScrapperCheerioAdapter();
    });

    it('should get a list of daily contributions from the body of html of github profile', () => {
        const expected = profileDailyContributionList.map(contribution => (
            {
                date: new Date(contribution.date),
                totalContributions: contribution.totalContributions
            }
        ));
        const result = webScrapper.dailyContributions(profile.body);
        expect(result).to.be.deep.equal(expected);
    });
});
