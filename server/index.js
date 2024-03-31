const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./Models/User')
const json2csv = require('json2csv').Parser;
var fs = require('fs');
var exceljs = require('exceljs');
var path = require('path');

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/MERN-crud');

// Route to download users as CSV
app.get('/download/csv', async (req, res) => {
    await UserModel.find()
        .then(users => {
            const csvFields = ['_id', 'name', 'licenseNumber', 'dob', 'age']; // Define fields for CSV
            const json2csvParser = new json2csv({ fields: csvFields });
            const csv = json2csvParser.parse(users);
            res.header('Content-Type', 'text/csv');
            res.attachment('users.csv');
            res.send(csv);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Internal Server Error");
            res.json(err)
        });
});

// Route to download users as Excel file
app.get('/download/excel', async (req, res) => {
    await UserModel.find()
        .then(users => {
            const workbook = new exceljs.Workbook();
            const worksheet = workbook.addWorksheet('Users');

            // Define columns in Excel
            worksheet.columns = [
                { header: '_id', key: '_id', width: 20 },
                { header: 'Name', key: 'name', width: 20 },
                { header: 'License Number', key: 'licenseNumber', width: 20 },
                { header: 'DOB', key: 'dob', width: 20 },
                { header: 'Age', key: 'age', width: 10 }
            ];

            users.forEach(user => {
                worksheet.addRow({
                    _id: user._id,
                    name: user.name,
                    licenseNumber: user.licenseNumber,
                    age: user.age,
                    dob: user.dob
                });
            });
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=users.xlsx');
            return workbook.xlsx.write(res);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Internal Server Error");
            res.json(err)
        });
});


app.get('/', async (req, res) => {
    await UserModel.find()
        .then(users => {
            res.json(users)
        })
        .catch(err =>{
            res.status(500).json({ error: err.message });
        })
})

app.post('/create', async (req, res) => {

    if (!req.body) {
        res.status(400).send({ message: "Content can not be emtpy!" });
        return;
    }

    await UserModel.create(req.body)
        .then(user => {
            console.log("Data Added Successfully:", user)
            res.json(user)
            res.redirect('/')
        })
        .catch(err => {
            console.error("Error while saving data:", err); // Log error message to console
            res.status(500).send({
                message: err.message || 'Error'
            })
            res.json(err)
        })
})

app.put('/edit/:id', async (req, res) => {
    const id = req.params.id;
    await UserModel.findByIdAndUpdate({ _id: id }, {
        name: req.body.name,
        licenseNumber: req.body.licenseNumber,
        age: req.body.age,
        dob: req.body.dob,
    }).then(user => {
        if (user) {
            req.session.message = {
                type: 'success',
                message: 'Nurse updated!'
            }
        } else {
            throw new Error('Nurse not found');
        }
        res.json(user)
        res.redirect('/');
    })
        .catch(err => {
            res.redirect('/');
            res.json({ message: err.message, type: 'danger' });
        })
})

app.delete('/deleteuser/:id', async (req, res) => {
    try {

        const id = req.params.id;
        const deletedUser = await UserModel.findByIdAndDelete({ _id: id })

        if (deletedUser) {
            req.session.message = {
                type: 'info',
                message: 'Nurse deleted successfully!'
            };
            res.redirect("/");
        } else {
            throw new Error('Nurse not found');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

app.listen(3001, () => {
    console.log("Server is Running");
})