

import Transformation from '../transformation.js';
    


/**
* @param{integer} maximumLabels

*/

export const detectLabels = function({
    maximumLabels = 5
}) {
    return new Transformation([`googleVis.detectLabels(l:${ maximumLabels })`]);
}


export default {

    detectLabels

}
