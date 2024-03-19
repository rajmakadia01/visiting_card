import './App.css'

const Form = () => {

    return(
        <>
    <div>
    <h2>
        Tell Us About Your Home
    </h2>
    <div>
        <h3><spam class='address'>Address</spam><spam>Your  Inmormation Is Private</spam></h3>
    </div>
    <div>
        <form>
            <div>
                <label>Address</label>
            </div>
                
            <div>
                <input type='text' placeholder='Enter An Address'/>
            </div>
            <div>
                <label>Address 2</label>
            </div>
                
            <div>
                <input type='text' placeholder='Enter An Address2'/>
            </div>
            <div className='information'>
                <div className='city'>
                <div >
                    <label>
                        City
                    </label>
                </div>

                <div>
                    <input type='text' placeholder='City'/>
                </div>
                </div>

                <div className='state'>
                <div>
                    <label>
                        State
                    </label>
                </div>

                <div>
                    <input type='text' placeholder='State'/>
                </div>
                </div>

                <div className='zip'>
                <div>
                    <label>
                        Zip
                    </label>
                </div>

                <div>
                    <input type='text' placeholder='Zip Code'/>
                </div>
                </div>

            </div>
        </form>
    </div>
</div>
        </>
    )

}

export default Form