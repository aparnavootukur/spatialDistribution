const { Sequelize } = require("../config/db");
const State= require("../models/states");



 exports.getStates = async (req, res) => {
  try {
    const tasks = await State.findAll();
    res.status(200).json({ tasks, status: true, msg: "Cities found successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}

exports.getState = async (req, res) => {
  try {
    console.log(req.params.id,'req')
    const task = await State.findOne({where:{ id: req.params.id }});
    console.log(task,'ii')
    if (!task) {
      return res.status(400).json({ status: false, msg: "No State found.." });
    }
    res.status(200).json({ task, status: true, msg: "State found successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}

exports.postState = async (req, res) => {
  try {
    const { name,location} = req.body;
    if (!name || !location ) {
        return res.status(400).json({ error: 'Name, location are required' });
      }
    const polygon = Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify(location));
    console.log(polygon)
    const task = await State.create({ location:polygon,name});
    res.status(200).json({ task, status: true, msg: "Task created successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}

exports.putState = async (req, res) => {
  try {
    let{location,name,stateId,id} = req.body;
    console.log(!id)
    if(!id){
        return res.status(400).json({ status: false, error: 'id is required' });  
    }
    let polygon
    if(location){
    polygon = Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify(location));
    }
  

   let  task = await State.findOne({where:{id:id}})
    if (!task) {
      return res.status(400).json({ status: false, msg: " State is not found" });
    }

    task = await State.update({ location:polygon,name,stateId}, {
      where:{id:id}
    });
    res.status(200).json({ task, status: true, msg: "state updated successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}


