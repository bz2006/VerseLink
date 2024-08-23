import axios from 'axios';

export default function gindic(input, callback) {
    const params = new URLSearchParams({
        text: input,
        itc: "ml-t-i0-und", // Language code for Malayalam
        num: 5,             // Number of suggestions to return
        cp: 0,              // Starting character index
        cs: 1,              // Conversion scheme
        ie: "utf-8",        // Input encoding
        oe: "utf-8",        // Output encoding
    });

    const url = `https://inputtools.google.com/request`;

    axios.post(url, params.toString(), {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    })
    .then((response) => {
        const words = response.data;
        callback(words);
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });
}
