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
        print("Available columns:", df.columns)
        # self.mean = df['Tasks Completed'].mean()
        # self.num_days = df.shape[0]
        # self.median = df['Tasks Completed'].median()
        # self.std = df['Tasks Completed'].std()
        # self.maxim = df['Tasks Completed'].max()
        # self.minim = df['Tasks Completed'].min()

    def update_data(self):
        # Load existing data and new data
        df = pd.read_json(self.past_data_file)
        new_entry = pd.read_json(self.new_data_file)

        if not new_entry.empty:
            # Iterate through new entries
            for _, new_row in new_entry.iterrows():
                date = new_row['Date']
                # Check if the date already exists in the DataFrame
                if date in df['Date'].values:
                    # Update the existing row with new_row data
                    df.loc[df['Date'] == date, new_row.index] = new_row
                else:
                    # Append new row
                    df = pd.concat([df, pd.DataFrame([new_row])], ignore_index=True)

            # Save the updated DataFrame back to the JSON file
            df.to_json(self.past_data_file, orient='records', indent=4)  # Use indent for pretty formatting

    def get_statistics(self):
        return "mean: " + self.mean + "\nnum_days: " + self.num_days + "\nmedian: " + self.median + "\nstd: " + self.std + "\nmaxim: " + self.maxim + "\nminim: " + self.minim

analysis = Cumulative_Data_Analysis('old_data.json', 'new_data.json')
analysis.update_data()
analysis.analyze_data()
# print(analysis.get_statistics())