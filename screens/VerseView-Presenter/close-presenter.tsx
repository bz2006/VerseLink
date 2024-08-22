import axios from 'axios'

const ClosePresenter = async (connectionUrl:string) => {
    try {
        const present = await axios.get(`http://${connectionUrl}/bible_present.html?command=4&value=0?`)
        console.log("Presenting Closed")
    } catch (error) {
        console.log(error)
    }
}

export default ClosePresenter