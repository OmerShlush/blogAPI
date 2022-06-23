import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { addUser, getUser } from '../shared/user.db-queries';
import { UserInterface } from '../interfaces/user.interface';
import { verifyToken } from '../shared/auth';

const router = express.Router();

router.post('/add', verifyToken, async (req: express.Request, res: express.Response) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        
        if(!(firstName && lastName && email && password)) return res.status(StatusCodes.BAD_REQUEST).send('All Inputs Required !');
        const checkIfExists = await getUser(email);
        
        if(checkIfExists) return res.status(StatusCodes.CONFLICT).send('User already exists. please login.');
        
        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: encryptedPassword
        };
        
        const newUser: UserInterface = await addUser(user);

        const token = jwt.sign(
            { userid: newUser.id, email, firstName: firstName, lastName: lastName },
            process.env.JWT_TOKEN,
            {
                expiresIn: '2h',
            }
        );

        newUser.token = token;

        res.status(StatusCodes.CREATED).json(user);
    } catch (err) {
        console.log(err);
    }
})

router.post('/login', async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, userToken } = req.body;
        
        if(userToken) {
            const decoded = jwt.verify(userToken, process.env.JWT_TOKEN);
            return res.status(StatusCodes.OK).send(decoded);
        }
        
        if(!(email && password)) return res.status(StatusCodes.BAD_REQUEST).send('All Inputs Required !');

        const user: UserInterface | boolean = await getUser(email);

        if(!user) return res.status(StatusCodes.BAD_REQUEST).send('Incorrect email address !');
        
        if(await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                { userid: user.id, email, firstName: user.firstName, lastName: user.lastName },
                process.env.JWT_TOKEN,
                {
                    expiresIn: '2h',
                }
            );
            
            user.token = token;
            return res.status(StatusCodes.OK).json(user);
        } else {
            res.status(StatusCodes.BAD_REQUEST).send('Invalid Credentials');
        }

    } catch (err) {
        console.log(err);
    }
})

export { router };