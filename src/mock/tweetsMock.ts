import { Tweet } from "../interfaces/tweet";

/**
 * Generates a timestamp based on today’s day with the specified time and minutes.
 * @param hours {number} - The time of the tweet (in 24-hour format).
 * @param minutes {number} - The tweet minutes.
 * @returns {number} - The generated timestamp.
 */
const generateMockTimestamp = (hours: number, minutes: number): number => {
    const currentDate = new Date();
    currentDate.setHours(hours, minutes, 0, 0);
    return currentDate.getTime();
}

export const tweetsMock: Tweet[] = [
    {
        id: "1",
        text: "#messi is the GOAT! Just amazing performance today!",
        timestamp: generateMockTimestamp(14, 15)
    },
    {
        id: "2",
        text: "Incredible match by #scaloni's team! Tactical masterclass.",
        timestamp: generateMockTimestamp(13, 45)
    },
    {
        id: "3",
        text: "Can't believe what #messi did on the field! #football",
        timestamp: generateMockTimestamp(14, 30)
    },
    {
        id: "4",
        text: "#Argentina is unstoppable under #scaloni. Great teamwork!",
        timestamp: generateMockTimestamp(13, 50)
    },
    {
        id: "5",
        text: "What a pass from #messi to win the game! Amazing!",
        timestamp: generateMockTimestamp(14, 25)
    },
    {
        id: "6",
        text: "#scaloni showing why he is the best coach right now! #football",
        timestamp: generateMockTimestamp(13, 55)
    },
    {
        id: "7",
        text: "#Node.js is perfect for building scalable backend services!",
        timestamp: generateMockTimestamp(15, 0)
    },
    {
        id: "8",
        text: "Can't decide between #TypeScript and JavaScript? #TypeScript provides type safety and is amazing for large codebases.",
        timestamp: generateMockTimestamp(15, 10)
    },
    {
        id: "9",
        text: "#AgeOfEmpires II is such a classic! Just started a new campaign.",
        timestamp: generateMockTimestamp(15, 20)
    },
    {
        id: "10",
        text: "#Node.js async/await makes code so much cleaner and easier to understand!",
        timestamp: generateMockTimestamp(15, 30)
    },
    {
        id: "11",
        text: "#TypeScript: Static typing can save you from a lot of runtime errors. Loving it!",
        timestamp: generateMockTimestamp(15, 40)
    },
    {
        id: "12",
        text: "The new DLC for #AgeOfEmpires II is amazing! Can't wait to try the new civilizations.",
        timestamp: generateMockTimestamp(15, 50)
    },
    {
        id: "13",
        text: "Another brilliant free-kick from #messi! GOAT behavior!",
        timestamp: generateMockTimestamp(14, 23)
    },
    {
        id: "14",
        text: "#scaloni: Tactics on point, team spirit on fire!",
        timestamp: generateMockTimestamp(13, 52)
    },
    {
        id: "15",
        text: "#Node.js event loop explained: The key to handling thousands of concurrent requests.",
        timestamp: generateMockTimestamp(16, 10)
    },
    {
        id: "16",
        text: "Creating my first REST API with #Express and #Node.js. Super exciting!",
        timestamp: generateMockTimestamp(16, 20)
    },
    {
        id: "17",
        text: "#TypeScript interfaces make working with complex objects so much easier. It really helps to document data shapes.",
        timestamp: generateMockTimestamp(16, 30)
    },
    {
        id: "18",
        text: "#AgeOfEmpires II: Just completed a Wonder victory in multiplayer. So satisfying!",
        timestamp: generateMockTimestamp(16, 40)
    },
    {
        id: "19",
        text: "#Node.js Streams API is incredibly powerful for handling large data sets.",
        timestamp: generateMockTimestamp(16, 50)
    },
    {
        id: "20",
        text: "Can't believe I just won a deathmatch in #AgeOfEmpires II using only archers! #gaming",
        timestamp: generateMockTimestamp(17, 0)
    },
    {
        id: "21",
        text: "#JavaScript is great, but #TypeScript takes your code to the next level with type safety and maintainability.",
        timestamp: generateMockTimestamp(17, 15)
    },
    {
        id: "22",
        text: "Exploring the best practices in #CleanCode with #Node.js. Writing readable and maintainable code is so satisfying!",
        timestamp: generateMockTimestamp(17, 30)
    },
    {
        id: "23",
        text: "#TypeScript and #React together are a game-changer. The type safety makes components so much easier to maintain.",
        timestamp: generateMockTimestamp(17, 45)
    },
    {
        id: "24",
        text: "Just finished watching a pro match of #AgeOfEmpires II. The strategies are mind-blowing!",
        timestamp: generateMockTimestamp(18, 0)
    },
    {
        id: "25",
        text: "Using async/await in #Node.js is so much cleaner compared to callbacks. No more callback hell!",
        timestamp: generateMockTimestamp(18, 15)
    },
    {
        id: "26",
        text: "Trying out #TypeScript's conditional types today. Very powerful for creating type-safe, reusable utility types!",
        timestamp: generateMockTimestamp(18, 30)
    },
    {
        id: "27",
        text: "#AgeOfEmpires is not just a game, it's a lifestyle! Who else agrees? #gaming",
        timestamp: generateMockTimestamp(18, 45)
    },
    {
        id: "28",
        text: "Node.js microservices with TypeScript are amazing for scalable architecture.",
        timestamp: generateMockTimestamp(19, 0)
    },
    {
        id: "29",
        text: "The way #scaloni reads the game is just brilliant!",
        timestamp: generateMockTimestamp(13, 48)
    },
    {
        id: "30",
        text: "Another day, another win in #AgeOfEmpires II. The legacy lives on!",
        timestamp: generateMockTimestamp(19, 20)
    }
];

