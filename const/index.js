export const DOMAIN = 'https://eurekayamauchi.github.io'
export const BASE_URL = 'https://eurekayamauchi.github.io/design_posts'
export const GENRE_LIST = [
    {
        name: 'Home',
        url : `${DOMAIN}`
    },
    {
        name: 'AI',
        url : `${DOMAIN}/ai_posts`
    },
    {
        name: 'デザイン',
        url : `${DOMAIN}/design_posts`
    },
    {
        name: '時間管理',
        url : `${DOMAIN}/time`
    },
    {
        name: 'Book',
        url : `${DOMAIN}/books`
    },
    {
        name: 'Movies',
        url : `${DOMAIN}/movies`
    },
    {
        name: 'Technology',
        url : `${DOMAIN}/tech`
    }
]

export const AD_CLIENT_ID = process.env.NEXT_PUBLIC_AD_CLIENT_ID

export const serviceName = 'AI'
