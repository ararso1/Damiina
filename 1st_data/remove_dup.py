# import pandas as pd

# df = pd.read_csv('C:\\Users\\araso\\Documents\\React\\damiina\\1st_data\\first_data.csv')

# print(df.columns)
import pandas as pd

# Load the CSV file
df = pd.read_csv('C:\\Users\\araso\\Documents\\React\\damiina\\1st_data\\first_data.csv')

# Remove duplicates based on the 'Email' column
df_unique = df.drop_duplicates(subset='Email', keep='first')

# Save the cleaned DataFrame back to a new CSV file
df_unique.to_csv('first_data_unique.csv', index=False)

print(f"Duplicates removed. The unique data has been saved to 'first_data_unique.csv'.")
