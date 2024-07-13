// import React from 'react';
// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css'; 
// import Dropdown from 'react-dropdown';
// import { useState } from 'react';
// import 'react-dropdown/style.css'; 
// import data from './Data';
// import {Bar} from 'react-chartjs-2'

// const options2 = ['Algerian_dinar', 'Australian dollar   (AUD)', 'Bahrain dinar   (BHD)', 'Bolivar Fuerte   (VEF)', 'Botswana pula   (BWP)', 'U.S. dollar   (USD)'];
// const resultArray=[[],[]]
// const dateArray=[]
// function App() {
//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'bottom',
//       },
//       title: {
//         display: true,
//         text: 'Currency distribution',
//       },
//     },
//   };
//   const result={
//     dateArray,
//     datasets: [
//       {
//         label: 'Currency Value',
//         data: resultArray[0],
//         backgroundColor: 'rgba(0,0,255,0.7)',
//         borderColor: 'rgba(0,0,255,0.9)',
//         barTickness:1,
//       },
//       {
//         label: 'Currency Value',
//         data: resultArray[1],
//         backgroundColor: 'rgba(0,0,255,0.7)',
//         borderColor: 'rgba(0,0,255,0.2)',
//         barTickness:1,
//       }
//     ],
//   }
//   const [from, setFrom] = useState(options2[0]);
//   const [to, setTo] = useState(options2[5]);
//   const [start,setStart]=useState("")
//   const [end ,setEnd]=useState("")
//   const submit=()=>{
//     console.log(data[0][`${from}`])
//     console.log(data[0][`${to}`])
//     console.log(start);
//     console.log(end);
//     console.log(from);
//     console.log(to)
//     let newdata=data.filter((datas)=>(
//       new Date(datas.Date)>=new Date(start) && new Date(datas.Date)<=new Date(end)
//     ))
//     console.log(newdata)
//     newdata.map((data)=>{
//       dateArray.push(data.Date)
//       if(from=='Algerian_dinar')
//       {
//         resultArray[0].push(data[`${from}`])
//       }
//       else if(from=='Australian dollar   (AUD)')
//       {
//         resultArray[0].push(data[`${from}`])
//       }
//       else if(from=='Bahrain dinar   (BHD)')
//       {
//         resultArray[0].push(data[`${from}`])
//       }
//       else if(from=='Bolivar Fuerte   (VEF)')
//       {
//         resultArray[0].push(data[`${from}`])
//       }
//       else if(from=='Botswana pula   (BWP)')
//       {
//         resultArray[0].push(data[`${from}`])
//       }
//       else
//       {
//         resultArray[0].push(data[`${from}`])
//       }
//     })
//     newdata.map((data)=>{
//       if(to=='Algerian_dinar')
//       {
//         resultArray[1].push(data[`${to}`])
//       }
//       else if(to=='Australian dollar   (AUD)')
//       {
//         resultArray[1].push(data[`${to}`])
//       }
//       else if(to=='Bahrain dinar   (BHD)')
//       {
//         resultArray[1].push(data[`${to}`])
//       }
//       else if(to=='Bolivar Fuerte   (VEF)')
//       {
//         resultArray[1].push(data[`${to}`])
//       }
//       else if(to=='Botswana pula   (BWP)')
//       {
//         resultArray[1].push(data[`${to}`])
//       }
//       else
//       {
//         resultArray[1].push(data[`${to}`])
//       }
//     })
//     console.log(resultArray)
//     console.log(dateArray)
//   }
//   return (
//     <div className="App">
//       <div className="input-group">
//         <label>From Date:</label>
//         <input type="date" value={start} onChange={(e)=>{setStart(e.target.value)}}/>
//         <br />
//         <Dropdown 
//           options={options2} 
//           onChange={(e)=>{setFrom(e.value)}} 
//           value={from} 
//           placeholder="Select Currency" 
//         />
//       </div>
//       <br /><br />
//       <div className="input-group">
//         <label>To Date:</label>
//         <input type="date" value={end} onChange={(e)=>{setEnd(e.target.value)}}/>
//         <Dropdown 
//           options={options2} 
//           onChange={(e)=>{setTo(e.value)}} 
//           value={to} 
//           placeholder="Select Currency" 
//         />
//       </div>
//       <br />
//       <button className="submitButton" onClick={submit}>Submit</button>
//       <Bar options={options} data={result}></Bar>
      
//     </div>
//   );
// }

// export default App;
import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import data from './Data';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register the necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options2 = [
  'Algerian_dinar', 'Australian dollar   (AUD)', 'Bahrain dinar   (BHD)',
  'Bolivar Fuerte   (VEF)', 'Botswana pula   (BWP)', 'U.S. dollar   (USD)'
];

function App() {
  const [from, setFrom] = useState(options2[0]);
  const [to, setTo] = useState(options2[5]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [dateArray, setDateArray] = useState([]);
  const [resultArray, setResultArray] = useState([[], []]);
  const [loading, setLoading] = useState(false);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Currency distribution',
      },
    },
    scales: {
      x: {
        type: 'category',
        labels: dateArray,
      },
    },
  };

  const result = {
    labels: dateArray,
    datasets: [
      {
        label: `${to}`,
        data: resultArray[0],
        backgroundColor: 'rgba(0,0,255,0.7)',
        borderColor: 'rgba(0,0,255,0.9)',
        barThickness: 20,
      },
      {
        label: `${from}`,
        data: resultArray[1],
        backgroundColor: 'rgba(0,255,0,0.7)',
        borderColor: 'rgba(0,255,0,0.9)',
        barThickness: 20,
      }
    ],
  };

  const submit = () => {
    setLoading(true); // Start loading
    let newdata = data.filter((datas) => (
      new Date(datas.Date) >= new Date(start) && new Date(datas.Date) <= new Date(end)
    ));
    
    const newDateArray = [];
    const newResultArray = [[], []];

    newdata.forEach((data) => {
      newDateArray.push(data.Date);
      newResultArray[0].push(data[from]);
      newResultArray[1].push(data[to]);
    });

    setDateArray(newDateArray);
    setResultArray(newResultArray);
    setLoading(false); // Stop loading
  };

  return (
    <div className="App">
      <div className="input-group">
        <label>From Date:</label>
        <input type="date" value={start} onChange={(e) => setStart(e.target.value)} />
        <br />
        <Dropdown
          options={options2}
          onChange={(e) => setFrom(e.value)}
          value={from}
          placeholder="Select Currency"
        />
      </div>
      <br /><br />
      <div className="input-group">
        <label>To Date:</label>
        <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
        <Dropdown
          options={options2}
          onChange={(e) => setTo(e.value)}
          value={to}
          placeholder="Select Currency"
        />
      </div>
      <br />
      <button className="submitButton" onClick={submit}>Submit</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Bar options={options} data={result}></Bar>
      )}
    </div>
  );
}

export default App;


