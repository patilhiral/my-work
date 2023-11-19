const TodoController = require("../../controllers/todo.controller");
const TodoModel = require("../../model/todo.model");
const httpMocks = require("node-mocks-http");
const newTodo = require("../mock-data/new-todo.json");
const allTodos = require("../mock-data/all-todo.json")

TodoModel.create = jest.fn();
TodoModel.find = jest.fn();
TodoModel.findById = jest.fn();
TodoModel.findByIdAndUpdate = jest.fn();
TodoModel.findByIdAndDelete = jest.fn();

let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});


describe("TodoController.updateTodo",()=>{
  it("should have update Todo function",()=>{
    expect(typeof TodoController.updateTodo).toBe("function");
  })

  it("should call findByIdAndUpdate",async()=>{
    req.params.todoId='123'
    req.body = newTodo;
    await TodoController.updateTodo(req,res,next);
    expect(TodoModel.findByIdAndUpdate).toHaveBeenCalledWith('123', newTodo, {
      new: true,
      useFindAndModify: false
    });
  })
  it("should return response with json data and http code 200",async()=>{
    TodoModel.findByIdAndUpdate.mockReturnValue(newTodo)
    req.params.todoId='123'
    req.body = newTodo;
    await TodoController.updateTodo(req,res,next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(newTodo)
  })
  it("should handle error",async()=>{
    const errorMessage = {"message":"validation error"};
    const rejectedPromise = Promise.reject(errorMessage);
    TodoModel.findByIdAndUpdate.mockReturnValue(rejectedPromise);
    await TodoController.updateTodo(req,res,next);
    expect(next).toHaveBeenCalledWith(errorMessage);

  })
  it("should return 404",async()=>{
    TodoModel.findByIdAndUpdate.mockReturnValue(null);
    await TodoController.updateTodo(req,res,next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  })
})
describe("TodoController.getTodoById",()=>{
  it("should have a getTodobyID",()=>{
    expect(typeof TodoController.getTodoById).toBe("function")
  })

  it("should call findbyId",async ()=>{
    req.params.todoId='123'
    await TodoController.getTodoById(req,res,next);
    expect(TodoModel.findById).toBeCalledWith("123")
  })

  it("should return json body and response code 200",async ()=>{
    req.params.todoId='123'
    TodoModel.findById.mockReturnValue(newTodo);
    await TodoController.getTodoById(req,res,next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(newTodo)
  })

  it("should do error handling",async()=>{
    const errorMessage = {"message":"Validation error"}
    const rejectPromise = Promise.reject(errorMessage);
    TodoModel.findById.mockReturnValue(rejectPromise);
    await TodoController.getTodoById(req,res,next);
    expect(next).toBeCalledWith(errorMessage);
  })

  it("should return 404 when item does not exist",async()=>{
    TodoModel.findById.mockReturnValue(null)
    await TodoController.getTodoById(req,res,next)
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  })
})
describe("TodoController.getTodo",()=>{
    it('it should have a getTodo function',()=>{
        expect(typeof TodoController.getTodo).toBe("function")
    })

    it("Should call todo.find",()=>{
        TodoController.getTodo(req,res,next);
        expect(TodoModel.find).toHaveBeenCalledTimes(1);
    })

    it("should return response with status 200 and all todos",async()=>{
        TodoModel.find.mockReturnValue(allTodos);
        await TodoController.getTodo(req,res,next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(allTodos);
        
    })
    it("should handle errors",async ()=>{
        const errorMessage ={"meessage":"error in finding"};
        const rejectedPromise = Promise.reject(errorMessage);
        TodoModel.find.mockReturnValue(rejectedPromise);
        await TodoController.getTodo(req,res,next);
        expect(next).toBeCalledWith(errorMessage)

    })
})
describe("TodoController.createTodo", () => {
  beforeEach(() => {
    req.body = newTodo;
  });

  it("should have a createTodo function", () => {
    expect(typeof TodoController.createTodo).toBe("function");
  });
  it("should call TodoModel.create", () => {
    TodoController.createTodo(req, res, next);
    expect(TodoModel.create).toBeCalledWith(newTodo);
  });
  it("should return 201 response code", async () => {
    
    await TodoController.createTodo(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it("should return json body in response", async () => {
    TodoModel.create.mockReturnValue(newTodo);
    await TodoController.createTodo(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newTodo);
  });

  it("should handle errors",async()=>{
    const errorMessage = {message:"Done property missing"}
    const rejectPromise = Promise.reject(errorMessage);
    TodoModel.create.mockReturnValue(rejectPromise);
    await TodoController.createTodo(req,res,next);
    expect(next).toBeCalledWith(errorMessage);
  })
});



describe("TodoController.deleteTodo", ()=>{
  it("should have deleteTodo function",()=>{
    expect(typeof TodoController.deleteTodo).toBe('function')
  })

  it("should call findByIdandDelete",async()=>{
    req.params.todoId = '123';
    await TodoController.deleteTodo(req,res,next);
    expect(TodoModel.findByIdAndDelete).toBeCalledWith('123')
  })

  it("should return 200 and delete model",async ()=>{
    TodoModel.findByIdAndDelete.mockReturnValue(newTodo);
    await TodoController.deleteTodo(req,res,next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(newTodo)
  })

  it("should handle errors", async () => {
    const errorMessage = { message: "Error" };
    const rejectedPromise = Promise.reject(errorMessage);
    TodoModel.findByIdAndUpdate.mockReturnValue(rejectedPromise);
    await TodoController.updateTodo(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });
})