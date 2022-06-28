# sandbox
- (codesandbox)[https://gqvkp7.sse.codesandbox.io/]
- (repo)[https://github.com/Hachikoi-the-creator/Twitter-clone-Web3]
- (initial vite)[https://github.com/Hachikoi-Marine/Basic-Moralis-Template.git]
- (vercel deployment)[https://cooler-twitter.vercel.app/] 
  - err : `Uncaught (in promise) TypeError: $.default is not a function`

`Sidebar.jsx`
- fix the styling to make it more "elastic"
- I made the birb icon a link, fix the hover effect on that

`Rightbar.jsx`
- fix the fixed styling as well

`Home.jsx`
- change the color of the TextArea

`Profile`
- Fix the edit btn


# Extra explanations
`Home.jsx`
- We listen for a click on the Icon then trigger the click event in the input field, that has display: none
- After the image is uploaded and we get and URL whit that cool method, we render it just below the TextArea

# dotenv
- install dotenv
- Every variable must start whit VITE_ unless stated otherwise inside `vite.config.js`
- to acces them use 'import.meta.env.VITE_SECRET_KEY'