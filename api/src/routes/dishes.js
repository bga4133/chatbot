const { Router } =  require('express');
const router = Router();
const axios = require('axios');

getFood = async () => {
    const res = await axios.get('https://xz94zfs6u8.execute-api.eu-west-1.amazonaws.com/default/myBakery');
    return res.data
}

router.route('/') 
    .get( async (req, res) => {
            const response = await getFood();
            res.status(200).json(response)
})

    
module.exports = router;