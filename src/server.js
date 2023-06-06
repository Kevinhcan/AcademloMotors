require('dotenv').config();
const app = require('./app');
const PORT = process.env.PORT;
const { db } = require('./database/config');


db.authenticate()
  .then(() => {
    console.log('Database authenticated ✅');
    return db.sync();
  })
  .then(() => {
    console.log('Database synced ✅');
   
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}! 🥳`); 
    });
  })
  .catch((err) => {
    console.log(err);
  });
