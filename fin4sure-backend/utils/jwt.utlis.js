// --------------------------------- imports ---------------------------------
import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs";
// ---------------------------------------------------------------------------


// --------------------------------- getting data of the privite and public key ---------------------------------
const privatekey = fs.readFileSync(path.join(process.cwd(),"../Keys","private.key"));
const publickey = fs.readFileSync(path.join(process.cwd(),"../Keys","public.key"));
// --------------------------------------------------------------------------------------------------------------


// --------------------------------- access token signing ---------------------------------
export const signAccesstoken = (payload) => {
    try{
        const accessToken = jwt.sign(payload, privatekey, {
        algorithm : "RS256",
        expiresIn : "1d"
    });
    return accessToken;
}catch(e) {
    res.json({message : `${e} error occored while signing accessToken`})
}
};
// ----------------------------------------------------------------------------------------


// --------------------------------- refresstokesigningn ---------------------------------
export const signrefreshToken = (payload) => {
    try{
        const refreshToken = jwt.sign(payload, privatekey, {
        algorithm : "RS256",
        expiresIn : "1w",
    });
    return refreshToken;
}catch(e) {
    res.json({message : `${e}error occored while creating refresh token`})
}
};
// ---------------------------------------------------------------------------------------


// --------------------------------- verify token ---------------------------------
export const verifyToken = (token) => {
    try {
        const verifiedToken = jwt.verify(token,publickey,{
        algorithms : ["RS256"],
    });
    return verifiedToken;
}catch(e) {
    res.json({message : `${e}error occored while verifing toker`})
}
};
// --------------------------------------------------------------------------------