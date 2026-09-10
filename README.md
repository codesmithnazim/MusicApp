My learnings from this project:

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


**CSS variables Inheritance**

Regular CSS properties (background-color, padding) only apply to the element they're set on — they don't cascade to children unless the property is one of the specific inheritable ones (like color, font-family).
Custom properties (--anything) are always inherited, on every element, whether or not that element "does" anything with them. They're pure data flowing down the tree, invisible until something (var(--color-primary)) actually asks for the value.
So when ever the parent have for example dark class then all the css variables' definitions(colors) will be changed respectively, now all the childs can use the updated css variable values.