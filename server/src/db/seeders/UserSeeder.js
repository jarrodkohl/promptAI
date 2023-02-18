import { User } from "../../models/index.js"

class UserSeeder {
  static async seed() {
    const userData = [
      {
        email: "jarrod@promptai.com",
        cryptedPassword: "password123",
      },
      {
        email: "zach@yahoo.com",
        cryptedPassword: "notpassword"
      }
    ]
    
    for(const singleUserData of userData){
      const currentUser = await User.query().findOne({ email: singleUserData.email })
      if(!currentUser){
        await User.query().insert(singleUserData)
        console.log("user added")
      }
    }
    const users = await User.query() //.count()
    console.log(`${users.length} in the database`)
  }
}

export default UserSeeder