


function sliceComposedString(str) {
    return str.split(['-']);
}
export function capitalize(str) {
    return sliceComposedString(str).map((elem,index) => (index !== 0 ? " " : '')  + elem.charAt(0).toUpperCase() + elem.slice(1).toLowerCase())
}

