export let BASE_URL
export const TIME_OUT = 10000

// 区分开发环境与生产环境
// 方法一:
// if (import.meta.env.DEV) {
//   BASE_URL = 'http://codercba.com:8000/dev'
// } else if (import.meta.env.PROD) {
//   BASE_URL = 'http://codercba.com:8000/prod'
// }
// 方法二:
if (import.meta.env.VITE_MODE === 'DEV') {
  BASE_URL = 'http://codercba.com:8000/dev'
} else if (import.meta.env.VITE_MODE === 'PROD') {
  BASE_URL = 'http://codercba.com:8000/prod'
}
