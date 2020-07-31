const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '70613d40a57448749f2ae614f208e946'
  });

const handleApiCall = (req,res)=>{
    if(req.body.typeOfApi==='FACE_DETECT_MODEL'){
        app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data=>{
            res.json(data);
        })
        .catch (err => res.status(400).json('Unable to work with API'));
    }
    else if(req.body.typeOfApi==='FOOD_MODEL'){
        app.models
        .predict(Clarifai.FOOD_MODEL, req.body.input)
        .then(data=>{
            res.json(data);
        })
        .catch (err => res.status(400).json('Unable to work with API'));
    }
}
  
const handleImage=(req,res,db)=>{
    const {id}=req.body;
    db('users').where('id', '=', id)
    .increment('entries',1)
    .returning('entries')
    .then(entries=>{
        res.json(entries[0])
    })
    .catch(err=>res.status(400).json('Unable to get entries'))
}
module.exports={
    handleImage: handleImage,
    handleApiCall:handleApiCall
}