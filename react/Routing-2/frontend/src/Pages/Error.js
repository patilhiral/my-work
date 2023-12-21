import { useRouteError } from "react-router-dom";
import PageContent from "../components/PageContent";

export default function ErrorPage(){
    const error = useRouteError();
    console.log(error)
    let title="A Error Occured";
    let message="Somthing went wrong";
    if(error.status ===500){
        message = error.data.message
    }
    if(error.status ===404){
        title='No data found'
        message = 'Could not find resource or page'
    }
    return <PageContent title={title}>
       {message}
        </PageContent>
}