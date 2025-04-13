# SGPA and CGPA Calculator

## Project Overview

This project is a fully responsive web application designed to help college students calculate their Semester Grade Point Average (SGPA) and Cumulative Grade Point Average (CGPA). The application allows users to input their grades and credits for multiple semesters, calculate their SGPA and CGPA, and convert the CGPA to a percentage. Additionally, users can upload their marksheets in various formats, and the application will extract relevant data to autofill the input fields.

## Features

- **SGPA Calculation**:
  - Users can input the number of subjects for each semester.
  - For each subject, users can enter:
    - The number of credits (numeric input).
    - The grade received (dropdown selection with options: O, E, A, B, C, D, F).
  - The application calculates the SGPA for each semester based on the inputted credits and grades.

- **Input for Multiple Semesters**:
  - Users can input SGPA for multiple semesters.
  - Example inputs:
    - 1st Semester SGPA: 9.22
    - 2nd Semester SGPA: 8.3
  - A button to dynamically add more semesters.

- **CGPA Calculation Logic**:
  - The application calculates the overall CGPA based on the SGPA and total credits for all semesters.
  - CGPA formula: 
    \[
    \text{CGPA} = \frac{\sum (\text{SGPA} \times \text{Credits})}{\sum \text{Credits}}
    \]

- **Percentage Conversion**:
  - An option to convert the calculated CGPA to a percentage.
  - Conversion formula: 
    \[
    \text{Percentage} = \text{CGPA} \times 9.5
    \]
  - The converted percentage is displayed alongside the CGPA.

- **Upload and Extract Marksheets**:
  - Users can upload their marksheets in JPG, PNG, or PDF format.
  - The application scans or extracts fields like credits and grades from the uploaded document.
  - Autofills the extracted data into the input fields for SGPA calculation.

- **User  Experience Enhancements**:
  - Clear instructions and error handling for user inputs.
  - User-friendly display of calculated SGPA, CGPA, and percentage.

- **Responsive Design**:
  - The website is fully responsive and works seamlessly on all devices, including desktops, tablets, and smartphones.

## Technologies Used

- HTML
- CSS
- JavaScript
- [Optional: Any libraries or frameworks used, e.g., jQuery, Bootstrap, etc.]

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/sgpa-cgpa-calculator.git

   
### Customization Tips
- Replace `yourusername` in the clone URL with your actual GitHub username.
- Add any specific libraries or frameworks you used in the "Technologies Used" section.
- Feel free to modify the wording to better match your project's tone and style.
