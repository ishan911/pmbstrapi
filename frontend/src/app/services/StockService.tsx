import {fetchAPI} from "@/app/[lang]/utils/fetch-api";

export async function fetchStocks(){
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/stocks`;
    const urlParamsObject = {
        sort: { createdAt: "desc" },
        populate: {
            cover: { fields: ["url"] },
            // category: { populate: "*" },
            authorsBio: {
                populate: "*",
            },
        },
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const responseData = await fetchAPI(path, urlParamsObject, options);
    return responseData;
}
