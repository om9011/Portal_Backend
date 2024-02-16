const express = require('express');
const fs = require('fs');
const app = express();
const port = 5000;

app.use(express.json());

app.post('/saveUserData', (req, res) => {
    try {
        const data = req.body;
        fs.writeFileSync('userdata.txt', JSON.stringify(data, null, 2));
        console.log("File 'userdata.txt' created successfully");

        res.status(200).json({ message: 'Data saved to a text file successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
