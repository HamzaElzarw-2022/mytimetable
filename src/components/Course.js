import Section from "./Section"
import { useState } from "react";
import { sectionObj, list} from '../algorithm';

export default function Course({courseIndex})  //-----------------------------------------------------------------------------------------
{

  const [sectionList, setSectionList] = useState([<Section key="1" sectionIndex="1" courseIndex={courseIndex}/>]);

  function addSection() 
  {
    setSectionList([
      ...sectionList,
      <Section key={sectionList.length+1} sectionIndex={sectionList.length+1} courseIndex={courseIndex}/>
    ]);
    list[courseIndex-1].sections.push(new sectionObj(list[courseIndex-1].courseCode));
    
  }
  function removeSection() 
  {
    console.log("course deleted ");
    if(sectionList.length === 1)
      return;
    setSectionList(
      sectionList.filter((a, i) => i !== sectionList.length-1)
    );
    list[courseIndex-1].sections.pop();
  }
  function changeCourseCode(e) 
  {
    list[courseIndex-1].courseCode = e.target.value;
  
    for(let i=0; i< list[courseIndex-1].sections.length; i++) {
      list[courseIndex-1].sections[i].courseCode = list[courseIndex-1].courseCode;
    }
  }
  return (
    <div className="course">
      <div className="zero"><div className="label">{courseIndex}</div></div>
      <div className="sec">
        <label className="secItem">course code </label>
        <input className="secItem" type="text" onChange={(e) => changeCourseCode(e)}></input>
      </div>
      {sectionList}
      <div className="zero"><div className="removeSection remove" onClick={removeSection}>❌</div></div>
      
      <div className="btn section" onClick={addSection}>➕ Add Section</div>
      
    </div>
  )
}
