// import { load as cheerio } from 'cheerio'

// // NOTE this is used to speed up reload in local dev
// let cachedUsedByCount: number | undefined

// // const getUsedByCount = async () => {
// //   // We're scraping the GitHub website here instead of using the API since I don't want to deal with rate limits and API tokens 🤷‍♂️
// //   const gitHubPage = await fetch('https://github.com/contentlayerdev/contentlayer/', { cache: 'no-store' }).then((_) =>
// //     _.text(),
// //   )
// //   const $ = cheerio(gitHubPage)

// //   const usedByCountStr = $('#repo-content-pjax-container .Link--primary.no-underline')
// //     .filter((_, el) => $(el).text().includes('Used by'))
// //     .first()
// //     .find('.Counter')
// //     .text()

// //   const usedByCount = parseInt(usedByCountStr, 10)

// //   if (Number.isNaN(usedByCount)) {
// //     throw new Error(`Could not parse used by count: ${usedByCountStr}`)
// //   }

// //   cachedUsedByCount = usedByCount

// //   return usedByCount
// // }

// export const getUsedByCountWithFallback = async () => {
//   return 300
//   // if (cachedUsedByCount) {
//   //   return cachedUsedByCount
//   // }

//   // try {
//   //   // const usedByCount = await retry(getUsedByCount, 5)

//   //   // cachedUsedByCount = usedByCount

//   //   return 888
//   // } catch (e) {
//   //   console.log(`Error occurred while fetching used by count: ${e}`)

//   //   // Hardcode last known number as fallback
//   //   return 300
//   // }
// }

// const retry = async <T>(fn: () => Promise<T>, maxRetryCount: number): Promise<T> => {
//   let retryCount = 0

//   // eslint-disable-next-line no-constant-condition
//   while (true) {
//     try {
//       if (retryCount > 0) {
//         console.log(`Retrying ${retryCount} / ${maxRetryCount}`)
//       }

//       return await fn()
//     } catch (e) {
//       console.log(`Error occurred: ${e}`)

//       retryCount++

//       if (retryCount > maxRetryCount) {
//         throw e
//       } else {
//         await new Promise((resolve) => setTimeout(resolve, 200))
//       }
//     }
//   }
// }
