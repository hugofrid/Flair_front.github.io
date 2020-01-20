import axios from 'axios';

async function getApiSet(x) {

    const data = await axios.get(
      'http://api.gedeon.im/ads?key=xg4oQJjIMtzetP02EbcIiv7FrVT2g7en&transaction=sell&localization=' + x
    ).then(result => {
      return result.data
      });

     // console.log(data.results);
      return (data.results);
}
export default getApiSet;

//NE PAS SUPPRIMER
/**async function getApiSet(a,b,c,d,e,f,g) {

  if(b==null){
    b="house,flat";
  }
  if(c==null){
    c=1;
  }
  if(d==null){
    d=10000000;
  }
  if(e==null){
    e=1;
  }
  if(f==null){
    f=100000;
  }
  if(g==null){
    g="1,2,3,4,5";
  }

  const data = await axios.get(
    'http://api.gedeon.im/ads?key=xg4oQJjIMtzetP02EbcIiv7FrVT2g7en&transaction=sell&localization=' + a + '&type=' + b + '&min_price=' + c + '&max_price=' + d + '&min_surface=' + e + '&max_surface=' + f + '&rooms=' + g
  ).then(result => {
    return result.data
    });

    console.log(data.results);
    return (data.results);
}
export default getApiSet;*/