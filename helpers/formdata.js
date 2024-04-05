const formdata_obj = (req,res,next) => {

    const formData = {}; // Object to store the form data

    // Iterate over the fields in the form data

    for (const [key, value] of Object.entries(req.body)) {

      const keys = key.split('.'); // Split the key into nested property keys

      const lastKey = keys.pop(); // Extract the last key

      // Build the nested object structure

      let nestedObject = formData;

      keys.forEach((nestedKey) => {

        if (!nestedObject[nestedKey]) {

          nestedObject[nestedKey] = {};

        }

        nestedObject = nestedObject[nestedKey];

      });

      // Assign the value to the last key in the nested object

      nestedObject[lastKey] = value;

    }

 

    req.body = formData

   next()

}

 

module.exports = formdata_obj