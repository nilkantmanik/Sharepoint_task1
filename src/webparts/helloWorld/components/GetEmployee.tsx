import React, { useEffect, useState } from 'react'
import { DetailsList, IColumn } from '@fluentui/react/lib/DetailsList';
import { Web } from "@pnp/sp/presets/all";

interface GetEmployeeprops {
    weburl:string;
    refreshlist:boolean;
}

export interface ItemExample {
    EmployeeName: string;
    EmployeeEmail: string;
    PhoneNumber: string;
    DateofBirth: string;
    Skills: string;
    Experience: string;
    PreferredLocation: string;
}

export const GetEmployee:React.FC<GetEmployeeprops> = ({weburl,refreshlist}):JSX.Element => {

    const [listtems,setListitems] = useState<ItemExample[]>([])


    useEffect(()=>{

        const fetchData = async () : Promise<void>  => {
            try {
                const web1=Web(weburl)
                const items: any[] = await web1.lists.getByTitle("Nilkanttest12").items.select('*').get();
                 console.log("------>",items);
                 setListitems(items);
                
            } catch (error) {
                console.log("data fetch error",error)
            }
        }
    
        fetchData()!;
    
      },[refreshlist])

    const _columns: IColumn[] = [
        { key: 'column1', name: 'ID', fieldName: 'ID', minWidth: 50, maxWidth: 100, isResizable: true },
        { key: 'column2', name: 'Name', fieldName: 'EmployeeName', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'column3', name: 'Email', fieldName: 'EmployeeEmail', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'column4', name: 'Ph Number', fieldName: 'PhoneNumber', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'column5', name: 'D.O.B', fieldName: 'DateofBirth', minWidth: 100, maxWidth: 200, isResizable: true,
        onRender: (item: ItemExample) => {
            const date = new Date(item.DateofBirth);
            const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
            return formattedDate;    
        }},
        { key: 'column6', name: 'Skills', fieldName: 'Skills', minWidth: 100, maxWidth: 200, isResizable: true},
        { key: 'column7', name: 'Experience', fieldName: 'Experience', minWidth: 100, maxWidth: 200, isResizable: true},
        { key: 'column8', name: 'Prefered Locations', fieldName: 'PreferredLocation', minWidth: 100, maxWidth: 200, isResizable: true},

      ];

      /*
      EmployeeName: "Nilkant1"
EmployeeEmail:"nilkant1@gmail.com"
PhoneNumber: "123456"
DateofBirth: "27/11/2000"
Skills: "React,Js"
Experience: "0-1"
PreferredLocation: "Bangalore"
      */

  return (
    <div>
        <DetailsList items={listtems} columns={_columns} />
    </div>
  )
}

