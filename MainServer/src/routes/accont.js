import express from "express";
import client from "../cacheDB.js";
import accontDB from "../database/accontDB.js";
import { createHmac } from 'node:crypto';

const router = express.Router();

const k = {
    nonce:0
  }

//get 필요한가?
router.get('/', async(req, res, next) => {
    res.status(200).json({
        message : "Handling GET Request to /account"
    });
});

//register
router.post('/', (req, res, next) => {
    res.status(200).json({
        message : "Handling POST Request to /account"
    });
});

//login and post token
router.post('/token', async(req, res, next) => {

  var successful = false;
  //token 생성
  await accontDB.getPWById((rows) => {
    if(rows.length > 0) {
      if (rows[0].pw === req.body.pw) {
        successful = true;
      }
    }
  }, req.body.id);

  //로그인 성공 시 토큰 등록 및 반환.
  if (successful) {
    const token = createHmac('sha256', k.nonce.toString())
                   .update(req.body.id)
                   .digest('hex');
    console.log(token);
    k.nonce++;
    client.set(token, req.body.id)
    return res.status(200).json(token);
  }
  return res.status(401).json({
    message: "Unauthorized"
  });

});

export default router;