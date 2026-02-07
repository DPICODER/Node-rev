const bcrypt = require('bcrypt');

const salt = 10;

const password = 'StronkPassword12345'

async function hasher() {
    const hashedPassword = await bcrypt.hash(password,10);
    console.log("hashedPassword :",hashedPassword);
    
}

async function compareHash() {
    const compareStatus = await bcrypt.compare(password,'$2b$10$tddhmFR.vQp2A4Vhdsds6OFK2QxabeQJ0gAEzIdTJLmkx5iwqjW3a')
    console.log("Compare Status : ",compareStatus);
}

compareHash()