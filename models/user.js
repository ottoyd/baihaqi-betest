const userCollection = require('./../libs/mongo').mongoInstance("user")
const { ObjectId } = require('mongodb');
const Err = require('./../libs/err')

class User {
    constructor(_id, userName, accountNumber, identityNumber, emailAddress) {
        this._id = _id
        this.userName = userName.trim()
        this.accountNumber = accountNumber.trim()
        this.identityNumber = identityNumber.trim()
        this.emailAddress = emailAddress.trim()
    }

    static async getAll() {
        try {
            let result = []
            const users = await userCollection.find({}).toArray()
            for (const u of users) result.push(new User(u._id, u.userName, u.accountNumber, u.emailAddress, u.identityNumber));
            return result
        } catch (error) {
            throw error
        }
    }

    static async getByAccountNum(num) {
        try {
            if (!num) throw new Err('Invalid Paramenter', 400)
            const user = await userCollection.findOne({ accountNumber: num })
            if (!user) throw new Err('User Not Found', 404)
            return new User(user._id, user.userName, user.accountNumber, user.emailAddress, user.identityNumber)
        } catch (error) {
            throw error
        }
    }

    static async getIdentityNum(num) {
        try {
            if (!num) throw new Err('Invalid Paramenter', 400)
            const user = await userCollection.findOne({ identityNumber: num })
            if (!user) throw new Err('User Not Found', 404)
            return new User(user._id, user.userName, user.accountNumber, user.emailAddress, user.identityNumber)
        } catch (error) {
            throw error
        }
    }

    static async create(data) {
        try {

            const { userName, accountNumber, identityNumber, emailAddress } = data;

            if (!userName) throw new Err('userName Is Required', 400)
            if (!accountNumber) throw new Err('accountNumber Is Required', 400)
            if (!identityNumber) throw new Err('identityNumber Is Required', 400)
            if (!emailAddress) throw new Err('emailAddress Is Required', 400)
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress)) throw new Err('Invalid email address', 400)

            const isUserExistAN = await userCollection.findOne({
                $or: [
                    { accountNumber: accountNumber },
                    { identityNumber: identityNumber }
                ]
            })

            if (isUserExistAN) throw new Err('accountNumber OR identityNumber already used', 400)

            const newUser = new User(
                null,
                userName,
                accountNumber,
                identityNumber,
                emailAddress,
            );

            await userCollection.insertOne(newUser)

            return newUser

        } catch (error) {
            throw error
        }
    }

    static async edit(data, id) {
        try {

            const { userName, accountNumber, identityNumber, emailAddress } = data;

            if (!id) throw new Err('Invalid ID parameter', 400)
            if (!userName) throw new Err('userName Is Required', 400)
            if (!accountNumber) throw new Err('accountNumber Is Required', 400)
            if (!identityNumber) throw new Err('identityNumber Is Required', 400)
            if (!emailAddress) throw new Err('emailAddress Is Required', 400)
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress)) throw new Err('Invalid email address', 400)

            const thisUser = await userCollection.findOne({ _id: new ObjectId(id) });
            if (!thisUser) throw new Err('User Not Found', 404)
            const dataEditUser = { userName, accountNumber, identityNumber, emailAddress };

            const filter = { _id: new ObjectId(id) };
            const update = { $set: dataEditUser };

            await userCollection.updateOne(filter, update);

            return dataEditUser

        } catch (error) {
            throw error
        }
    }

    static async delete(id) {
        try {

            const thisUser = await userCollection.findOne({ _id: new ObjectId(id) });
            if (!thisUser) throw new Err('User Not Found', 404)

            await userCollection.deleteOne({ _id: new ObjectId(id) })
            return thisUser

        } catch (error) {
            throw error
        }
    }
}
module.exports = User