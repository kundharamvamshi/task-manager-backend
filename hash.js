const bcrypt=require('bcrypt'); 

async function hashPassword() {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash('admin@123', saltRounds);
    console.log(hashedPassword);
}

hashPassword();