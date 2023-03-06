# Functions for collecting time-series mention data across social media platform APIs.

from datetime import datetime, timedelta
from pmaw import PushshiftAPI

# Constants
time_filter_map  = {
    'hour': {
        'H': 1,
        'D': 24,
        'W': 168,
        'M': 720,
        'Y': 8760
    },
    'day': {
        'D': 1,
        'W': 7,
        'M': 30,
        'Y': 365
    },
    'week': {
        'W': 1,
        'M': 4,
        'Y': 52
    }
}

frequency_for_mention_totals_map  = {
    'H': 'hour',
    'D': 'day' ,
    'W': 'week',
    'M': 'month'
}


api = PushshiftAPI()

# Launchpoint for mention data querying across Reddit, Google, and Twitter APIs. 
# Reddit:
#   Uses PMAW wrapper around Pushshift API. Aggregations are done manually today due to Pushshift aggregation outage and 100-result limit on search queries.
# Support 1H, 1D, 1W, 1M, 3M, 1Y, 5Y time filters and "hour", "day", "week", and "month" frequencies.
def get_mention_count(stock, service, time_filter, frequency, testing=False):
    if service == "Reddit":
        # Replace with mention count = [data vector] with desired testing data
        mention_count = []
        if not testing:
            # Time unit conversions for mention query parameters
            base = datetime.today() 
            time_coeff = int(time_filter[0])
            time_unit = time_filter[1]
            time_range = 0
            if frequency == "month":
                if time_unit == "Y":
                    time_range = time_coeff * 12
                date_list = [int((base - timedelta(days=x*30)).timestamp()) for x in range(time_range)]
            else:
                time_range = time_coeff * time_filter_map[frequency][time_unit]
                if frequency == "hour":
                    date_list = [int((base - timedelta(hours=x)).timestamp()) for x in range(time_range + 1)]
                if frequency == "day":
                    date_list = [int((base - timedelta(days=x)).timestamp()) for x in range(time_range + 1)]
                if frequency == "week":
                    date_list = [int((base - timedelta(weeks=x)).timestamp()) for x in range(time_range + 1)]
            date_list.reverse()
            print(date_list)
            # PMAW query for mention count across all subreddit comments from "since" time to "until" time.
            for i in range(len(date_list) - 1):
                mention_count.append(len(api.search_comments(q=stock, since=date_list[i], until=date_list[i + 1])))
    return mention_count

# Get top mentioned stock name for a given time range.
def get_top_mentioned_stock(stocks, service, time_filter):
    best_mention_count = 0
    best_stock = ""
    frequency = frequency_for_mention_totals_map[time_filter[1]]
    print(frequency)
    for stock in stocks:
        mention_count = sum(get_mention_count(stock, service, time_filter, frequency))
        if mention_count > best_mention_count:
            best_mention_count = mention_count 
            best_stock = stock
    return best_stock

print(get_mention_count("GOOGL", "Reddit", "1W", "day"))
print(get_top_mentioned_stock("AAPL, GOOGL, ABNB", "Reddit", "1W"))
