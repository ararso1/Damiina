import pandas as pd

# Load the processed data
file_path = "processed_users.csv"  # Replace with your file path
data = pd.read_csv(file_path)

# Calculate the chunk size
num_parts = 4
chunk_size = len(data) // num_parts

# Split the data into parts
for i in range(num_parts):
    start_index = i * chunk_size
    end_index = (i + 1) * chunk_size if i != num_parts - 1 else len(data)  # Include remainder in the last chunk
    part = data.iloc[start_index:end_index]
    
    # Save each part to a new CSV file
    output_file = f"processed_users_part_{i + 1}.csv"
    part.to_csv(output_file, index=False)
    print(f"Saved part {i + 1} to {output_file}")

print("Splitting complete!")
