const Rental = require('./models/rental');
const User = require('./models/user');

class FakeDb {
  constructor() {
    this.rentals = [{
      title: "Nice view on ocean",
      city: "San Francisco",
      street: "Main street",
      category: "condo",
      image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
      bedrooms: 4,
      shared: true,
      description: "Very nice apartment in center of the city.",
      dailyRate: 43
    },
    {
      title: "Modern apartment in center",
      city: "New York",
      street: "Time Square",
      category: "apartment",
      image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
      bedrooms: 1,
      shared: false,
      description: "Very nice apartment in center of the city.",
      dailyRate: 11
    },
    {
      title: "Old house in nature",
      city: "Spisska Nova Ves",
      street: "Banicka 1",
      category: "house",
      image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
      bedrooms: 5,
      shared: true,
      description: "Very nice apartment in center of the city.",
      dailyRate: 23
      }];

    this.users = [{
      username: "Test User",
      email: "test@gmail.com",
      password: "testtest"
    },
      {
        username: "Test User 1",
        email: "test1@gmail.com",
        password: "testtest1"
      }];
  }

  pushDataToDb() {
    const user = new User(this.users[0]);
    const user2 = new User(this.users[1]);

    this.rentals.forEach((rental) => {
      const newRental = new Rental(rental);
      newRental.user = user;

      user.rentals.push(newRental);
      newRental.save();
    });

    user.save();
    user2.save();
  }

  async seedDb() {
    //primero el clean para no insertar lo mismo dos veces (borra todo) y despues el push. 
    await this.cleanDb();
    this.pushDataToDb();
  }

  //async y await: se encargan de que primero se haga el clean de la BD y despues siga la ejecucion
  async cleanDb() {
    await User.remove({});
    await Rental.remove({});
  }
}

module.exports = FakeDb;
