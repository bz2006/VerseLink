import axios from 'axios'

const ClosePresenter = async () => {
    try {
        const present = await axios.get('http://192.168.137.1:50010/bible_present.html?command=4&value=0?')
        console.log("Presenting Closed")
    } catch (error) {
        console.log(error)
    }
}

export default ClosePresenter