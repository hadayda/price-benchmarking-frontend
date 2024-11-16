import API from "../api";

export async function uploadUserRates(file) {
    const response = await API.post('benchmarking/upload-user-rates/', {file});
    return response.data;
}

export function getUserPotentialSavings() {
    return API.get('benchmarking/user-potential-savings/')
}