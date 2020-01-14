import axios from 'axios';

async function getApiSet(x) {

    const result = await axios(
        'http://api.gedeon.im/ads?key=xg4oQJjIMtzetP02EbcIiv7FrVT2g7en&localization='+x,
      );

      console.log(result.data.results[0].id);
      return (result.data);
}
export default getApiSet;