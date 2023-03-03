
export class sectionObj
{
    constructor(courseCode) {
        this.number= null; //section number
        this.day= null; //sun, mon
        this.start= null; //start time of section
        this.end= null;  //end time of section
        this.courseCode= courseCode; //course of section
    }
}
 export class courseObj
{
    constructor() {
        this.courseCode= null;  //name of course
        this.sections= [new sectionObj()]; //sections available for course
    }
}
class tableObj 
{
    constructor(sections) {
        this.early = 24;  //earlies time of day in the table
        this.late = 0;   //latest time of day in the table
        this.days = [];   //days of courses in table
        this.sections= sections; //list of sections (lectures)
    }
}

//list of courses with input given from user
export let list= [];
list.push(new courseObj());

//function input: one table
//funcition output: true if table have no overlaping, false if table have overlaping
//used in cartesian function
function filterOverlapping(table) 
{
    let sections = table.sections;

    for(let i=0; i<sections.length; i++) 
    {
        for(let j=0; j<sections.length; j++) 
        {
            if(i === j) 
                continue;
            if(sections[i].day === sections[j].day) 
            {
                if( !( (sections[j].end <= sections[i].start) || (sections[j].start >= sections[i].end) ))
                    return false;
                else if( (sections[j].end == sections[i].end) && (sections[j].start == sections[i].start) )
                    return false;
            }
        }
    }
    return true;
}
//function input: list of courses 
//function output: list of tables with no overlapping
export function cartesian(list) 
{
    let args = [];
    for(let i=0; i<list.length; i++) {
    args.push(list[i].sections)
    }
    
    let r = [], max = args.length-1;

    function helper(arr, i) 
    {
        for (let j=0, l=args[i].length; j<l; j++) 
        {
            let a = arr.slice(0); // clone arr
            a.push(args[i][j]);

            if (i===max) 
            {
                let table = new tableObj(a);

                if (filterOverlapping(table)) 
                {
                    for(let k=0; k<table.sections.length; k++) 
                    {
                        if(!table.days.includes(table.sections[k].day))
                            table.days.push(table.sections[k].day);
                        if(table.early > table.sections[k].start)
                            table.early = table.sections[k].start;
                        if(table.late < table.sections[k].end)
                            table.late = table.sections[k].end;
                    }
                    r.push(table);
                }
            }
            else
                helper(a, i+1);
        }
    }
    helper([], 0);
    return r;
}

