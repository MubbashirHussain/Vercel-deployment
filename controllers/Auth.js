const bcrypt = require('bcrypt')
const { SendResponse } = require('../Helpers/Helper')
const { User } = require('../model/Auth');
const jwt = require('jsonwebtoken')
const { Courses } = require('../model/Course');

let AuthControllers = {
    Signup: async (req, res) => {
        let errArr = [];
        try {
            let { userName, password, contact } = req.body;
            let obj = { userName, password, contact };
            if (!obj.userName) errArr.push("Required UserName");
            if (!obj.contact) errArr.push("Required Contact");
            if (!obj.password) errArr.push("Required password");
            if (password.length < 6) errArr.push("password Must Be grater then 6");
            if (errArr.length > 0) res.status(400).send(SendResponse(false, "Validation Error !", errArr));
            else {
                let UserExist = await User.findOne({ userName: obj.userName })
                if (UserExist) res.status(400).send(SendResponse(false, "This User Already Exist", errArr));
                else {
                    obj.password = await bcrypt.hash(obj.password, 10)
                    const Data = new User({ ...obj });
                    await Data.save()
                    res.status(201).send(SendResponse(true, "Data Added Successfully", { ...obj }));
                }
            }
        } catch (err) {
            res.status(400).send(SendResponse(false, "Unknown Error!", err));
        }
    },
    Login: async (req, res) => {
        try {
            let { userName, password } = req.body;
            let obj = { userName, password }
            let errArr = []
            if (!obj.userName) errArr.push("Required UserName");
            if (!obj.password) errArr.push("Required password");
            if (password.length < 6) errArr.push("password Must Be grater then 6");
            if (errArr.length > 0) res.status(400).send(SendResponse(false, "Validation Error !", errArr));
            else {
                const UserExist = await User.findOne({ "userName": obj.userName })
                if (!UserExist) {
                    res.status(401).send(SendResponse(false, "This User Doesn't Exist", errArr));
                } else {
                    let validPass = await bcrypt.compare(obj.password, UserExist.password)
                    if (!validPass) {
                        res.status(407).send(SendResponse(false, "Password Doesn't Match", errArr));
                    } else {
                        const token = jwt.sign({ id: UserExist._id }, process.env.SECRATE_KEY)
                        res.status(200).send(SendResponse(true, "User Logged In Successfully", { token, User: UserExist }));
                    }
                }
            }
        } catch (err) {
            res.status(400).send(SendResponse(false, "Unknown Error!", err));

        }
    }
}

module.exports = AuthControllers
