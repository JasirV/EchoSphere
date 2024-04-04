const jwt =require('jsonwebtoken');
const bcrypt=require('bcryptjs')
require('dotenv').config()

const hashStrting=async (value)=>{
    const salt =await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(value,salt);
    return hashedPassword;
}

const comparePassword=async(userpassword,password)=>{
    const isMacth=await bcrypt.compare(userpassword,password);
    return isMacth;
}

const tokengenerator = (id) => {
    try {
        const token = jwt.sign({ id: id }, process.env.USER_ACCES_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        return token;
    } catch (error) {
        console.error('Error generating token', error);
        return null;
    }
};


module.exports={tokengenerator,hashStrting,comparePassword}