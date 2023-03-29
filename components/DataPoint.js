export class DataPoint {
    constructor(timestamp, value, cost, googleData, redditData, twitterData) {
        this.timestamp = timestamp;
        this.value = value;
        this.cost = cost;
        this.googleData = googleData;
        this.redditData = redditData;
        this.twitterData = twitterData;
    }
}