import React from 'react'
import {useState,useEffect} from 'react'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

//chartJS imports
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

  //Line graph import
  import { Line } from 'react-chartjs-2';

  //types import from chartJS
  import type { ChartData, ChartOptions } from 'chart.js';

  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );


  
 

export const Chart = () => {
    
    //Line chart props states
    const [selected,setSelected]=useState<string>("default")
    const [data,setData]=useState<ChartData<'line'>>()
    const [options,setOptions]=useState<ChartOptions<'line'>>({
        responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: selected!=='default'? `Daily fluctuations for ${selected.charAt(0).toUpperCase()+selected.substring(1)}`:"Choose a category"
        },
    },
    })

    //Define react query for api calls
    const dataQuery = useQuery({
        queryKey: ['total'],
        queryFn: async () => {
          const response = await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
          const data = await response.data;
          return data;
        },
        select:(total)=>total[`${selected}`],
        refetchOnWindowFocus:false,
        enabled: false // disable this query from automatically running

      })

      useEffect(() => {

        if(selected!=='default'){
             //call api here upon selection
                dataQuery.refetch()
        }
      }, [selected])

      useEffect(() => {

        if(dataQuery.data){
            
            setData({
                labels:Object.keys(dataQuery.data),
                datasets: [
                    {
                        label: createChartLabel(selected),
                        data:Object.values(dataQuery.data),
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        tension: 0.4
                    },
                  
                ],
            })
        }
      }, [dataQuery.data])
      

      
      

  return (
    <>
    <span>Filter By</span>
    <select onChange={handleSelection} defaultValue="default">
        <option value="default">{"Choose a category"}</option>
        <option value="cases">{"Cases"}</option>
        <option value="deaths">{"Deaths"}</option>
        <option value="recovered">{"Recovered"}</option>
    </select>

    { dataQuery.isLoading ?  <h1>Loading....</h1> : null}
    {dataQuery.isError ? <h1>Error loading data!!!</h1>: null}
    {data ? <Line options={options} data={data} /> : null}
   
    </>
  )

  //handler for category selection

  function handleSelection(e:React.ChangeEvent<HTMLSelectElement>){
   
        setSelected(e.target.value)
    }

    function createChartLabel(selected:string){
        switch (selected){
            case 'cases':
                return 'Cumulative Infection'
            case 'recovered':
                return 'Recovery'
            case 'deaths':
                return 'Deaths'
        }
    }
}
