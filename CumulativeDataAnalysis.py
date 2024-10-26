import pandas as pd
import datetime as dt

class Cummulative_Data_Analysis:
    def __init__(self, mean, num_days, median, std, maxim, minim):
        self.mean = mean
        self.num_days = num_days
        self.median = median
        self.std = std
        self.maxim = maxim
        self.minim = minim

    def get_mean(self):
        return self.mean

    def get_num_days(self):
        return self.num_days

    def get_median(self):
        return self.median

    def get_std(self):
        return self.std

    def get_maxim(self):
        return self.maxim

    def get_minim(self):
        return self.minim

    def set_mean(self, mean):
        self.mean = mean

    def set_num_days(self, num_days):
        self.num_days = num_days

    def set_median(self, median):
        self.median = median

    def set_std(self, std):
        self.std = std

    def set_maxim(self, maxim):
        self.maxim = maxim

    def set_minim(self, minim):
        self.minim = minim

    def analyze_data(self, past_data_file):
        df = pd.read_csv('data.csv')
        self.set_mean(df.mean(axis=1))
        self.set_num_days(df.shape[0])
        self.set_median(df.median(axis=1))
        self.set_std(df.std(axis=1))
        self.set_maxim(df.max(axis=1))
        self.set_minim(df.min(axis=1))

    def update_data(self, date_input, time_input, tasks_completed_input):
        df = pd.read_csv('data.csv')
        new_entry = pd.DataFrame({'Date': [date_input],'Time': [time_input],'Tasks Completed': [tasks_completed]})
        df = pd.concat([df, new_entry], ignore_index=True)
        df.to_csv('data.csv', index=False)
      
