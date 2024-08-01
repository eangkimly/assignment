function printPattern() {
    const rows = 5; // The number of rows in the pattern
    for (let i = 0; i < rows; i++) {
        let line = '';
        for (let j = i; j < rows; j++) {
            line += '*  ';
        }
        console.log(line.trim()); // Print the line and trim any trailing spaces
    }
}

printPattern();