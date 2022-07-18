import { fetchWrapper } from "./fetchWrapper";

export function randomName() {
    fetchWrapper(`http://names.drycodes.com/1`, {
        method : "GET",
        mode: 'cors',
    }).then( async function (response) {
            if (response.ok) {
                return await response.json();
            } else {
                return Promise.reject(response);
            }
    })
}