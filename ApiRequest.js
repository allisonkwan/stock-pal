export function ApiRequest({ stockTicker, timespan, from, to }) {
    //var api = new ApiRequest(data);
    let apiRequest = new XMLHttpRequest();
    console.log('hello')
    let polygon_api_key = "oHBzULapO1eRflaBEVlNkpED4qs9pFd0"
    let polygon_rest_baseurl = "https://api.polygon.io/v2/"
    let request_url = polygon_rest_baseurl+'aggs/ticker/'+stockTicker+'/range/1/'+timespan+'/'+from+'/'+to+'?adjusted=true&sort=asc&limit=120&apiKey='+polygon_api_key
    console.log(request_url)
    apiRequest.open("GET", request_url)
    apiRequest.send();
    apiRequest.onload = function() {
        data = JSON.parse(this.response)
        console.log(data)
    }
        
    
    return;
}

    
