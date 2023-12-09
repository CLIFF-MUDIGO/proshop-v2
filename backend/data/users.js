import bcrypt from "bcryptjs";

const users = [
    {
        name: 'femina',
        email: 'femina@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'mudigo',
        email: 'mudigo@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false
    },
    {
        name: 'mwenesi',
        email: 'mwenesi@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false
    }
];

export default users