import axios from 'axios';


async function getApiSet(a,b,c,d,e,f) {

  
  if(b==null){
    b=1;
  }
  if(c==null || c==1000000){
    c=10000000;
  }
  if(d==null){
    d=1;
  }
  if(e==null || e==300){
    e=100000;
  }
  if(f==null){
    f="1,2,3,4,5";
  }



  const data = await axios.get(
    'https://api.gedeon.im/ads?key=xg4oQJjIMtzetP02EbcIiv7FrVT2g7en&transaction=sell&type=house,flat&localization=' + a + '&min_price=' + b + '&max_price=' + c + '&min_surface=' + d + '&max_surface=' + e + '&rooms=' + f
  ).then(result => {
    return result.data
    });

    return (data.results);
}
export default getApiSet;