import { useState } from 'react';
import NameSearch from './components/forms/NameSearch';
import BasicInfo from './components/forms/BasicInfo';
import DgroupInfo from './components/forms/DgroupInfo';
import OtherInfo from './components/forms/OtherInfo';
import Homepage from './components/Homepage';
import SuccessPage from './components/forms/Success';
import logo from './assets/elevate.png'
import './components/form.css'


function Registration(){

    const [attendeeType, setAttendeeType] = useState("")
    const [page, setPage] = useState(0);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        nickname: "",
        isDgroupMember: "",
        dgroupLeader: "",
        attendingAs: "",
        gender: "",
        birthDate: "",
        contactNumber: "",
        facebookName: "",
        barangay: "",
        schoolName: "",
    });

    const [flag, setFlag] = useState({
        FN:0, LN:0, NN:0 , DGM:0, DGL:0, AS:0, G:0, BD:0, CN:0, FBN:0, B:0, SN:0 
    });

    const Display = () => {
        if (page === 0) {
            return<Homepage setAttendeeType={setAttendeeType} setPage={setPage}/>
        }

        if (attendeeType === 'first-timer') {
            if (page === 1){
                return <BasicInfo attendeeType={attendeeType} formData={formData} setFormData={setFormData} flag={flag} setFlag={setFlag}/>;
            } else if (page === 2){
                return <DgroupInfo formData={formData} setFormData={setFormData} flag={flag} setFlag={setFlag}/>;
            } else if (page === 3) {
                return <OtherInfo formData={formData} setFormData={setFormData} flag={flag} setFlag={setFlag}/>;
            } else {
                return <SuccessPage nickname={formData.nickname}/>
            }
        }else {
            if (page === 1){
                return <NameSearch formData={formData} setFormData={setFormData} flag={flag} setFlag={setFlag}/>;
            } else if (page === 2){
                return <BasicInfo attendeeType={attendeeType} formData={formData} setFormData={setFormData} flag={flag} setFlag={setFlag}/>;
            } else if (page === 3) {
                return <DgroupInfo formData={formData} setFormData={setFormData} flag={flag} setFlag={setFlag}/>;
            } else {
                return <SuccessPage nickname={formData.nickname}/>
            }
        }
    }

    const IsValidBasicInfo = () => {
        return (flag.FN && flag.LN && flag.NN && flag.DGM) === 1 ? true : false
    }

    const IsValidDgroupInfo = () => {
        return (flag.DGL && flag.AS) === 1 ? true : false
    }

    const IsValidOtherInfo = () => {
        return (flag.G && flag.BD && flag.CN && flag.FBN && flag.B && flag.SN) === 1 ? true : false
    }

    const throwError= () =>{
        alert("Please fill out required fields")
    }

    return(
        <div className='form'>
                <div className='header'>

                    <img src={logo} className="logo" alt='Elevate Logo'/>
                    <h1 style={{display: page === 0 ? 'block' : 'none'}}>
                        Welcome to Elevate Matina!
                    </h1>
                    <h1 style={{display: page === 0 || page === 4 ? 'none' : 'block'}}>
                        Elevate Live Registration
                    </h1>
                </div>

                <div className='body' style={{width: page === 0 ? '800px' : '500px'}}>
                    {Display()}

                    {console.log(formData)}
                </div>

                <div className='footer' style={{display: page === 0 || page > 3 ? 'none' : 'block'}}>
                <button 
                        hidden={page < 2}
                        onClick={() => {
                            setPage((curr) => curr - 1);
                        }}
                    >
                        <span><i className="fa-solid fa-angle-left"></i> Prev</span>
                    </button>

                    <button
                        onClick={() => {
                            
                            if (page === 3) {
                                if (IsValidOtherInfo && IsValidDgroupInfo){
                                    fetch("/attendees", {
                                        method: "POST",
                                        headers: {                              
                                            "Content-Type": "application/json"  // important to tell server that the sending file is a JSON
                                        },
                                        body: JSON.stringify(formData)
                                    }).then((response) => {
                                        if (response.ok){
                                            return response.json()
                                        }
                                        throw new Error('Ooopss something went wrong')
                                    })
                                    .then((json) => console.log(json, "HERE"))
                                    .catch((err) => {console.log(err)});

                                    setPage(() => 4)
                                    console.log('Form Submitted')
                                } else {
                                    throwError()
                                }
                            } else {
                                if (attendeeType === "returnee") {
                                    if (page === 1){
                                        if ((flag.FN && flag.LN) === 1){
                                            setPage((curr) => curr + 1);
                                        } else {
                                            throwError()
                                        } 
                                    } else {
                                        if (IsValidBasicInfo){
                                            setPage((curr) => curr + 1);
                                        } else {
                                            throwError()
                                        } 
                                    } 
                                } else{
                                    if (page === 1){
                                        if (IsValidBasicInfo){
                                            setPage((curr) => curr + 1);
                                        } else {
                                            throwError()
                                        }
                                    } else {
                                        if (IsValidDgroupInfo){
                                            setPage((curr) => curr + 1);
                                        }else {
                                            throwError()
                                        }  

                                        }
                                } 
                            }
                        }}
                    >
                        <span>{page === 3 ? "Submit" : "Next"} <i className="fa-solid fa-angle-right"></i></span>
                    </button>

                </div>
        </div>
        
    );
}

export default Registration