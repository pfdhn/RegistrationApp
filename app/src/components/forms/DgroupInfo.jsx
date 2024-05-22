import '../form.css'

export default function DgroupInfo({ formData, setFormData, flag, setFlag}) {

    return (               
        <div>
            <label hidden={formData.isDgroupMember === "no"}> Name of Dgroup Leader </label> <br/>
            <input 
                hidden={formData.isDgroupMember === "no"}
                type="text" 
                value={formData.dgroupLeader}
                onChange={(e) => {
                    setFormData({...formData, dgroupLeader: e.target.value})
                    if (e.target.value.trim() === ''){
                        setFlag({...flag, DGL: 0});
                    } else {
                        setFlag({...flag, DGL: 1});
                    }
                }}
            /><br/>
            
            <label> Attending as a </label> <br/>
            <div className='radio-buttons'>
                
                <input 
                    name= "attendingAs" 
                    type="radio" 
                    id="participant"
                    value={formData.attendingAs}
                    onChange={(e) => {
                        setFormData({...formData, attendingAs: e.target.id})
                        setFlag({...flag, AS: 1});
                    }}
                    checked={formData.attendingAs === "participant" ? true : false}
                />
                <p> Participant </p>    

                <input 
                    name= "attendingAs" 
                    type="radio" 
                    id="volunteer"
                    value={formData.attendingAs}
                    onChange={(e) => {
                        setFormData({...formData, attendingAs: e.target.id})
                        setFlag({...flag, AS: 1});
                    }}
                    checked={formData.attendingAs === "volunteer" ? true : false}
                />
                <p> Volunteer </p>    
                
                
            </div>
        </div>
    );
}