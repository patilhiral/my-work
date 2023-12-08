
import CoreComponents from './CoreConcept';
import { CORE_CONCEPTS } from '../data';
export default function CoreConcepts(){
    return (<section id="core-concepts">
    <h2>Time to get started!</h2>
    <ul>
      {CORE_CONCEPTS.map((item)=> <CoreComponents key={item.title} {...item}/>)}
    </ul>
    </section>)
}
