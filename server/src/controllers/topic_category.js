
const db = require("../config/database");



const postTopicCategory = (req, res) => {
  const { topic_category } = req.body;
  console.log(topic_category);

const query = "INSERT INTO topic_categories (category) VALUES (?)";

db.query(query,[topic_category],(err,result)=>{
    if(err){
        console.log(err);
        res.send("Failed");
        return
    }
     console.log(result);
    res.send("SUCCESS");
})



};

module.exports = { postTopicCategory };
