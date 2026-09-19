**My learnings from this project:**
#
**Aws SDK client S3**

I get know about client s3 of AWS SDK in this project, when I need to use it for the uploading songs, profile avators, and song cover pics.

**useRef React Hook**

How to use the useRef() built in hook of React for getting advantages from the reference of html tags.
Exmaple given in UploadSong.jsx coponent

**Usage of Link, NavLink, useNavigate, Navigate**

I understood the use cases of those 4 different navigating React tools

**Jwt Tokens**

How to make the jwt secure using different parameters specially like expiresIn.
I understood that how to set different parameters while saving any cookie.

**_CSS variables Inheritance_**

Regular CSS properties (background-color, padding) only apply to the element they're set on — they don't cascade to children unless the property is one of the specific inheritable ones (like color, font-family).
Custom properties (--anything) are always inherited, on every element, whether or not that element "does" anything with them. They're pure data flowing down the tree, invisible until something (var(--color-primary)) actually asks for the value.
So when ever the parent have for example dark class then all the css variables' definitions(colors) will be changed respectively, now all the childs can use the updated css variable values.

**_Sharp.js for image compressors_**

Sharp's literals allow us to change the uploaded images' qulaity(optimized) for better performance.

```javascript
const customisedSongCoverBuffer = await sharp(songCoverFile.buffer)
  .resize(450)
  .webp({ quality: 80 })
  .toBuffer();
//customisedSongCoverBuffer is a  buffer that we can use .
```

**_bullMQ---> queries , jobs and workers_**

For doing the tasks that is not compulsory for the desired response towards the frontend we make queues and we put such tasks as jobs with unique names inside that queues, and at last we have worker(s) for doing the task that are queued in the queues.

For this purpose we need to import bullMQ's , and redis's libraries.

**_TenStack(react query)_**

#

TenStack(react query) allow us to get rid of unwanted fetches,let's explain the process going on under the hood.

usually we use useEffect() for fetching the external data from any resource(e.g: backend or server), but useeffect() triggers everytime we mount the component containing useEffect() e.g: navigating or simply changing the website pages.

tanStack query allow us to fetch the data once then set the time which tell that upto this time never re-fetch() the same data again and suppose the earlier fetched data as fresh. That time is called staleTime, if staleTime is 10mins then tanStack(data fetcher) will not fetch your data again upto coming 10 mins. By default the staleTime is 0s it means everytime the component mounts the data will be fetched again.

```javascript
  const {latestSongs}= useQuery({
    queryKey: ["new-songs"],
    queryFn: songsServis.newSongs,
    staleTime: 2*60*1000
  })
  
   ```