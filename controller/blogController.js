const path = require("path")
const fs = require("fs")
const {Blog} = require("../models/Blog")

module.exports.getBlogs = async (req, res) => {
    try{
      const blogs = await Blog.find().sort({createdAt: 'desc'});
      res.status(200).send({ data: blogs });
    }
    catch(err){
      res.status(400).send(err)
    }
   
  }; 
  
  module.exports.getBlog  = async (req, res) => {
    try{
       const blog = await Blog.findById(req.params.id);
        res.status(200).send({data:blog});
    }
    catch(err){
      res.status(400).send(err)
  
    }
   
  };
   
  module.exports.createBlog =  async (req, res) => {
    try 
    {
      if (req.files) {
          let file = req.files.frontImage
          let filename = Date.now() + file.name
          
          file.mv(path.join(__dirname, "../uploads/" + filename))
          
          let blog = await Blog.findOne({ title: req.body.title.toLowerCase() });
          if (!blog) {
              blog = new Blog({ 
                  title: req.body.title.toLowerCase(),
                  content: req.body.content,
                  tags: req.body.tags.split(","),
                  frontImage: filename
              });   
    
              await blog.save();
  
              res.status(200).send({
                "message": "Blog created Successfully"
              });
          } 
          else
          {
              res.status(400).send({ error : "Title Already Exists" });
          }
      } 
      else
      {
          res.status(400).send({error: "Pleaase Upload Image"});
  
      }
    } 
    catch (err) {
      res.status(400).send({ error :"Sth wrong Occur"});
    }
  };
  
  module.exports.editBlog =  async (req, res) => {
    try {
      let blog = await Blog.findById(req.params.id);
  
      if (!blog) {
        res.status(403).send({ err: "Post doesnt  Exist" });
      } else {
        blog.title = req.body.title.toLowerCase();
        blog.content = req.body.content;
        // blog.tags = req.body.tags;
  
        await blog.save();
        res.status(200).send({ "message": "Blog Updated Successfully"});
      }
    } catch (err) {
      res.status(403).send(err);
    }
  };
  
  module.exports.deleteBlog =   async (req, res) => {
    try {
      const blog = await Blog.findByIdAndDelete(req.params.id);
      if (blog){
        fs.unlinkSync(path.join(__dirname, "../uploads/" + blog.frontImage))
      }
      
      res.status(200).send({ "message": "Blog Deleted Successfully"});
      
    } catch (err) {
      res.status(404).send(err);
    }
  };