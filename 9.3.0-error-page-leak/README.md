## 9.3.0-error-page-leak
Frequent access to page throwing error slows down server response time and causing leak issue.

* Reproduced for version [9.3.0](https://nextjs.org/blog/next-9-3)
* Not reproduced for version [8.1.0](https://nextjs.org/blog/next-8-1)
* Spectrum [chat](https://spectrum.chat/next-js/general/error-page-memory-leak~2e7c284a-1d29-4354-866c-ada0b2a9e847)
* Github [issue](https://github.com/zeit/next.js/issues/11526)

**Update:** fixed in version [9.3.5](https://github.com/zeit/next.js/releases/tag/v9.3.5)

#### User flow
1. User accessing the page rendered on server
2. Server resolve non-static properties from the API
3. Some error on the server happening, e.g wrong request, internal server error, ...
4. Error page being returned to the user

#### Steps to reproduce
First, run the server
```bash
npm install
npm run build
npm run start
```

Before checks:
- open [http://localhost:3000](http://localhost:3000) with your browser and check response time
- of profile CPU for [http://localhost:3000](http://localhost:3000) using [NodeJS Debug](https://nodejs.org/en/docs/guides/debugging-getting-started/)


Then run load test against error page using [Apache benchmark](http://httpd.apache.org/docs/2.4/programs/ab.html) or any other tool of your choice
```
ab -n 100000 -c 50 http://localhost:3000/
```

After checks:
- open [http://localhost:3000](http://localhost:3000) with your browser and check response time
- of profile CPU for [http://localhost:3000](http://localhost:3000) using [NodeJS Debug](https://nodejs.org/en/docs/guides/debugging-getting-started/)

#### Results
With time server gets slower and slower, also with the long running load test memory goes crazy 
