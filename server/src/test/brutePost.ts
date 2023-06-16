type NewTweet =
  | { status: number; error: string }
  | { status: number; data: { content: string; imageUrl: string } };

export const newTweet = async (
  content: any,
  imageUrl: any
): Promise<NewTweet> => {
  // only got content
  if (typeof content === "string" && typeof imageUrl !== "string") {
    return {
      status: 200,
      data: { content, imageUrl: "" },
    };
  }

  // only got imageUrl
  if (typeof content !== "string" && typeof imageUrl === "string") {
    return {
      status: 200,
      data: { content: "", imageUrl },
    };
  }

  if (typeof content !== "string" || typeof imageUrl !== "string") {
    return {
      status: 500,
      error:
        "Error posting twit, invalid sent data, please only send strings values",
    };
  }

  if (!content.length && !imageUrl.length) {
    return {
      status: 500,
      error:
        "Error posting twit, missing data, either send content or imageUrl",
    };
  }

  return { status: 200, data: { content, imageUrl } };
};

export const followUser = async (willFollowId: any, toFollowId: any) => {};

// newTweet("", "").then((r) => console.log(r));
// newTweet([], []).then((r) => console.log(r));
// newTweet([1], [1]).then((r) => console.log(r));
// newTweet("1", [1]).then((r) => console.log(r));
// newTweet("1", "").then((r) => console.log(r));
// newTweet("", "1").then((r) => console.log(r));
// newTweet("1", "1").then((r) => console.log(r));
// newTweet("1", undefined).then((r) => console.log(r));
