const TodoModel = require("../model/todo.model")

exports.deleteTodo = async(req,res,next)=>{
  try{
    const deletedTodo = await TodoModel.findByIdAndDelete(req.params.todoId);
    if(deletedTodo){
      res.status(200).json(deletedTodo)
    }else{
      res.status(404).send();
    }
  }catch(err){
    next(err)
  }
}
exports.createTodo = async (req, res, next) => {
  try{
  const createdModel = await TodoModel.create(req.body);
  res.status(201).json(createdModel);
  }catch(err){
    next(err);
  }
};

exports.getTodoById = async(req,res,next)=>{
  try{
    const singleTodo = await TodoModel.findById(req.params.todoId);
    if(singleTodo){
      res.status(200).json(singleTodo);
    }else{
      res.status(404).send();
    }
  
  }catch(err){
    next(err)
  }
}

exports.updateTodo = async(req,res,next)=>{
 try{
  const updateTodo = await TodoModel.findByIdAndUpdate(req.params.todoId,req.body,
    {
      new: true,
      useFindAndModify: false
    })
    if(updateTodo){
      res.status(200).json(updateTodo);
    }else{
      res.status(404).send();
    }
 }catch(err){
  next(err)
 }
}
exports.getTodo = async(req,res,next)=>{
  try{
  const allTodos = await TodoModel.find({});
  res.status(200).json(allTodos)
  }catch(err){
    next(err)
  }
}