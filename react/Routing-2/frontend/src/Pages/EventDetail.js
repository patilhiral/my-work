import { json, redirect, useRouteLoaderData } from "react-router-dom"
import EventItem from '../components/EventItem'
export default function EventDetailPage(){
    const data = useRouteLoaderData('event-detail');
    console.log(data)
    return <EventItem event={data.event} />
}

export async function loader({request,params}){
    const id =params.eventId;
    const response = await fetch('http://localhost:8080/events/'+id)
    if(!response.ok){
        throw json({message:'Could not fetch details for select'},{status:500})
    }else{
        console.log(response)
        return response;
    }
}

export async function action({request,params}){
    const eventId=params.eventId;
    const response = await fetch('http://localhost:8080/events/'+eventId,{
        method:'delete'
    })
    if(!response.ok){
        throw json({message:'Could not delete the event'},{status:500})
    }else{
        return redirect('/events')
    }
}