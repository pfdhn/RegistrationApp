
export default function Homepage({setAttendeeType, setPage}){
    return (
          <div className='buttons'>
              <p className='i-am'>I am a</p>
              <button onClick={() => {
                    setAttendeeType(() => 'first-timer')
                    setPage((curr) => curr +1)
                }}> First Timer  </button>
              <button onClick={() => {
                    setAttendeeType(() => 'returnee')
                    setPage((curr) => curr +1)
                }}>  Returnee </button>
          </div>
      )
}