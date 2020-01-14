import axios from 'axios';

async function getApiSet(x) {

    const data = await axios.get(
      'http://api.gedeon.im/ads?key=xg4oQJjIMtzetP02EbcIiv7FrVT2g7en&localization=' + x
    ).then(result => {
      return result.data
      });

      console.log(data.results);
      return (data.results);
}
export default getApiSet;