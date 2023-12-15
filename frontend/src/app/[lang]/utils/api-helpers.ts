interface MediaParams {
    width?: number;
    height?: number;
    fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
}

export function getStrapiURL(path = '') {
    return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'}${path}`;
}

export function getStrapiMedia(url: string | null) {
    if (url == null) {
        return null;
    }

    // Return the full URL if the media is hosted on an external provider
    if (url.startsWith('http') || url.startsWith('//')) {
        return url;
    }

    // Otherwise prepend the URL path with the Strapi URL
    return `${getStrapiURL()}${url}`;
}

export function getStrapiMediaScaled(url: string, params: MediaParams = {}): string {
    const imageUrl = url.startsWith('/') ? process.env.NEXT_PUBLIC_STRAPI_API_URL + url : url;

    if (params.width || params.height) {
        return `${imageUrl}?${
            params.width ? `w=${params.width}` : ''
        }${params.width && params.height ? `&` : ''}${
            params.height ? `h=${params.height}` : ''
        }${params.fit ? `&fit=${params.fit}` : ''}`;
    }

    return imageUrl;
}

export function formatDate(dateString: string) {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// ADDS DELAY TO SIMULATE SLOW API REMOVE FOR PRODUCTION
export const delay = (time: number) => new Promise((resolve) => setTimeout(() => resolve(1), time));
