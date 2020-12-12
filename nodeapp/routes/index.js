var express = require('express');
var router = express.Router();
const { sqlconfig } = require('../db')
const mysql = require('mysql2/promise')
/* GET home page. */




router.get('/api/complaint', async (req, res) => {
    try {
        const conn = await mysql.createConnection(sqlconfig);
        const [rows] = await conn.execute('select * from complaints');

        res.json({
            ok: true,
            result: rows
        });
        //console.log(res);
    } catch (err) {
        res.status(500).json({ ok: false })
    }
});


router.post('/api/login', async (req, res) => {
    try{
        //const {uid,pwd} = req.body;
        const uid = req.body.uid;
        const pwd = req.body.pwd;

        const conn = await mysql.createConnection(sqlconfig);
        const [rows] = await conn.execute('select * from usercreds where uid=? and pwd=?',[uid,pwd]);
        //console.log(rows.length==0)


        res.json({
            ok:true,
            correct: rows.length===1
        })
    }catch(err){
        res.status(500).json({ok:false});
    }
})



module.exports = router;
