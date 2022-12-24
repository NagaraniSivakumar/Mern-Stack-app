const express=require("express");
const Course=require("../mongoose/models/courses");

//setting up the student router
const usersRouter=new express.Router();

//write your code here

usersRouter.post('/courses/enroll/:id', async (req, res) => {
   const _id = req.params.id;
     const users=Course.find({ _id:req.params.id }, function (err, docs) {
            text=(docs.map((value)=>value.isApplied)).toString()
             if(text=="true"){
        return res.status(403).json({message: "you have already enrolled for the course"
        
    }
)}
});
    try {
        const user = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!user) {
            return res.status(404).send()
        }
        Course.updateOne({ _id:req.params.id },
            {isApplied:true}, function (err, docs) {
            if (err){
                console.log(err)
            }
        });
      return res.status(200).json({message: "you have successfully enrolled for the course"})
    
    } catch (e) {
      
    }
})


usersRouter.delete('/courses/drop/:id', async (req, res) => {
    
 const _id = req.params.id;
    Course.find({ _id:req.params.id }, function (err, docs) {
            text=(docs.map((value)=>value.isApplied)).toString()
            if(text==="false"){
                return res.status(403).json({message: "you have not enrolled for the course"})
            }
        });
    try {
       
        const user = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!user) {
            return res.status(403).send()
        }
        Course.updateOne({ _id:req.params.id },
            {isApplied:false}, function (err, docs) {
            if (err){
                console.log(err)
            }
        });
      return res.status(200).json({message: "you have dropped the course"})
    } catch (e) {
    }
})


usersRouter.get('/courses/get',(req,res)=>{
    Course.find({})
      .then((users) => {
          res.status(200).json(users)
    })
      .catch((err) => {res.status(400).json('Error: ' + err)
    });
})


usersRouter.patch('/courses/rating/:id', async (req, res) => {
    try {
        Course.find({ _id:req.params.id }, function (err, docs) {
            if(docs.map((value)=>value.isRated).toString()==="true"){
                return res.status(403).json({message: "you have already rated this course"})
            }
        });
        Course.find({ _id:req.params.id }, function (err, docs) {
            if(docs.map((value)=>value.isApplied).toString()==="false"){
                return res.status(403).json({message: "you have not enrolled for this course"})
            }
        });

        Course.find({ _id:req.params.id }, function (err, docs) {
           str= docs.map((value)=>value.noOfRatings).toString()
           number =parseInt(str);
           str1= docs.map((value)=>value.rating).toString()
           number1 =parseFloat(str1);
           ans=req.body.rating
           avg=number*number1;
           avg1=avg+ans
           result=avg1/(number+1)
           final=result.toFixed(1)
        console.log(final);
        });

        const user = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!user) {
            return res.status(404).send()
        }
       
        Course.updateOne({ _id:req.params.id },
            {rating:final,noOfRatings:number+1,isRated:true}, function (err, docs) {
            if (err){
                console.log(err)
            }
        });
        res.status(200).json({message: "You have rated the course"})
    } catch (e) {
    }
})

module.exports=usersRouter