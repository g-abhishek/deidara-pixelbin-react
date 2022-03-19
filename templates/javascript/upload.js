import axios from "axios";

async function signedUpload(url, form) {
    return axios.post(url, form)
        .then((res) => {
            Promise.resolve(res)
        })
        .catch((err) => {
            return Promise.reject(err);
        })
}

async function upload(file, url, fields) {
    // get presigned POST Url for upload
    const form = new FormData();
    Object.entries(fields).forEach(([k, v]) => {
        form.append(k, v);
    });
    form.append("file", file);
    return signedUpload(url, form);
}

export {
    upload,
}