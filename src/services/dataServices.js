import axios from 'axios';
import data from '../datasets/output.js'




async function getDataSet() {
    if (process.env.NODE_ENV === "development") {
        const filetext = await axios
            .get(process.env.REACT_APP_API_ROUTE + "/datasets")
            .then(result => {
                const stringjson = JSON.stringify(result.data);
                return stringjson;
            });
        return filetext.toString();
    } else {
        return JSON.stringify(data);
    }

}
export default getDataSet;
