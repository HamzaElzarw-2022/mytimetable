import './App.css';
import React from 'react';
import { useState } from "react";
import {courseObj, list, cartesian } from './algorithm';
import Course from "./components/Course"
import TimeTableContainer from './components/Timetable.js';


let filters = {earliest: 8, latest: 19, numDays: 5};

export default function App() //-------------------------------------------------------------
{
  const [tableState, setTableState] = useState(); 
  let timetables;  //list of timetables according to input after submit button is clicked
  
  function makeTimetables() 
  {
    timetables = cartesian(list);
    console.log(timetables);
    timetables = timetables.filter((t) => t.early >= filters.earliest && t.late <= filters.latest && t.days.length <= filters.numDays)
    setTableState(<TimeTableContainer timetables={timetables}/>)
  }

  return (
    <div className="App">
      <TitleBar />
      <CourseContainer />
      <Filter />
      <Submit makeTimetables={makeTimetables} />
      {tableState}
      <footer className="footer"></footer>
    </div>
  );
}
function Filter() 
{
  return(
    <div className="course filter">
      <div className="filterTitle">Timetables Filter: </div>
      
      <div className="sec">
        <label className="secItem">earliest time </label>
        <input className="secItem" type="text" onChange={(e) => {filters.earliest = parseInt(e.target.value)}}></input>
      </div>
      <div className="sec">
        <label className="secItem">latest time </label>
        <input className="secItem" type="text" onChange={(e) => {filters.latest = parseInt(e.target.value)}}></input>
      </div>
      <div className="sec">
        <label className="secItem">maximum number of days </label>
        <select className="secItem secOption" onChange={(e) => {filters.numDays = parseInt(e.target.value)}}>
          <option value={5}>5</option>
          <option value={4}>4</option>
          <option value={3}>3</option>
          <option value={2}>2</option>
          <option value={1}>1</option>
        </select>
      </div>
      <div className="hint">*leave empty to see all possible timetables.</div>
    </div>
  );
}
function TitleBar()  //----------------------------------------------------------------------
{
  return (
    <header>
      <div className="titleBar">
        <span className="title">My Timetable</span>
      </div>
      <div className="divider"></div>
    </header>
  )
}
function CourseContainer()  //--------------------------------------------------------------
{
  const [courseList, setCourseList] = useState([<Course key="1" courseIndex="1"/> ]);

  function removeCourse()
  {
    console.log("course deleted ");
    if(courseList.length === 1)
      return;
    setCourseList(
      courseList.filter((a, i) => i !== courseList.length-1)
    );
    list.pop();
  }
  function addCourse() 
  {
    setCourseList([
      ...courseList,
      <Course key={courseList.length+1} courseIndex={courseList.length+1} removeCourse={removeCourse}/>
    ]);
    list.push(new courseObj());
  }

  return (
    <div className="courseContainer">
        {courseList}
        <div className="btn course" onClick={addCourse}>➕ Add Course</div>
        <div className="zero"><div className="removeCourse remove" onClick={removeCourse}>❌</div></div>
        
      </div>
  )
}

function Submit({makeTimetables}) //-------------------------------------------------------------------------
{
  return (
    <div className="btn submitBtn" onClick={makeTimetables}>SUBMIT</div>
  )
}