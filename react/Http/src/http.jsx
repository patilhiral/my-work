export async function fetchAvailablePlaces(){
    const response = await fetch('http://localhost:3000/places');
    const resData = await response.json();
      if(!response.ok){
        throw new Error('Failed to fetch places')
      }
      return resData.places;
}

export async function fetchUserPlaces(){
  const response = await fetch('http://localhost:3000/user-places');
  const resData = await response.json();
    if(!response.ok){
      throw new Error('Failed to user fetch places')
    }
    return resData.places;
}

export async function updateUserPlaces(places){
    const response = await fetch('http://localhost:3000/user-places',{
      method:'PUT',
      body:JSON.stringify({places:places}),
      headers:{
        'content-type':'application/json'
      }
    });
    const resData = response.json();
    if(!response.ok){
      throw new Error('Failed to fetch places')
    }
    return resData.places;
}