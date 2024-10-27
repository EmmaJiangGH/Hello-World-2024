import pandas as pd

class Cumulative_Data_Analysis:
    def __init__(self, past_data_file, new_data_file):
        self.mean = None
        self.num_days = None
        self.median = None
        self.std = None
        self.maxim = None
        self.minim = None
        self.past_data_file = past_data_file
        self.new_data_file = new_data_file

    def analyze_data(self):
        df = pd.read_json(self.past_data_file)
        self.mean = df['minutes_spent_studying'].mean(skipna=False)
        self.num_days = df['tasks_completed'].shape[0]
        self.median = df['minutes_spent_studying'].median(skipna=False)
        self.std = df['minutes_spent_studying'].std(skipna=False)
        self.maxim = df['minutes_spent_studying'].max(skipna=False)
        self.minim = df['minutes_spent_studying'].min(skipna=False)

    def update_data(self):
        df = pd.read_json(self.past_data_file)
        print(df.to_string())
        new_entry = pd.read_json(self.new_data_file)
        if not new_entry.empty:
            df = pd.concat([df, new_entry], ignore_index=True)
            df.to_json(self.past_data_file, orient='records', indent=4)  # Use indent for pretty formatting

    def get_statistics(self):
        return (
            f"mean: {self.mean}\n"
            f"num_days: {self.num_days}\n"
            f"median: {self.median}\n"
            f"std: {self.std}\n"
            f"maxim: {self.maxim}\n"
            f"minim: {self.minim}"
        )


analysis = Cumulative_Data_Analysis('old_data.json', 'new_data.json')
analysis.update_data()
analysis.analyze_data()
print(analysis.get_statistics())
