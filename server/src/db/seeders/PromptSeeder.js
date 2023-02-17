import { User, Prompt } from "../../models/index.js"
import Seeder from "../Seeder.js"


class PromptSeeder {
    static async seed() {
    const user1 = await User.query().findOne({ email: "jarrod@promptai.com" })
    const user2 = await User.query().findOne({ email: "zach@yahoo.com" })

		const promptData = [
			{
					userId: user1.id,
					promptContent: "After years of being stranded on a deserted island, a group of survivors finally sees a ship on the horizon. But as it approaches, they realize that it's not a rescue mission at all."
			},
			{
					userId: user1.id,
					promptContent: "A young woman wakes up with no memory of who she is or how she got there. She must piece together her past and figure out who she can trust before it's too late."
			},
			{
					userId: user1.id,
					promptContent: "A high school student discovers that they have the power to time travel, but each trip through time has unforeseen consequences that they must navigate to save the people they care about."
			},
			{
					userId: user1.id,
					promptContent: "A struggling musician lands a gig at a mysterious club where the performers are all otherworldly creatures. As she gets drawn deeper into their world, she realizes that the cost of success might be more than she bargained for."
			},
			{
					userId: user1.id,
					promptContent: "A group of friends stumble upon a hidden room in their school and discover a mysterious book that seems to have the power to bring their darkest fears to life."
			},
			{
					userId: user1.id,
					promptContent: "A detective must solve a murder case in a town where every resident has a secret they're desperate to keep hidden."
			},
			{
					userId: user1.id,
					promptContent: "After a global catastrophe wipes out most of humanity, a small group of survivors band together to try and rebuild society. But as they start to make progress, they realize that they're not the only ones left alive."
			},
			{
					userId: user1.id,
					promptContent: "A shy introvert discovers that they have the power to bring their artwork to life, but when a dark force threatens to use this power for evil, they must find the strength to fight back."
			},
			{
					userId: user2.id,
					promptContent: "A young prince must undertake a perilous journey to retrieve a powerful artifact that will save his kingdom, but the journey will test his bravery and loyalty in ways he never imagined."
			},
			{
					userId: user2.id,
					promptContent: "A woman wakes up in a strange hospital with no memory of how she got there or why she's being kept against her will. As she tries to escape, she realizes that the hospital is run by a sinister organization with its own agenda."
			},
			{
					userId: user2.id,
					promptContent: "A group of friends decide to spend the night in a supposedly haunted house, but as the night wears on, they realize that the legends might be true."
			},
			{
					userId: user2.id,
					promptContent: "In a world where people are born with unique abilities, a young woman discovers that hers is the power to bring inanimate objects to life. But as she navigates this new reality, she realizes that not everyone sees her gift as a blessing."
			},
			{
					userId: user2.id,
					promptContent: "A scientist discovers a way to clone human beings, and soon the world is overrun with identical copies of the same people. But as the clones begin to develop their own identities, they realize that they're not content to live in the shadow of their originals."
			},
			{
					userId: user2.id,
					promptContent: "In a world where every decision is made by a powerful algorithm, a group of rebels seeks to take down the system and restore free will to humanity. But as they plot their revolution, they realize that the algorithm may be more sentient and self-aware than anyone ever realized."
			}
        
    ]
		for (const singlePromptData of promptData) {
			await Prompt.query().insert(singlePromptData);
		}
		
    }
}

export default PromptSeeder