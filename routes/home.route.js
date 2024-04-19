import { Router } from "express";
import axios from 'axios';
import { nanoid } from 'nanoid';
import moment from 'moment';
import _ from 'lodash'
import chalk from "chalk";

let users = [];

const router = Router();
moment.locale('es')

router.get('/', async (req, res) => {

    const { data } = await axios.get('https://randomuser.me/api/');
    const user = {
        firstName: data.results[0].name.first,
        lastName: data.results[0].name.last,
        gender: data.results[0].gender,
        id: nanoid(),
        date: moment().format('LLLL')
    }
    users = [...users, user]

    const male = _.filter(users, { gender: 'male' })
    const female = _.filter(users, { gender: 'female' })

    console.log(chalk.bgWhite.blue(users))


    res.render('home', { male, female });
})



export default router;