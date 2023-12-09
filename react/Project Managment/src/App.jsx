import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSideBar from "./components/ProjectSideBar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectState,setProjectState] = useState({
    selectedProjectId:undefined,
    projects:[],
    tasks:[]
  });

  function handleAddTask(text){
    setProjectState((prevState) => {
      const TaskId = Math.random();
      const newTask = {
        text: text,
        projectId:prevState.selectedProjectId,
        id:TaskId
      };

      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
      };
    });

  }
  function handleDeleteTask(id){
    setProjectState((prevState)=>{
      return{
        ...prevState,
        tasks:prevState.tasks.filter(task=>task.id !== id)
      }
    })
  }
  function handleStartAddProject(){
    setProjectState(prevState =>{
     const value = {
      ...prevState,
      selectedProjectId:null,
    }
      return value;
    })
  }
  function handleAddProject(projectData){
    setProjectState((prevState) => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId,
      };

      return {
        ...prevState,
        selectedProjectId:undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }
  function handleCancelAddProject(){
    setProjectState(prevState =>{
      const value = {
       ...prevState,
       selectedProjectId:undefined,
     }
       return value;
     })
  }
  function handleSelectProject(id){
    setProjectState((prevState)=>{
      return{
        ...prevState,
        selectedProjectId:id,
      }
    })
  }
  function handleDeleteProject(){
    setProjectState((prevState)=>{
      return{
        ...prevState,
        selectedProjectId:undefined,
        projects:prevState.projects.filter(project=>project.id !== prevState.selectedProjectId)
      }
    })
  }
  const selectedProject = projectState.projects.find(project=> project.id ==projectState.selectedProjectId)
 let content =<SelectedProject project={selectedProject} 
onDelete={handleDeleteProject}
 onAddTask={handleAddTask}
 onDeleteTask={handleDeleteTask}
 tasks={projectState.tasks}/>;
  if(projectState.selectedProjectId === null){
    content =<NewProject onAdd ={handleAddProject} onCancel={handleCancelAddProject}/>
  }else if(projectState.selectedProjectId === undefined){
    content = <NoProjectSelected  onStartAddProject={handleStartAddProject}/>
  }
  return (
    <main className="h-screen my-8 flex gap-8">
     <ProjectSideBar onStartAddProject={handleStartAddProject} 
     projects={projectState.projects} onSelectProject={handleSelectProject}
     selectedProjectId={projectState.selectedProjectId}
     />
     {content}
    </main>
    
  );
}
export default App;
