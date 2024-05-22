import '../form.css'

export default function BasicInfo({ attendeeType, formData, setFormData, flag, setFlag}) {

    return (            
        <div>
            <label> First Name </label> <br/>
            <input 
                type="text" 
                disabled={attendeeType === 'returnee'}
                value={formData.firstName}
                onChange={(e) => {
                    setFormData({...formData, firstName: e.target.value});
                    if (e.target.value.trim() === ''){
                        setFlag({...flag, FN: 0});
                    } else {
                        setFlag({...flag, FN: 1});
                    }
                }}
            /><br/>

            <label> Last Name </label> <br/>
            <input 
                type="text" 
                disabled={attendeeType === 'returnee'}
                value={formData.lastName}
                onChange={(e) => {
                    setFormData({...formData, lastName: e.target.value});
                    if (e.target.value.trim() === ''){
                        setFlag({...flag, LN: 0});
                    } else {
                        setFlag({...flag, LN: 1});
                    }
                }}
            /><br/>

            <label> Nickname </label> <br/>
            <input 
                type="text" 
                value={formData.nickname}
                onChange={(e) => {
                    setFormData({...formData, nickname: e.target.value});
                    if (e.target.value.trim() === ''){
                        setFlag({...flag, NN: 0});
                    } else {
                        setFlag({...flag, NN: 1});
                    }
                }}
            /><br/><br/>

            <label> Are you part of a Dgroup? </label>
            <div className='part-of-droup'>
                <select 
                    
                    defaultValue={'DEFAULT'}
                    value={formData.isDgroupMember}
                    onChange={(e) => {

                        if (e.target.value === 'no'){
                            setFlag({...flag, DGL:1, DGM:1})
                            setFormData({...formData, dgroupLeader: "None", isDgroupMember: 'no'});
                        } else if (e.target.value === "yes" && formData.dgroupLeader === "None") {
                            setFormData({...formData, dgroupLeader: "", isDgroupMember: 'yes'});
                        } else {
                            setFlag({...flag, DGM:1})
                            setFormData({...formData, isDgroupMember:'yes'}) 
                        }
                    }}
                >
                    <option value="DEFAULT" hidden> Please select </option>
                    <option value="yes"> Yes </option>
                    <option value="no"> No </option>
                </select>

            </div>
            
        </div>

    );
}