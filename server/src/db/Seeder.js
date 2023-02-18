/* eslint-disable no-console */
import { connection } from "../boot.js"
import UserSeeder from "./seeders/UserSeeder.js"
import PromptSeeder from "./seeders/PromptSeeder.js"

class Seeder {
  static async seed() {
    console.log("seeding users...")
    await UserSeeder.seed()

    console.log("seeding prompts...")
    await PromptSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder