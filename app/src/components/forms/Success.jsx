
export default function SuccessPage({nickname}) {
    const Redirect = () => {
        setTimeout(() => window.location.reload(), 20000)
    }

    function BackToHome(){
        window.location.reload(false)
    }

    {/*fetch("/attendees", {
        method: "POST",
        headers: {                              
            "Content-Type": "application/json"  // important to tell server that the sending file is a JSON
        },
        body: JSON.stringify(formData)
    }).then((response) => response.json()).then((json) => console.log(json, "HERE"));*/}

    return (
        <div className="success">
            <h2> Hi {nickname}! </h2>
            <h3> Welcome to ELEVATE Matina</h3>
            <h3> Please make sure to secure a nametag here at the registration booth.</h3>

            {Redirect()}

            <button onClick={BackToHome}> Register a new attendee </button>
        </div>
    );
}