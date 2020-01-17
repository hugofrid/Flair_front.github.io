import axios from 'axios';





async function getDataSet() {
    const filetext = await axios
        .get(process.env.REACT_APP_API_ROUTE + "/datasets")
        .then(result => {
            const stringjson = JSON.stringify(result.data);
            return stringjson;
        });
    return filetext.toString();
}
export default getDataSet;
