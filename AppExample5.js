import React,{Component,useRef} from 'react';

class Student
{
constructor(id,name,company,salary)
{
this.id=id;
this.name=name;
this.company=company;
this.salary=salary;
}
getId()
{
return this.id;
}
getName()
{
return this.name;
}
getCompany()
{
return this.company;
}
getSalary()
{
return this.salary;
}
}


function AppExample5(){
const students=[];
const placementYear=2021;

students.push(new Student(101,"Aditya","Grow","20 LPA"));
students.push(new Student(102,"Sapan","MAQ Software","10 LPA"));
students.push(new Student(103,"Swati","Infosys","15 LPA"));
students.push(new Student(104,"Aditi","TCS Digital","9.5 LPA"));
students.push(new Student(105,"Tanish","Microsoft","52 LPA"));

const filteredStudents=[];
students.forEach((student)=>{
filteredStudents.push(student);
});

const placementDetailRef=useRef();
const placementListRef=useRef();
const selectedStudent={
"name":"",
"company":"",
"salary":""
};
const studentHasBeenSelected=function(student)
{
//alert(student.id+","+student.name+","+student.salary+","+student.company);
placementDetailRef.current.updateStudent(student);
}
const searchCriteriaChanged=(ev)=>{
var searchWhat=ev.currentTarget.value.trim().toLowerCase();
filteredStudents.splice(0,filteredStudents.length);
for(var e=0;e<students.length;e++)
{
if(students[e].company.toLowerCase().includes(searchWhat))
{
filteredStudents.push(students[e]);
}
}
placementListRef.current.updateStudents(filteredStudents);
selectedStudent.name="";
selectedStudent.company="";
selectedStudent.salary="";
placementDetailRef.current.updateStudent(selectedStudent);
}

return (
<div>
<h1>ABCD Institute Of Technology</h1>
Filter by company <input type='text' onChange={searchCriteriaChanged} />
<PlacementList students={students} placementYear={placementYear} whenStudentIsSelected={studentHasBeenSelected} ref={placementListRef}/>
<br></br><br></br>
<PlacementDetail student={selectedStudent} ref={placementDetailRef} />
</div>
);
}

class PlacementList extends React.Component
{
constructor(props)
{
super(props);
this.state={
"students":props.students,
"placementYear":props.placementYear
};
this.onStudentSelected=props.whenStudentIsSelected;
}
updateStudents(students)
{
this.setState({
"students":students
});
}
studentClickedHandler=(ev)=>{
var student=null;
var studentId=ev.currentTarget.getAttribute("id");
for(var i=0;i<this.state.students.length;i++)
{
if(this.state.students[i].id==studentId)
{
student=this.state.students[i];
break;
}
}
if(student)
{
this.onStudentSelected(student);
}
}
render(){
return(
<div>
<h3>Placement {this.state.placementYear} </h3>
<ul>
{
this.state.students.map((student)=>{
return(
<li key={student.id} id={student.id} onClick={this.studentClickedHandler}>
<b>{student.name}</b>
</li>
)	
})
}
</ul> 
</div>
);
}
}

class PlacementDetail extends React.Component
{
constructor(props)
{
super(props);
this.state={
"student":props.student
}
}
updateStudent(student)
{
this.setState({
"student":student
});
}
render(){
return(
<div>
Name : <b>{this.state.student.name}</b><br></br>
Company : <b>{this.state.student.company}</b><br></br>
Package : <b>{this.state.student.salary}</b><br></br>

</div>

);
}

}
export default AppExample5;