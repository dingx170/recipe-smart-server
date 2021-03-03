db = db.getSiblingDB('testDB')
db.createCollection('users')
usersCollection = db.getCollection("users")
usersCollection.remove({})

usersCollection.insert(
    {
        "user_id": 1001,
        "name": "SamMakeGoodFood",
        "password": "12345678",
        "email": "UncleSam@gmail.com",
        "photo": null,
        "restrictions": ["Corn", "Peanut"]

    }
    
);

usersCollection.insert({
    "user_id": 1002,
    "name": "JohnMakeGoodFood",
    "password": "12345678",
    "email": "UncleJohn@gmail.com",
    "photo": null,
    "restrictions": ["Shellfish", "Peanut"]
});

usersCollection.insert({
    "user_id": 1003,
    "name": "GoodFoodFrank",
    "password": "12345678",
    "email": "Frankie@gmail.com",
    "photo": null,
    "restrictions": ["Peanut"]
});

usersCollection.insert({
    "user_id": 1004,
    "name": "tasetyFood",
    "password": "12345678",
    "email": "UncleSam@gmail.com",
    "photo": null,
    "restrictions": ["Corn", "Peanut"]
});

usersCollection.insert({
    "user_id": 1005,
    "name": "BettyLovesCat",
    "password": "12345678",
    "email": "bCate@gmail.com",
    "photo": null,
    "restrictions": ["Milk"]
});




//user_id: Number,
// name: String;
// password:String,
// email: String,
// photo: Buffer,
// restrictions: [AllergyType],
// userTags: [UserTag]

