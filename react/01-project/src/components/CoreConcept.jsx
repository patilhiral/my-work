export default function CoreComponents({image,title,description}){
    return(
      <li>
        <img src={image} alt={title}></img>
        <h3>{title}</h3>
        <p>{description}</p>
      </li>
    )
  }