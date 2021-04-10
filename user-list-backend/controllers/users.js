const users = [
    {
        id: 1,
        firstName: "Rishabh",
        lastName: "Nehra"
    },
    {
        id: 2,
        firstName: "Rishabh",
        lastName: "Nehra"
    },
    {
        id: 3,
        firstName: "Rishabh",
        lastName: "Nehra"
    },
];

module.exports = {
    getUsers: (req, res) => {
        return res.json(users);
    },

    addUser: (req, res) => {
        const {firstName, lastName} = req.body;
        const id = users.length + 1;
        const user = {
            id,
            firstName,
            lastName
        }
        users.push(user)
        return res.json(user).status(201);
    }
}