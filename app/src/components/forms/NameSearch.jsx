import Select from 'react-select'
import '../form.css'
import { useState, useEffect } from 'react';

export default function NameSearch({formData, setFormData, flag, setFlag}) {

    const [residentData, setData] = useState([]);
    
    useEffect(() => {
        fetch('/masterlist').then(response => response.json()).then(
            data => {
            setData(()=>data)
            }
        )
        },[])

    let options =residentData.map((data) => {
        return {value: [data.firstName, data.lastName], label: [data.firstName, data.lastName].join(' ')};
    })

    console.log(residentData)

    return (            
        <div>
            <Select 
                options={options}
                className='NameSearch'
                isClearable
                isSearchable
                placeholder={formData.firstName === ''? 'Search for your name': formData.firstName.concat(' ' + formData.lastName)}
                value={formData.firstName}
                noOptionsMessage={() => 'No results found'}
                onChange={(e) => {
                    setFormData({...formData, firstName: e.value[0], lastName: e.value[1]})
                    setFlag({...flag, FN: 1, LN:1, G:1, BD:1, CN:1, FBN:1, B:1, SN:1 });
                    console.log(formData)
                }}
            />
 
        </div>

    );
}