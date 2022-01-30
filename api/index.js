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
    const countries = await axios.get("https://restcountries.com/v3.1/all");
    const { data } = countries;
    
    data.map(async (c) => {
      await Country.findOrCreate({
    
        where: { name: c.name.common },
        defaults: {
            id: c.cca3,  
            name: c.name.common,  
            imgbandera: c.flags.png,
            continents: c.region,
            capital: c.capital ? c.capital[0] : 'no hay capital',
          subregion: c.subregion ? c.subregion : 'no hay subregion',
            area: c.area,
            population: c.population
          }
        })
        return data;
      })
    } catch (err){ 
        console.log(err);
      }
    }
  

dataCountries();


// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});