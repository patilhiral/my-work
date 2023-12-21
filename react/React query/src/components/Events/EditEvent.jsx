import { Link, redirect, useNavigate, useNavigation, useParams, useSearchParams, useSubmit } from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { useQuery } from '@tanstack/react-query';
import { fetchEvent, queryClient, updateEvent } from '../../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EditEvent() {
  const navigate = useNavigate();
  const {state} =useNavigation();
  const submit = useSubmit();
  const params = useParams();
  /* const {mutate} =useMutation({
    mutationFn:updateEvent,
    onMutate:(data)=>{
      const newEvent = data.event;
      queryClient.cancelQueries({queryFn:['events',params.id]})
      const previousEvent = queryClient.getQueryData(['events',params.id])
      queryClient.setQueryData(['events',params.id],newEvent)
      return {previousEvent}
    },
    onError:(error,data,context)=>{
      queryClient.setQueryData(['events',params.id],context.previousEvent)
    },
    onSettled:()=>{
      queryClient.invalidateQueries(['events',params.id])
    }
  }) */
  const{data,isError,error} = useQuery({
    queryKey:['events',params.id],
    queryFn:({signal})=>fetchEvent({signal,id:params.id}),
    staleTime:10000
  })
  function handleSubmit(formData) {
   submit(formData,{method:'PUT'});

  }

  function handleClose() {
    navigate('../');
  }
  let content;
  
  if(isError){
    content=<div className='center'>
      <ErrorBlock title='Error while fetching' message={error.info?.message || 'Please check your input'} />
      <div className='form-action'>
        <Link to='../' className='button'>
          okay
        </Link>
      </div>
    </div>
  }
  if(data){
    content =( <EventForm inputData={data} onSubmit={handleSubmit}>
      {state ==='submitting' ? (<p>Sending data...</p>) :(<><Link to="../" className="button-text">
        Cancel
      </Link>
      <button type="submit" className="button">
        Update
      </button></>) }
      
    </EventForm>)
  }
  return (
    <Modal onClose={handleClose}>
     {content}
    </Modal>
  );
}

export function loader({params}){
  return queryClient.fetchQuery({
    queryKey:['events',params.id],
    queryFn:({signal})=>fetchEvent({signal,id:params.id})
  })
}
export async function action({request,params}){
  const formData = await request.formData();
  const updateEventData = Object.fromEntries(formData)
  await updateEvent({id:params.id, event:updateEventData});
  await queryClient.invalidateQueries(['events'])
  return redirect('../')
}
