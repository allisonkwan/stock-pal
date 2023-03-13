import requests
import pandas as pd

from datetime import date, datetime, timedelta
import time

def pull_data():
    polygon_api_key = "oHBzULapO1eRflaBEVlNkpED4qs9pFd0"
    polygon_rest_baseurl = "https://api.polygon.io/v2/"

    #symbol = "X:" + symbol

    multiplier = 1
    timespan = "minute"

    limit = 40000

    request_url = f"{polygon_rest_baseurl}aggs/ticker/AAPL/range/1/month/2022-01-09/2023-01-09?adjusted=true&sort=asc&limit=120&apiKey={polygon_api_key}"
    #ticker/AAPL/range/1/oHBzULapO1eRflaBEVlNkpED4qs9pFd0
    data = requests.get(request_url).json()
    for thing in data['results']:
        print(thing['vw'])
    #print(data['results']["vw"])
pull_data()

