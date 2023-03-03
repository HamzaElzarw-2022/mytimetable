//import { useState } from 'react';
import './Table.css';

export default function TimeTableContainer({timetables}) 
{
  
  let allTables = timetables.map((table, i) => <TimeTable table={table} key={i}/>);

  return(
    <div>
      <div className="info course">number of Timetables generated: <span className="number">{timetables.length}</span></div>
      {allTables}
    </div>
  )
}

function TimeTable({table}) 
{ 
  const lectures = [[],[],[],[],[]];
  for(let i=0; i< table.sections.length; i++) 
  {
    // eslint-disable-next-line default-case
    switch(table.sections[i].day) {
      case 'MON':
        lectures[0].push(table.sections[i])
        break;
      case 'TUE':
        lectures[1].push(table.sections[i])
        break;
      case 'WED':
        lectures[2].push(table.sections[i])
        break;
      case 'THU':
        lectures[3].push(table.sections[i])
        break;
      case 'FRI':
        lectures[4].push(table.sections[i])
    }
  }

  return (
    <div className="table">
      <TimeColumn />
      <ColContent lectures={lectures}/>
    </div>
  )
}
function ColContent({lectures}) 
{
  let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  
  return (
    days.map((a, i) => {
      return(
        <div className="mcolumn" key={i}>
          <div className="divider2"></div>
          <div className="column">
            <div className="block blockBorder">{a}</div>
            {lectures[i].map((s, i) => <Lecture section={s} key={i}/>)}
          </div>
        </div>
      )
    })
  );
}
function TimeColumn() 
{
  let times = ["08","09","10","11","12","01","02","03","04","05","06", "07"]
  let timeElement = times.map((t, i) => {
    if(i+1 === times.length)
      return <div className="block" key={i}>{t}:30</div>;
    else
      return <div className="block blockBorder" key={i}>{t}:30</div>
  })
  return(
    <div className="column">
      <div className="block blockBorder">TIME</div>
      {timeElement}
    </div>
  )
}
function Lecture({section}) 
{
  let topSpace = "0px";
  let height = 37.9 +"px";

  topSpace = (section.start-8)*42.9 + "px"
  height = (37.9*(section.end-section.start)) + (5*(section.end-section.start-1)) - 2 + "px";

  return (
    <div className="zero" >
        <div className="lecture" style={{top: topSpace, height: height}}>
        {section.courseCode}<br />
        section:{section.number}
        </div>
    </div>
  )
}
