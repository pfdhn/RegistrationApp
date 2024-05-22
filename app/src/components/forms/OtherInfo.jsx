import '../form.css'

export default function OtherInfo({ formData, setFormData, flag, setFlag}) {
    return (
        <div>
            <label> Gender </label>
            <select 
                defaultValue={"DEFAULT"}
                value={formData.gender}
                onChange={(e) => {
                    setFormData({...formData, gender: e.target.value})
                    setFlag({...flag, G: 1});
                }}
                required
            >
                <option value="DEFAULT" selected hidden> Please select </option>
                <option value="male"> Male </option>
                <option value="female"> Female </option>
            </select>

            <label> Birthdate </label>
            <input 
                type="date" 
                min={"1990-01-01"}
                max={"2024-01-01"}
                value={formData.birthDate}
                onChange={(e) => {
                    setFormData({...formData, birthDate: e.target.value})
                    setFlag({...flag, BD: 1});
                }}
                required
            /><br/>

            <label> Contact Number </label> <br/>
            <input 
                type="tel" 
                maxLength={11}
                minLength={11}
                placeholder='09xxxxxxxxx'
                value={formData.contactNumber}
                onChange={(e) => {
                    setFormData({...formData, contactNumber: e.target.value})
                    setFlag({...flag, CN: 1});
                }}
                required
            /><br/>

            <label> Facebook Name </label> <br/>
            <input 
                name= "facebookName" 
                type="text" 
                value={formData.facebookName}
                onChange={(e) => {
                    setFormData({...formData, facebookName: e.target.value})
                    if (e.target.value.trim() === ''){
                        setFlag({...flag, FBN: 0});
                    } else {
                        setFlag({...flag, FBN: 1});
                    }
                }}
                required
            /><br/>

            <label> Barangay </label> <br/>
            <input 
                name= "barangay" 
                type="text" 
                value={formData.barangay}
                onChange={(e) => {
                    setFormData({...formData, barangay: e.target.value})
                    if (e.target.value.trim() === ''){
                        setFlag({...flag, B: 0});
                    } else {
                        setFlag({...flag, B: 1});
                    }
                }}
                required
            /><br/>

            <label> School Name </label> <br/>
            <input 
                name= "schoolName" 
                type="text" 
                value={formData.schoolName}
                onChange={(e) => {
                    setFormData({...formData, schoolName: e.target.value})
                    if (e.target.value.trim() === ''){
                        setFlag({...flag, SN: 0});
                    } else {
                        setFlag({...flag, SN: 1});
                    }
                }}
                required
            /><br/>
        </div>
    );
}