import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSideBar from "./components/ProjectSideBar";

function App() {
  const [projectState,setProjectState] = useState({
    selectedProjectId:undefined,
    projects:[]
  });
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
 let content;
  if(projectState.selectedProjectId === null){
    content =<NewProject onAdd ={handleAddProject} onCancel={handleCancelAddProject}/>
  }else if(projectState.selectedProjectId === undefined){
    content = <NoProjectSelected  onStartAddProject={handleStartAddProject}/>
  }
  return (
    <main className="h-screen my-8 flex gap-8">
     <ProjectSideBar onStartAddProject={handleStartAddProject} projects={projectState.projects}/>
     {content}
    </main>
    
  );
}
export default App;
