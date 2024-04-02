const fs = require('fs');
const path = require('path');

const sendCountryCode = (req, res) => {
  try {
    // path.join
    const filePath = path.join(__dirname, '..', 'controller', 'countrycode', 'CountryCode.json');
    // console.log(filePath)
    if (!fs.existsSync(filePath)) {
      throw new Error('countryCode.json not found');
    }

    const jsonData = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(jsonData);
    res.json(data);

  } catch (error) {
    console.error('Error sending countryCode.json:', error);
    res.status(500).json({ message: 'Error sending countryCode.json' });
  }
};

module.exports = { sendCountryCode };