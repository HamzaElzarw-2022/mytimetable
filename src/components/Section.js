import {list} from '../algorithm';

export default function Section({sectionIndex, courseIndex})  //--------------------------------------------------------------------------
{

  return (
    <div className="section">
      <div className="zero"><div className="label secLabel">{sectionIndex}</div></div>
      
      <div className="sec">
        <label className="secItem">section number </label>
        <input className="secItem" type="text" onChange={(e) => {list[courseIndex-1].sections[sectionIndex-1].number = e.target.value}}></input>
      </div>
      <div className="sec">
        <label className="secItem">start time </label>
        <input className="secItem" type="text" onChange={(e) => {list[courseIndex-1].sections[sectionIndex-1].start = parseInt(e.target.value)}}></input>
      </div>
      <div className="sec">
        <label className="secItem">end time </label>
        <input className="secItem" type="text" onChange={(e) => {list[courseIndex-1].sections[sectionIndex-1].end = parseInt(e.target.value)}}></input>
      </div>
      <div className="sec">
        <label className="secItem">week day </label>
        <select className="secItem secOption" onChange={(e) => {list[courseIndex-1].sections[sectionIndex-1].day = e.target.value}}>
          <option value="">select</option>
          <option value="MON">MON</option>
          <option value="TUE">TUE</option>
          <option value="WED">WED</option>
          <option value="THU">THU</option>
          <option value="FRI">FRI</option>
        </select>
      </div>
    </div>
  )
}
