import {fetchAPI} from "@/app/[lang]/utils/fetch-api";

export async function fetchMembers(start: number, limit: number){
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/members`;
    const urlParamsObject = {
        sort: { createdAt: "desc" },
        populate: {
            picture: { fields: ["url"] },
        },
        pagination: {
            start: start,
            limit: limit,
        },
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const responseData = await fetchAPI(path, urlParamsObject, options);
    return responseData;
}
