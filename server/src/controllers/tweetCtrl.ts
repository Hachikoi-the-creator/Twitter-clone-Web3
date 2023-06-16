import { prisma } from "..";
import { validateNum } from "../utils/validators";

/******
  Get all tweets paginated
 ******/
export async function getTweetsPaginated(page: any) {
  const tweetsPerPage = 10;
  const skipCount = (validateNum(page) - 1) * tweetsPerPage;

  const twits = await prisma.tweet.findMany({
    include: { user: true },
    skip: skipCount,
    take: tweetsPerPage,
  });

  return twits;
}
