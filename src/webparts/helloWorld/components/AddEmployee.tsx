import React, { useCallback, useState } from "react";
import { Web } from "@pnp/sp/presets/all";

import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";
import { Panel } from "@fluentui/react/lib/Panel";
import { useBoolean } from "@fluentui/react-hooks";

import { TextField } from "@fluentui/react/lib/TextField";
import { Stack } from "@fluentui/react/lib/Stack";

import { DatePicker } from "@fluentui/react";

import { Checkbox } from "@fluentui/react/lib/Checkbox";

import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';


import {
  ChoiceGroup,
  IChoiceGroupOption,
} from "@fluentui/react/lib/ChoiceGroup";

interface Empprops {
  weburl: string;
  // context:WebPartContext;
  changeState: ()=> void;
}



export const Employee: React.FC<Empprops> = ({ weburl,changeState }): JSX.Element => {
  
    const web1 = Web(weburl);

  

  const experienceoptions: IChoiceGroupOption[] = [
    { key: "0-1", text: "0-1" },
    { key: "1-3", text: "1-3" },
    { key: "3-5", text: "3-5" },
  ];

  const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: 300 },
  };

  const locationoptions: IDropdownOption[] = [
    { key: 'loactionHeader', text: 'Location',itemType: DropdownMenuItemType.Header },
    { key: 'Bangalore', text: 'Bangalore' },
    { key: 'Pune', text: 'Pune' },
    { key: 'Delhi', text: 'Delhi' },
    { key: 'Noida', text: 'Noida' },
    { key: 'Punjab', text: 'Punjab' }
  ];

  const [isHireformOpen, { setTrue: openHireform, setFalse: closeHireform }] =
    useBoolean(false);

  const [employeeName, setEmployeeName] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [empphoneNumber, setEmphoneNumber] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const [isreactchecked, setReactchecked] = useState(false);
  const [isjschecked, setJschecked] = useState(false);
  const [ishtmlchecked, setHtmlchecked] = useState(false);
  const [iscsschecked, setCsschecked] = useState(false);

  const [selectedexperience, setSelectedExperience] = useState<string | undefined>("0-1");

  const [selectedLocations, setSelectedLocations] = useState<string[]>(['Bangalore']);




  // useEffect(()=>{

  //   const fetchData = async () : Promise<void>  => {
  //       try {
  //           const items: any[] = await web1.lists.getByTitle("Nilkanttest12").items.select('*').get();
  //            console.log("------>",items);
  //            setListitems(items);
            
  //       } catch (error) {
  //           console.log("data fetch error",error)
  //       }
  //   }

  //   fetchData()!;

  // },[])

  // console.log("listitems",listtems);


  const onexperienceChange = React.useCallback(
    (ev: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption) => {
      setSelectedExperience(option.key);
    },
    []
  );

  const stackTokens = { childrenGap: 15 };

  const handleNameChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ):void => {
    setEmployeeName(newValue || "");
  };

  const handleEmailChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ):void => {
    setEmployeeEmail(newValue || "");
  };

  const handlePhoneChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ):void => {
    setEmphoneNumber(newValue || "");
  };

  const handleDateChange = (date: Date | undefined):void => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const onReactChange = useCallback(
    (
      ev?: React.FormEvent<HTMLElement | HTMLInputElement>,
      checked?: boolean
    ): void => {
      setReactchecked(!!checked);
    },
    []
  );
  const onHtmlChange = useCallback(
    (
      ev?: React.FormEvent<HTMLElement | HTMLInputElement>,
      checked?: boolean
    ): void => {
      setHtmlchecked(!!checked);
    },
    []
  );
  const onJsChange = useCallback(
    (
      ev?: React.FormEvent<HTMLElement | HTMLInputElement>,
      checked?: boolean
    ): void => {
      setJschecked(!!checked);
    },
    []
  );
  const onCssChange = useCallback(
    (
      ev?: React.FormEvent<HTMLElement | HTMLInputElement>,
      checked?: boolean
    ): void => {
      setCsschecked(!!checked);
    },
    []
  );

  const handleLocationChange = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number): void => {
    if (option) {
      const updatedSelectedLocations = option.selected
        ? [...selectedLocations, option.key.toString()]
        : selectedLocations.filter(key => key !== option.key.toString());
      setSelectedLocations(updatedSelectedLocations);
    }
  };

  const SaveData = async () : Promise<void>  => {

    const selectedDateString = selectedDate?.toISOString();
    const selectedlocationsStr = selectedLocations.join(', ');

    let skillsStr = "";

    if (isreactchecked) {
    skillsStr += "React, ";
    }

    if (isjschecked) {
    skillsStr += "JavaScript, ";
    }

    if (ishtmlchecked) {
    skillsStr += "HTML, ";
    }

    if (iscsschecked) {
    skillsStr += "CSS";
    }

    console.log("skillsstr",skillsStr)

    await web1.lists.getByTitle("Nilkanttest12").items.add({

        EmployeeName: employeeName,
        EmployeeEmail:employeeEmail,
        PhoneNumber: empphoneNumber,
        DateofBirth: selectedDateString,
        Skills: skillsStr,
        Experience: selectedexperience,
        PreferredLocation: selectedlocationsStr,      
      
    }).then(i => {
      console.log(i);
    }).catch((err:any)=>{
        console.log("Adding Empolyee error",err)
    })
    // closenewitempanel();
    alert("Created Successfully");
    setEmployeeName("");
    setEmployeeEmail("");
    setEmphoneNumber("");
    setSelectedDate(undefined);
    setReactchecked(false);
    setJschecked(false);
    setHtmlchecked(false);
    setCsschecked(false);
    setSelectedExperience("0-1");
    setSelectedLocations(["Bangalore"])
    changeState();
  };

  const handlformsubmit = ():void => {
    // console.log(employeeName);
    // console.log(employeeEmail);
    // console.log(empphoneNumber);
    // console.log(typeof empphoneNumber);
    console.log(selectedDate);
    console.log(typeof selectedDate);
    console.log("react", isreactchecked);
    console.log("js", isjschecked);
    console.log("html", ishtmlchecked);
    console.log("css", iscsschecked);
    console.log("exp", selectedexperience);
    console.log(typeof selectedexperience)
    console.log("locations", selectedLocations);
    console.log(typeof selectedLocations)

    // const locStr = selectedLocations.join(', ');
    // console.log("locStr",locStr)
    // console.log("locStr type",typeof locStr)


    // Retrieve the date string from your database
// const selectedDateString = "Thu Mar 07 2024 00:00:00 GMT+0530 (India Standard Time)"; // Sample date string retrieved from the database
// const newselectedDate = new Date(selectedDateString);
// console.log(newselectedDate); // This will output the Date object
// console.log(typeof newselectedDate); // This will output "object"

    if(employeeName==="")
    {
      alert("Employee Name Cannot be empty")
      return ;
    }
    if(employeeEmail==="")
    {
      alert("Employee Email Cannot be empty")
      return ;
    }
    if(empphoneNumber==="")
    {
      alert("Employee Number Cannot be empty")
      return ;
    }

    if(empphoneNumber.length<10)
    {
      alert("Please enter valid Phone number")
      return ;
    }

    if(selectedDate===undefined)
    {
      alert("D.O.B cannot be empty")
      return ;
    }


    // if (employeeName === "" || employeeEmail === "" || empphoneNumber === "" || selectedDate === undefined) {
    //     alert("All feilds are required")
    //     return ;
    // }

    SaveData()!;

    closeHireform();

  };

  return (
    <div>
      {/* <label htmlFor="newbtn">+NEW</label> */}
      <DefaultButton
        text="+ New"
        onClick={openHireform}
        style={{ backgroundColor: "blue", color: "white" }}
      />

      <Panel
        headerText={"Hiring Form"}
        isOpen={isHireformOpen}
        onDismiss={closeHireform}
        customWidth="400px"
        // styles={{ main: { maxWidth: '800px' } }}
        // You MUST provide this prop! Otherwise screen readers will just say "button" with no label.
        closeButtonAriaLabel="Close"
      >
        <>
          <Stack tokens={stackTokens}>
            <TextField
              label="Employee Name"
              required
              value={employeeName}
              onChange={handleNameChange}
            />
            <TextField
              label="Employee Email"
              type="email"
              required
              value={employeeEmail}
              onChange={handleEmailChange}
            />
            <TextField
              label="Phone Number"
              type="number"
              required
              value={empphoneNumber}
              onChange={handlePhoneChange}
            />
          </Stack>

          <div style={{ margin: "10px 0", paddingTop: "10px" }}>
            <label
              htmlFor="datepi"
              style={{ fontSize: "medium", fontWeight: "500" }}
            >
              Date of birth
            </label>
            <DatePicker
              id="datepi"
              showMonthPickerAsOverlay={true}
              placeholder="Select a date..."
              ariaLabel="Select a date"
              onSelectDate={handleDateChange}
              value={selectedDate}
            />
          </div>

          <div style={{ margin: "10px 0", paddingTop: "10px" }}>
            <label
              htmlFor="skills"
              style={{ fontSize: "medium", fontWeight: "500" }}
            >
                skills
              {/* <span style={{ fontSize: "medium", fontWeight: "500" }}></span> */}
            </label>

            <Stack tokens={stackTokens}>
              <Checkbox
                label="React"
                checked={isreactchecked}
                onChange={onReactChange}
              />
              <Checkbox
                label="JavaScript"
                checked={isjschecked}
                onChange={onJsChange}
              />
              <Checkbox
                label="Html"
                checked={ishtmlchecked}
                onChange={onHtmlChange}
              />
              <Checkbox
                label="Css"
                checked={iscsschecked}
                onChange={onCssChange}
              />
            </Stack>
          </div>

          <div>
            <ChoiceGroup
              selectedKey={selectedexperience}
              options={experienceoptions}
              onChange={onexperienceChange}
              label="Experience"
            />
          </div>

          <div style={{ margin: "10px 0", paddingTop: "10px" }}>
            <Stack tokens={stackTokens}>
                <label
                htmlFor="locationid"
                style={{ fontSize: "medium", fontWeight: "500" }}
                >
                Preferred Locations
                </label>
                <Dropdown
                    placeholder="Select options"
                    //label="Preferred Locations"
                    // defaultSelectedKeys={['Bangalore']}
                    multiSelect
                    options={locationoptions}
                    styles={dropdownStyles}
                    onChange={handleLocationChange}
                    selectedKeys={selectedLocations}
                />
            </Stack>
          </div>

          {/* <PrimaryButton onClick={dismissPanel} styles={buttonStyles}>
          Save
        </PrimaryButton> */}

          <PrimaryButton onClick={handlformsubmit} style={{width:"19rem",height:"3rem"}}>
            <span style={{fontSize:"x-large",fontWeight:"600"}}>Submit</span>
          </PrimaryButton>

        </>
      </Panel>
    </div>
  );
};
