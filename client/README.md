# made with

Rainbow kit, docs

## Todo

### Search for the proper way to anotate components as props, either in good practices repo or in matt's TS course

### Find a wayt to extract the smart cotarct types frm the abi

```ts
const attempt: string[] = abi
  .map((fn) => (fn.type === "function" ? fn.name || "" : false))
  .filter((e) => e);
const arse = abi.map((fn) => (fn.type === "function" ? fn.name || "" : false));
const fusilaiento: string[] = arse.filter((e) => e !== false);

const arr = [
  "addressToTweets",
  "migrateData",
  "owner",
  "postHybridTweet",
  "postImageTweet",
  "postTextTweet",
  "tweetsCounter",
] as const;

type Join<T extends readonly string[]> = T[number];

type JoinedType = Join<typeof arr>;

// type example =
//   | "addressToTweets"
//   | "migrateData"
//   | "owner"
//   | "postHybridTweet"
//   | "postImageTweet"
//   | "postTextTweet"
//   | "tweetsCounter";
```
