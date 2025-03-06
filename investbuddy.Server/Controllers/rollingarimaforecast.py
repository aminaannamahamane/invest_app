import sys
import json
import requests
import pandas as pd
import numpy as np
from statsmodels.tsa.arima.model import ARIMA
from datetime import datetime
from dateutil.relativedelta import relativedelta

# Configuration for Polygon API (update API key as needed)
API_KEY = 'MGi_WdX9ktIi6maLsK_gcGaa7RrObmQf'
DEFAULT_AGGREGATE = 'day'
DEFAULT_TIMES = '1'

def get_forecast(stock, forecast_steps):
    ticker = stock.upper()
    to_date = datetime.today().strftime('%Y-%m-%d')
    from_date = (datetime.today() - relativedelta(years=5)).strftime('%Y-%m-%d')
    
    url = (f'https://api.polygon.io/v2/aggs/ticker/{ticker}/range/{DEFAULT_TIMES}/{DEFAULT_AGGREGATE}/'
           f'{from_date}/{to_date}?adjusted=true&sort=asc&limit=50000000&apiKey={API_KEY}')
    response = requests.get(url)
    if response.status_code != 200:
        return {"error": f"Error fetching data: {response.status_code}"}
    
    data = response.json()
    results = data.get('results', [])
    if not results:
        return {"error": f"No data found for ticker {ticker}"}
    
    df = pd.DataFrame(results)
    df['Date'] = pd.to_datetime(df['t'], unit='ms')
    df.sort_values('Date', inplace=True)
    df.set_index('Date', inplace=True)
    df.rename(columns={'c': 'Close'}, inplace=True)
    
    inferred_freq = pd.infer_freq(df.index)
    if inferred_freq:
        df.index = pd.DatetimeIndex(df.index, freq=inferred_freq)
    else:
        df = df.asfreq('h', method='ffill')
    
    df['LogClose'] = np.log(df['Close'])
    ts = df['LogClose']
    
    try:
        model = ARIMA(ts, order=(0,1,0))
        model_fit = model.fit()
        forecast_log = model_fit.forecast(steps=forecast_steps)
        forecast_values = np.exp(forecast_log)
        forecast_list = forecast_values.tolist()
        return {"stock": ticker, "forecast": forecast_list}
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(json.dumps({"error": "Usage: python forecast.py <stock> <forecast_steps>"}))
        sys.exit(1)
    stock = sys.argv[1]
    try:
        forecast_steps = int(sys.argv[2])
    except ValueError:
        print(json.dumps({"error": "forecast_steps must be an integer"}))
        sys.exit(1)
    
    result = get_forecast(stock, forecast_steps)
    print(json.dumps(result))
