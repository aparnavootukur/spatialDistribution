const { Sequelize } = require("../config/db");
const City= require("../models/cities");



exports.getCities = async (req, res) => {
  try {
    let tasks
    if(req.body.stateId){
    tasks = await City.findAll({where:{ stateId: req.body.stateId }});
    }
    else{
       tasks = await City.findAll(); 
    }
    res.status(200).json({ tasks, status: true, msg: "Cities found successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}

exports.getCity = async (req, res) => {
  try {
    console.log(req.params.id,'req')
    const task = await City.findOne({where:{ id: req.params.id }});
    console.log(task,'ii')
    if (!task) {
      return res.status(400).json({ status: false, msg: "No City found.." });
    }
    res.status(200).json({ task, status: true, msg: "TCity found successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}

exports.postCity = async (req, res) => {
  try {
    const { name,location,stateId} = req.body;
    console.log((!(name || location || stateId)))
    if (!name || !location || !stateId) {
      return res.status(400).json({ error: 'Name, location, and stateId are required' });
    }
    let  city = await City.findOne({where:{name:name,stateId:stateId}})
    if (city) {
      return res.status(400).json({ status: false, msg: " City already exists" });
    }
    const point = Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify(location));
    const task = await City.create({ stateId:stateId,location:point,name});
    res.status(200).json({ task, status: true, msg: "Task created successfully.." });
   }
  

  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}

exports.putCity = async (req, res) => {
  try {
  const { location,name,stateId,id} = req.body;
  if(!id){
    return res.status(400).json({  status: false,error: 'id is required' });  
}
  let point
  if(location){
  point = Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify(location));
  }
   let  task = await City.findOne({where:{id:id}})
    if (!task) {
      return res.status(400).json({ status: false, msg: " City is not found" });
    }

    task = await City.update({ location:point,name,stateId:stateId}, {
      where:{id:id}
    });
    res.status(200).json({ task, status: true, msg: "Task updated successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}


