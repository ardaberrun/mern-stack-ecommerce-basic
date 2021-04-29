const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    let token = req.headers.authorization;
    if(!token) return res.status(401).json({message: 'Unauthorized!'});

    try{
        token = token.split(' ')[1];
        const verified = jwt.verify(token,process.env.TOKEN_SECRET);
        
        req.user = verified;   
        next();
    }catch(err){
        res.status(403).json({error: 'Forbidden!'})
    }
};

module.exports = auth