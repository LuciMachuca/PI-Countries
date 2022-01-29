//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const axios = require('axios');
const { Country } = require('./src/db')

let dataCountries = async () => {
  try {
    const countries = await axios.get(`https://restcountries.com/v3.1/all`);
    countries.data.map(async c => {
      try {
        var countryCreated = await Country.findOrCreate({
          where: {
            id: c.cca3,
            name: c.name.common,
            imgbandera: c.flags.png,
            continents: c.region,
            capital: c.capital ? c.capital[0] : 'no hay capital',
            subregion: c.subregion ? c.subregion : 'no hay subregion',
            area: parseInt(c.area),
            population: parseInt(c.population)
          }
        })
        return countryCreated;
      } catch (err){
        console.log(err);
      }
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

dataCountries();


// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
